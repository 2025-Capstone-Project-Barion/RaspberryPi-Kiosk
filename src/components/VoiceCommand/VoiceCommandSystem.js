import React, { useState, useEffect, useRef } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import { useRhino } from '@picovoice/rhino-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceCommand } from './VoiceCommandContext';
import './VoiceCommandStyles.css';

/**
 * 음성 명령 시스템의 UI를 포털로 표시하는 컴포넌트
 * 다른 UI 요소들 위에 오버레이됩니다.
 */
const VoiceCommandPortal = ({ children }) => {
    // 포털 타겟 요소 생성 또는 가져오기
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
 * Picovoice의 Porcupine(웨이크워드 감지)과 Rhino(음성 명령 인식) 기반
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

    // 클릭 피드백 상태
    const [clickFeedback, setClickFeedback] = useState(null);

    // 타이머 레퍼런스
    const commandTimeoutRef = useRef(null);
    const wakewordTimeoutRef = useRef(null);

    // 오디오 피드백용 레퍼런스
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

    // 1. Porcupine 초기화 (웨이크워드 감지)
    useEffect(() => {
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

            // 오디오 피드백 재생
            if (wakeAudioRef.current && voiceFeedbackEnabled) {
                wakeAudioRef.current.play().catch(e => console.error('오디오 재생 실패:', e));
            }

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

            // 성공 오디오 피드백
            if (successAudioRef.current && internalCommandResult.isUnderstood && voiceFeedbackEnabled) {
                successAudioRef.current.play().catch(e => console.error('오디오 재생 실패:', e));
            }

            // 인식 완료 후 웨이크워드 감지 모드로 복귀 (즉시 호출하지 않고 약간 지연)
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

    // 8. 시각적 클릭 피드백 생성 함수
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

    // 9. 음성 명령에 반응하여 UI 요소 클릭 처리
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
                    const orderButton = document.querySelector('.orderButton, button:contains("주문하러"), button:contains("주문 시작")');
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
                    // 위로 스크롤 버튼 찾아서 클릭
                    setTimeout(() => {
                        const scrollUpButton = document.querySelector('button[aria-label="위로 스크롤"]');
                        if (scrollUpButton) {
                            console.log('메뉴 화면 "위로 스크롤" 버튼 클릭');
                            createClickFeedback(scrollUpButton);
                        } else {
                            // 버튼을 찾을 수 없으면 이벤트 직접 발생
                            window.dispatchEvent(new CustomEvent('voice-scroll-up'));
                        }
                    }, 300);
                    break;

                case '스크롤다운':
                    // 아래로 스크롤 버튼 찾아서 클릭
                    setTimeout(() => {
                        const scrollDownButton = document.querySelector('button[aria-label="아래로 스크롤"]');
                        if (scrollDownButton) {
                            console.log('메뉴 화면 "아래로 스크롤" 버튼 클릭');
                            createClickFeedback(scrollDownButton);
                        } else {
                            // 버튼을 찾을 수 없으면 이벤트 직접 발생
                            window.dispatchEvent(new CustomEvent('voice-scroll-down'));
                        }
                    }, 300);
                    break;

                case '카테고리이동':
                    if (slots && slots.카테고리) {
                        // 카테고리 버튼 찾아서 클릭
                        setTimeout(() => {
                            const categoryButtons = document.querySelectorAll('.category-button, [role="tab"]');
                            let targetButton = null;

                            categoryButtons.forEach(button => {
                                const buttonText = button.textContent.toLowerCase();
                                if (buttonText.includes(slots.카테고리.toLowerCase())) {
                                    targetButton = button;
                                }
                            });

                            if (targetButton) {
                                console.log(`메뉴 화면 "${slots.카테고리}" 카테고리 버튼 클릭`);
                                createClickFeedback(targetButton);
                            }
                        }, 300);
                    }
                    break;

                case '커피주문':
                case '논커피주문':
                case '디저트주문':
                case '베이커리주문':
                    // 해당 메뉴 찾아서 클릭
                    const categoryType = intent.replace('주문', ''); // 카테고리 타입 추출
                    const menuName = slots[categoryType]; // 슬롯에서 메뉴명 가져오기

                    if (menuName) {
                        setTimeout(() => {
                            // 모든 메뉴 카드 요소 찾기
                            const menuItems = document.querySelectorAll('.menu-card');
                            let targetMenuItem = null;

                            menuItems.forEach(item => {
                                // 메뉴 이름을 포함하는 요소 찾기
                                const nameElement = item.querySelector('*:not(img)'); // 이미지 제외
                                if (nameElement && nameElement.textContent.includes(menuName)) {
                                    targetMenuItem = item;
                                }
                            });

                            if (targetMenuItem) {
                                console.log(`메뉴 화면 "${menuName}" 메뉴 카드 클릭`);
                                // 수량이 지정되었으면 여러 번 클릭
                                const quantity = slots.수량 ? parseInt(convertKoreanNumberToDigit(slots.수량)) || 1 : 1;

                                const clickInterval = setInterval(() => {
                                    const clickCount = parseInt(targetMenuItem.dataset.clickCount || 0) + 1;
                                    targetMenuItem.dataset.clickCount = clickCount;

                                    createClickFeedback(targetMenuItem);

                                    if (clickCount >= quantity) {
                                        clearInterval(clickInterval);
                                        // 클릭 카운트 초기화
                                        setTimeout(() => {
                                            delete targetMenuItem.dataset.clickCount;
                                        }, 1000);
                                    }
                                }, 500);
                            }
                        }, 300);
                    }
                    break;

                case '장바구니비우기':
                    // 장바구니 비우기 버튼 찾아서 클릭
                    setTimeout(() => {
                        const clearCartButton = document.querySelector('.MuiIconButton-colorError');
                        if (clearCartButton) {
                            console.log('메뉴 화면 "장바구니 비우기" 버튼 클릭');
                            createClickFeedback(clearCartButton);
                        }
                    }, 300);
                    break;

                case '구매요청':
                case '결제요청':
                    // 구매하기 버튼 찾아서 클릭
                    setTimeout(() => {
                        const purchaseButton = document.querySelector('button:contains("구매하기")');
                        if (purchaseButton) {
                            console.log('메뉴 화면 "구매하기" 버튼 클릭');
                            createClickFeedback(purchaseButton);
                        }
                    }, 300);
                    break;
            }
        }

        // 결제 화면에서의 명령 처리
        else if (pathname === '/payment') {
            if (intent === '결제요청') {
                // 결제하기 버튼 찾아서 클릭
                setTimeout(() => {
                    const payButton = document.querySelector('button:contains("결제")');
                    if (payButton) {
                        console.log('결제 화면 "결제하기" 버튼 클릭');
                        createClickFeedback(payButton);
                    }
                }, 300);
            }
            else if (intent === '토글닫기') {
                // 뒤로가기(취소) 버튼 찾아서 클릭
                setTimeout(() => {
                    const backButton = document.querySelector('button:contains("취소"), button:contains("돌아가기")');
                    if (backButton) {
                        console.log('결제 화면 "돌아가기" 버튼 클릭');
                        createClickFeedback(backButton);
                    } else {
                        console.log('결제 화면에서 돌아가기 버튼을 찾을 수 없음, 직접 페이지 이동');
                        navigate(-1); // 이전 페이지로 이동
                    }
                }, 300);
            }
        }

        // 결제 성공 화면에서의 명령 처리
        else if (pathname === '/payment/success') {
            if (intent === '메뉴화면이동') {
                // 메인으로 돌아가기
                setTimeout(() => {
                    navigate('/'); // 첫 화면으로 이동
                }, 300);
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
            {/* 오디오 피드백 */}
            <audio ref={wakeAudioRef} src="/sounds/wake.mp3" preload="auto" />
            <audio ref={successAudioRef} src="/sounds/success.mp3" preload="auto" />

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