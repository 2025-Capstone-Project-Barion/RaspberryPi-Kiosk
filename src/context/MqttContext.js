import React, { createContext, useContext, useState, useEffect } from 'react';

// MQTT 설정
const BROKER_HOST = 'localhost'; // Mosquitto가 라즈베리파이 로컬에서 실행
const BROKER_PORT = 9001;        // WebSockets 프로토콜 포트
const CLIENT_ID = `barion_kiosk_${Math.random().toString(16).substr(2, 8)}`;

// MQTT 토픽 정의
export const TOPICS = {
    START: "barion/kiosk/start",           // 음성 인식 시작
    DETECTED: "barion/kiosk/detected",     // 휠체어/사람 감지됨
    CLOSE_DETECTION: "barion/kiosk/closeDetection",  // 감지 종료
    PAYMENT_FINISH: "barion/kiosk/paymentFinish"     // 결제 완료
};

// MQTT Context 생성
const MqttContext = createContext(null);

// MQTT Provider 컴포넌트
export const MqttProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);
    const [lastMessage, setLastMessage] = useState({ topic: '', message: '' });

    // MQTT 클라이언트 초기화
    useEffect(() => {
        // Paho 클라이언트 로드 확인
        if (!window.Paho) {
            console.error("Paho MQTT 클라이언트 라이브러리가 로드되지 않았습니다.");
            setError("MQTT 라이브러리 로드 실패");
            return;
        }

        // 클라이언트 생성
        console.log(`MQTT 클라이언트 생성: ${CLIENT_ID}`);
        const mqttClient = new window.Paho.MQTT.Client(
            BROKER_HOST,
            BROKER_PORT,
            CLIENT_ID
        );

        // 콜백 설정
        mqttClient.onConnectionLost = (response) => {
            console.error("MQTT 연결 끊김:", response.errorMessage);
            setConnected(false);
            setError(`연결 끊김: ${response.errorMessage}`);

            // 연결 재시도
            setTimeout(connect, 5000);
        };

        mqttClient.onMessageArrived = (message) => {
            const topic = message.destinationName;
            const payload = message.payloadString;
            console.log(`[MQTT] 수신: ${topic} -> ${payload}`);

            setLastMessage({
                topic: topic,
                message: payload
            });

            // 글로벌 커스텀 이벤트 발행 (다른 컴포넌트에서 쉽게 수신 가능)
            window.dispatchEvent(new CustomEvent('mqtt-message', {
                detail: { topic, message: payload }
            }));
        };

        // 연결 함수
        function connect() {
            setError(null);

            const connectOptions = {
                useSSL: false,
                timeout: 3,
                onSuccess: () => {
                    console.log("MQTT 브로커 연결 성공");
                    setConnected(true);

                    // 기본 구독 설정 - 휠체어 감지 토픽
                    mqttClient.subscribe(TOPICS.DETECTED);
                },
                onFailure: (err) => {
                    console.error("MQTT 연결 실패:", err.errorMessage);
                    setError(`연결 실패: ${err.errorMessage}`);

                    // 연결 재시도
                    setTimeout(connect, 5000);
                }
            };

            try {
                mqttClient.connect(connectOptions);
            } catch (err) {
                console.error("MQTT 연결 중 예외 발생:", err);
                setError(`연결 오류: ${err.message || '알 수 없는 오류'}`);
            }
        }

        // 초기 연결 시작
        connect();
        setClient(mqttClient);

        // 정리 함수
        return () => {
            if (mqttClient && mqttClient.isConnected()) {
                mqttClient.disconnect();
            }
        };
    }, []);

    // 메시지 발행 함수
    const publish = (topic, message) => {
        if (!client || !connected) {
            console.warn("MQTT 클라이언트가 연결되지 않았습니다. 메시지 발행 불가");
            return false;
        }

        try {
            const mqttMessage = new window.Paho.MQTT.Message(message);
            mqttMessage.destinationName = topic;
            client.send(mqttMessage);
            console.log(`[MQTT] 발행: ${topic} -> ${message}`);
            return true;
        } catch (err) {
            console.error(`메시지 발행 오류(${topic}):`, err);
            return false;
        }
    };

    // Context 값 정의
    const value = {
        client,
        connected,
        error,
        lastMessage,
        publish
    };

    return (
        <MqttContext.Provider value={value}>
            {children}
        </MqttContext.Provider>
    );
};

// 사용 편의를 위한 커스텀 훅
export const useMqtt = () => {
    const context = useContext(MqttContext);
    if (!context) {
        throw new Error("useMqtt는 MqttProvider 내부에서만 사용할 수 있습니다");
    }
    return context;
};