// 오디오 관련 코드 주석 처리 및 querySelector 수정

import React, { useState, useEffect, useRef } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import { useRhino } from '@picovoice/rhino-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceCommand } from './VoiceCommandContext';
import './VoiceCommandStyles.css';

/**
 * 음성 명령 UI를 Portal로 표시하는 컴포넌트
 */
const VoiceCommandPortal = ({ children }) => {
    const getOrCreatePortalRoot = () => {
        let portalRoot = document.getElementById('voice-command-portal');
        if (!portalRoot) {
            portalRoot = document.createElement('div');
            portalRoot.id = 'voice-command-portal';
            document.body.appendChild(portalRoot);
        }
        return portalRoot;
    };

    return ReactDOM.createPortal(children, getOrCreatePortalRoot());
};

/**
 * 음성 명령 시스템 핵심 컴포넌트
 */
const VoiceCommandSystem = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 음성 명령 Context
    const {
        handleVoiceCommand,
        setListeningState,
        isListening,
        commandResult,
        voiceFeedbackEnabled
    } = useVoiceCommand();

    // 상태 관리
    const [wakewordDetected, setWakewordDetected] = useState(false);
    const [error, setError] = useState(null);

    // 초기화 중복 방지 플래그
    const isInitialized = useRef(false);

    // 클릭 피드백 상태
    const [clickFeedback, setClickFeedback] = useState(null);

    // 타이머 레퍼런스
    const commandTimeoutRef = useRef(null);
    const wakewordTimeoutRef = useRef(null);

    // 오디오 피드백용 레퍼런스 (주석 처리하지 않고 유지)
    const wakeAudioRef = useRef(null);
    const successAudioRef = useRef(null);

    // Porcupine 설정 (웨이크워드 감지)
    const porcupineKeyword = {
        publicPath: "/picovoice/porcupine/keywords/hey-barry-on_en_wasm_v3_0_0.ppn",
        label: 'Hey-Barry-on'
    };

    const porcupineModel = {
        publicPath: "/picovoice/porcupine/models/porcupine_params.pv",
    };

    // Rhino 설정 (음성 명령 인식)
    const rhinoContext = {
        publicPath: "/picovoice/rhino/contexts/rhino_ko_wasm_v3_0_0.rhn",
    };

    const rhinoModel = {
        publicPath: "/picovoice/rhino/models/rhino_params_ko.pv",
    };

    // Porcupine Hook (웨이크워드 감지)
    const {
        keywordDetection,
        isLoaded: wakewordLoaded,
        isListening: porcupineIsListening,
        isError: wakewordError,
        error: wakewordErrorMsg,
        init: initWakeword,
        start: startWakeword,
        stop: stopWakeword,
        release: releaseWakeword
    } = usePorcupine();

    // Rhino Hook (음성 명령 인식)
    const {
        inference: internalCommandResult,
        isLoaded: commandLoaded,
        isListening: rhinoIsListening,
        isError: commandError,
        error: commandErrorMsg,
        init: initCommand,
        process: startCommandRecognition,
        release: releaseCommand
    } = useRhino();

    // 오류 상태 통합
    useEffect(() => {
        if (wakewordError || commandError) {
            setError(wakewordErrorMsg?.message || commandErrorMsg?.message || '알 수 없는 오류');
        } else {
            setError(null);
        }
    }, [wakewordError, commandError, wakewordErrorMsg, commandErrorMsg]);

    // 1. Porcupine 초기화 (웨이크워드 감지) - 중복 방지
    useEffect(() => {
        // 이미 초기화된 경우 건너뛰기
        if (isInitialized.current) return;

        console.log("웨이크워드 감지 시스템 초기화 중...");

        const initWakewordSystem = async () => {
            try {
                await initWakeword(
                    process.env.REACT_APP_PICOVOICE_API_KEY || 'YOUR_API_KEY_HERE',
                    porcupineKeyword,
                    porcupineModel
                );
                console.log('웨이크워드 감지 초기화 성공');

                // 웨이크워드 감지 시작
                await startWakeword();
                console.log('웨이크워드 감지 시작됨');

                // 초기화 완료 플래그 설정
                isInitialized.current = true;
            } catch (e) {
                console.error('웨이크워드 감지 초기화 실패:', e);
                setError(`초기화 실패: ${e.message}`);
            }
        };

        initWakewordSystem();

        // 컴포넌트 언마운트 시 리소스 해제
        return () => {
            if (porcupineIsListening) {
                stopWakeword();
            }
            releaseWakeword();
            clearTimeouts();
        };
    }, []);

    // 2. Rhino 초기화 (음성 명령 인식)
    useEffect(() => {
        if (isInitialized.current) return;

        console.log("음성 명령 인식 시스템 초기화 중...");

        const initCommandSystem = async () => {
            try {
                await initCommand(
                    process.env.REACT_APP_PICOVOICE_API_KEY || 'YOUR_API_KEY_HERE',
                    rhinoContext,
                    rhinoModel
                );
                console.log('음성 명령 인식 초기화 성공');
            } catch (e) {
                console.error('음성 명령 인식 초기화 실패:', e);
                setError(`초기화 실패: ${e.message}`);
            }
        };

        initCommandSystem();

        // 컴포넌트 언마운트 시 리소스 해제
        return () => {
            releaseCommand();
        };
    }, []);

    // 3. 웨이크워드 감지 처리
    useEffect(() => {
        if (keywordDetection !== null) {
            console.log(`웨이크워드 '${keywordDetection.label}' 감지됨!`);
            setWakewordDetected(true);

            // 오디오 피드백 재생 코드 주석 처리
            /* 
            if (wakeAudioRef.current && voiceFeedbackEnabled) {
              wakeAudioRef.current.play().catch(e => console.error('오디오 재생 실패:', e));
            }
            */

            // 이미 진행 중인 타이머가 있으면 취소
            clearTimeouts();

            // 음성 명령 인식 모드로 전환
            startCommandMode();

            // 10초 후 웨이크워드 감지 모드로 복귀
            wakewordTimeoutRef.current = setTimeout(() => {
                if (rhinoIsListening) { // 여전히 명령 인식 중이라면
                    resetToWakewordMode();
                }
            }, 10000); // 10초 타임아웃
        }
    }, [keywordDetection, voiceFeedbackEnabled]);

    // 4. 음성 명령 결과 처리
    useEffect(() => {
        if (internalCommandResult !== null) {
            console.log('음성 명령 인식 결과:', internalCommandResult);

            // 부모 컴포넌트로 결과 전달
            handleVoiceCommand(internalCommandResult);

            // 성공 오디오 피드백 코드 주석 처리
            /*
            if (successAudioRef.current && internalCommandResult.isUnderstood && voiceFeedbackEnabled) {
              successAudioRef.current.play().catch(e => console.error('오디오 재생 실패:', e));
            }
            */

            // 인식 완료 후 웨이크워드 감지 모드로 복귀 (약간 지연)
            setTimeout(() => {
                resetToWakewordMode();
            }, 500); // 0.5초 지연
        }
    }, [internalCommandResult, handleVoiceCommand, voiceFeedbackEnabled]);

    // 5. 타임아웃 클리어 함수
    const clearTimeouts = () => {
        if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current);
            commandTimeoutRef.current = null;
        }

        if (wakewordTimeoutRef.current) {
            clearTimeout(wakewordTimeoutRef.current);
            wakewordTimeoutRef.current = null;
        }
    };

    // 6. 음성 명령 인식 모드 시작
    const startCommandMode = async () => {
        if (commandLoaded && !rhinoIsListening && !commandError) {
            try {
                // 웨이크워드 감지 일시 중지
                if (porcupineIsListening) {
                    await stopWakeword();
                }

                // 음성 명령 인식 시작
                setListeningState(true); // UI 상태 업데이트
                await startCommandRecognition();
                console.log('음성 명령 인식 시작됨');

                // 명령 인식 타임아웃 (7초 후 자동 종료)
                commandTimeoutRef.current = setTimeout(() => {
                    resetToWakewordMode();
                }, 7000);
            } catch (e) {
                console.error('음성 명령 인식 시작 실패:', e);
                resetToWakewordMode();
            }
        } else {
            console.warn('음성 명령 인식을 시작할 수 없음:', { loaded: commandLoaded, listening: rhinoIsListening, error: commandError });
            resetToWakewordMode();
        }
    };

    // 7. 웨이크워드 감지 모드로 복귀
    const resetToWakewordMode = async () => {
        setWakewordDetected(false);
        setListeningState(false); // UI 상태 업데이트

        // 타임아웃 클리어
        clearTimeouts();

        try {
            // 웨이크워드 감지 재시작
            if (!porcupineIsListening && wakewordLoaded) {
                await startWakeword();
                console.log('웨이크워드 감지 재시작됨');
            }
        } catch (e) {
            console.error('웨이크워드 감지 재시작 실패:', e);
            setError(`재시작 실패: ${e.message}`);
        }
    };

    // 8. 텍스트 내용으로 버튼을 찾는 헬퍼 함수
    const findButtonByText = (textOptions) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(button => {
            if (!button || !button.textContent) return false;

            const buttonText = button.textContent.toLowerCase();
            return textOptions.some(text => buttonText.includes(text.toLowerCase()));
        });
    };

    // 9. 시각적 클릭 피드백 생성 함수
    const createClickFeedback = (element) => {
        if (!element || !voiceFeedbackEnabled) return;

        // 요소의 위치와 크기 정보 가져오기
        const rect = element.getBoundingClientRect();

        // 요소 중앙 위치 계산
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const size = Math.max(rect.width, rect.height) * 1.5;

        // 클릭 피드백 정보 설정
        setClickFeedback({
            x: centerX,
            y: centerY,
            size: size,
            id: Date.now() // 고유 ID
        });

        // 1초 후 피드백 제거
        setTimeout(() => setClickFeedback(null), 1000);

        // 실제 요소 클릭 이벤트 발생
        element.click();
    };

    // 10. 음성 명령에 반응하여 UI 요소 클릭 처리
    useEffect(() => {
        if (!commandResult || !commandResult.isUnderstood) return;

        const { intent, slots } = commandResult;

        // 현재 위치에 따른 명령 처리
        const pathname = location.pathname;

        console.log(`현재 경로: ${pathname}, 명령 인텐트: ${intent}`);

        // 첫 화면에서의 명령 처리
        if (pathname === '/' || pathname === '/index.html') {
            if (intent === '메뉴화면이동') {
                // "주문하러 가기" 버튼 찾아서 클릭
                setTimeout(() => {
                    // 수정된 버튼 찾기 로직
                    const orderButton = findButtonByText(['주문하러', '주문 시작', '시작하기']);

                    if (orderButton) {
                        console.log('첫 화면 "주문하러 가기" 버튼 클릭');
                        createClickFeedback(orderButton);
                    } else {
                        console.log('첫 화면에서 주문 버튼을 찾을 수 없음, 직접 페이지 이동');
                        navigate('/MenuPage');
                    }
                }, 500);
            }
        }

        // 메뉴 화면에서의 명령 처리
        else if (pathname === '/MenuPage') {
            switch (intent) {
                case '스크롤업':
                    // 직접 이벤트 발생
                    window.dispatchEvent(new CustomEvent('voice-scroll-up'));
                    break;

                case '스크롤다운':
                    // 직접 이벤트 발생
                    window.dispatchEvent(new CustomEvent('voice-scroll-down'));
                    break;

                case '카테고리이동':
                    if (slots && slots.카테고리) {
                        // 직접 이벤트 발생
                        window.dispatchEvent(new CustomEvent('voice-change-category', {
                            detail: { category: slots.카테고리 }
                        }));
                    }
                    break;

                case '커피주문':
                case '논커피주문':
                case '디저트주문':
                case '베이커리주문':
                    // 커피 주문 처리 - 이벤트 기반으로 변경
                    const categoryType = intent.replace('주문', '');
                    const menuName = slots[categoryType];
                    const quantity = slots.수량 ? convertKoreanNumberToDigit(slots.수량) : 1;

                    if (menuName) {
                        // 메뉴 아이템 찾기 및 주문 처리를 위한 사용자 정의 이벤트 발생
                        window.dispatchEvent(new CustomEvent('voice-order-menu', {
                            detail: {
                                categoryType,
                                menuName,
                                quantity
                            }
                        }));
                    }
                    break;

                case '장바구니비우기':
                    // 장바구니 비우기 - 이벤트 기반으로 변경
                    window.dispatchEvent(new CustomEvent('voice-clear-cart'));
                    break;

                case '구매요청':
                case '결제요청':
                    // 구매하기/결제하기 - 이벤트 기반으로 변경
                    window.dispatchEvent(new CustomEvent('voice-checkout'));
                    break;
            }
        }

        // 결제 화면에서의 명령 처리
        else if (pathname === '/payment') {
            if (intent === '결제요청') {
                // 결제 진행 이벤트 발생
                window.dispatchEvent(new CustomEvent('voice-process-payment'));
            }
            else if (intent === '토글닫기') {
                // 뒤로가기 이벤트 발생
                navigate(-1);
            }
        }

        // 결제 성공 화면에서의 명령 처리
        else if (pathname === '/payment/success') {
            if (intent === '메뉴화면이동') {
                // 메인으로 돌아가기
                navigate('/');
            }
        }

    }, [commandResult, location.pathname, navigate, voiceFeedbackEnabled]);

    // 한국어 숫자를 아라비아 숫자로 변환하는 함수
    const convertKoreanNumberToDigit = (koreanNumber) => {
        if (!koreanNumber) return 1;

        const numberMap = {
            '한': 1, '하나': 1,
            '두': 2, '둘': 2,
            '세': 3, '셋': 3,
            '네': 4, '넷': 4,
            '다섯': 5,
            '여섯': 6,
            '일곱': 7,
            '여덟': 8, '여덜': 8,
            '아홉': 9,
            '열': 10,
            '스무': 20,
            '서른': 30
        };

        return numberMap[koreanNumber] || 1;
    };

    // 로드 실패 시 일찍 반환
    if (!wakewordLoaded || !commandLoaded) {
        return (
            <VoiceCommandPortal>
                <div className="voice-loading-indicator">
                    음성 인식 시스템 로딩 중...
                </div>
            </VoiceCommandPortal>
        );
    }

    // 오류 상태일 때 오류 메시지 표시
    if (error) {
        return (
            <VoiceCommandPortal>
                <div className="voice-error-indicator">
                    음성 인식 오류: {error}
                </div>
            </VoiceCommandPortal>
        );
    }

    return (
        <VoiceCommandPortal>
            {/* 오디오 참조는 유지하되 소스는 비워두기 */}
            <audio ref={wakeAudioRef} preload="none" />
            <audio ref={successAudioRef} preload="none" />

            {/* 음성 인식 시각화 */}
            <AnimatePresence>
                {isListening && (
                    <>
                        {/* 상단 중앙 리스닝 인디케이터 */}
                        <motion.div
                            className="voice-top-indicator"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="sound-wave-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="listening-text">듣고 있어요...</span>
                        </motion.div>

                        {/* 화면 가장자리 펄스 효과 */}
                        <motion.div
                            className="pulsating-border-effect"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* 음성 인식 상태 표시 카드 */}
                        <motion.div
                            className="voice-status-card listening"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card-content">
                                <div className="card-title">
                                    명령을 말씀해주세요
                                </div>
                                <div className="card-subtitle">
                                    자연스럽게 말씀해 주세요
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* 클릭 피드백 효과 */}
            {clickFeedback && (
                <motion.div
                    key={`click-feedback-${clickFeedback.id}`}
                    className="voice-click-feedback"
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        left: clickFeedback.x - clickFeedback.size / 2,
                        top: clickFeedback.y - clickFeedback.size / 2,
                        width: clickFeedback.size,
                        height: clickFeedback.size
                    }}
                />
            )}
        </VoiceCommandPortal>
    );
};

export default VoiceCommandSystem;