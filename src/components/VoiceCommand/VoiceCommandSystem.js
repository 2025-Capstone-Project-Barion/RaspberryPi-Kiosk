// 오디오 관련 코드 주석 처리 및 querySelector 수정
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import { useRhino } from '@picovoice/rhino-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceCommand } from './VoiceCommandContext';
import './VoiceCommandStyles.css';
// 오디오 관리자 임포트 추가
import { playAudio } from '../../utils/audioManager';

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
        resetVoiceCommand,
        dialogOpen
    } = useVoiceCommand();

    // 상태 관리
    // eslint-disable-next-line no-unused-vars
    const [wakewordDetected, setWakewordDetected] = useState(false);
    const [error, setError] = useState(null);

    // 초기화 중복 방지 플래그
    const isInitialized = useRef(false);

    // 클릭 피드백 상태 (시각적 피드백용)
    const [clickFeedback, setClickFeedback] = useState(null);

    // 타이머 레퍼런스
    const commandTimeoutRef = useRef(null);
    const wakewordTimeoutRef = useRef(null);

    // Porcupine 설정 (Wake-Word 감지)
    const porcupineKeyword = {
        publicPath: "/picovoice/Porcupine/keyword/Hey-Barry-on_en_wasm_v3_0_0.ppn",
        label: 'Hey-Barry-on'
    };

    const porcupineModel = {
        publicPath: "/picovoice/Porcupine/model/porcupine_params.pv",
    };

    // Rhino 설정 (Speech-To-Intent)
    const rhinoContext = {
        publicPath: "/picovoice/Rhino/context/rhino_ko_wasm_v3_0_0.rhn",
    };

    const rhinoModel = {
        publicPath: "/picovoice/Rhino/model/rhino_params_ko.pv",
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

    // 3. 웨이크워드 감지 처리 - 효과음 추가
    useEffect(() => {
        if (keywordDetection !== null) {
            console.log(`웨이크워드 '${keywordDetection.label}' 감지됨!`);
            setWakewordDetected(true);

            // 이미 진행 중인 타이머가 있으면 취소
            clearTimeouts();

            // 웨이크워드 감지 효과음 재생
            playAudio('wakeSound');

            // 음성 명령 인식 모드로 전환
            startCommandMode();

            // 10초 후 웨이크워드 감지 모드로 복귀
            wakewordTimeoutRef.current = setTimeout(() => {
                if (rhinoIsListening) { // 여전히 명령 인식 중이라면
                    resetToWakewordMode();
                }
            }, 10000); // 10초 타임아웃
        }
    }, [keywordDetection]);

    // 4. 음성 명령 결과 처리 - 인식 실패 시 안내음 추가
    useEffect(() => {
        if (internalCommandResult !== null) {
            console.log('음성 명령 인식 결과:', internalCommandResult);

            // 명령 인식 실패 시 안내 음성 재생
            if (internalCommandResult.isFinalized && !internalCommandResult.isUnderstood) {
                playAudio('tryAgain');
            }

            // 부모 컴포넌트로 결과 전달
            handleVoiceCommand(internalCommandResult);

            // 인식 완료 후 웨이크워드 감지 모드로 복귀 (약간 지연)
            setTimeout(() => {
                resetToWakewordMode();
            }, 500); // 0.5초 지연
        }
    }, [internalCommandResult, handleVoiceCommand]);

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

    // 시각적 피드백 생성 함수 (이벤트에 대한 피드백용으로 유지)
    // 시각적 피드백 생성 함수 - 미니멀한 버전
    // 시각적 피드백 생성 함수 - 미니멀한 버전 (지속 시간 증가)
    const createVisualFeedback = () => {
        // 화면 중앙 좌표 계산
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        setClickFeedback({
            x: centerX,
            y: centerY,
            size: size,
            id: Date.now() // 고유 ID
        });

        // 지속 시간 1초 -> 1.8초로 증가
        setTimeout(() => setClickFeedback(null), 1800);
    };

    // 주문 확인 다이얼로그 감지 함수 추가 (useEffect 밖에 위치)
    const isOrderDialogOpen = () => {
        // 여러 방법으로 다이얼로그 존재 여부 확인
        const byData = document.querySelector('[data-voice-target="order-dialog"]');
        const byId = document.getElementById('order-check-dialog');
        const byClass = document.querySelector('.MuiDialog-root, [role="dialog"]');

        const result = !!(byData || byId || byClass);
        if (result) {
            console.log('주문 확인 다이얼로그 감지됨');
        }

        return result;
    };

    // 10. 음성 명령에 반응하여 이벤트 발생 처리 - 각 상황별 음성 안내 추가
    useEffect(() => {
        if (!commandResult || !commandResult.isUnderstood) return;

        const { intent, slots } = commandResult;

        // 현재 위치에 따른 명령 처리
        const pathname = location.pathname;

        // 명령 처리 직후 초기화 플래그
        let shouldResetCommand = true;

        console.log(`현재 경로: ${pathname}, 명령 인텐트: ${intent}`);
        console.log('명령 슬롯:', slots); // 슬롯 정보 출력 추가

        // 현재 페이지에 적절하지 않은 명령인지 확인하는 변수
        let isInvalidCommand = false;

        // 주문 확인 다이얼로그가 열린 상태에서의 명령 처리
        if (dialogOpen || isOrderDialogOpen()) {  // 둘 중 하나라도 true면 실행
            console.log('주문 확인 다이얼로그에서 명령 처리:', intent);

            // 다이얼로그에서 허용된 명령만 처리
            if (intent === '토글닫기') {
                console.log('다이얼로그 닫기 이벤트 발생');
                window.dispatchEvent(new CustomEvent('voice-dialog-close'));

                // 시각적 피드백
                createVisualFeedback();
            }
            else if (intent === '결제요청') {
                console.log('결제하기 이벤트 발생');
                window.dispatchEvent(new CustomEvent('voice-payment-request'));

                // 시각적 피드백
                createVisualFeedback();
            } else {
                // 다이얼로그에서 허용되지 않은 명령
                isInvalidCommand = true;
            }
        }

        // 첫 화면에서의 명령 처리
        else if (pathname === '/' || pathname === '/index.html') {
            // 메뉴화면으로 이동할때 "주문할래" 이외에 "구매할래"도 가능하도록처리.
            if (intent === '메뉴화면이동' || intent === '구매요청') {
                console.log('메뉴 화면으로 이동 이벤트 발생');
                window.dispatchEvent(new CustomEvent('voice-navigate-menu'));

                createVisualFeedback();

                // 페이지 전환 전에 명령 초기화
                resetVoiceCommand();
                shouldResetCommand = false; // 이미 초기화했으므로 플래그 끄기

                // 직접 내비게이션 백업 (일정 시간 후 실행, 이벤트 처리 실패 대비)
                setTimeout(() => {
                    navigate('/MenuPage');
                }, 300);
            } else {
                // 첫 화면에서 허용되지 않은 명령
                isInvalidCommand = true;
            }
        }

        // 메뉴 화면에서의 명령 처리
        else if (pathname === '/MenuPage') {
            switch (intent) {
                case '스크롤업':
                    // 직접 이벤트 발생
                    window.dispatchEvent(new CustomEvent('voice-scroll-up'));
                    createVisualFeedback();
                    break;

                case '스크롤다운':
                    // 직접 이벤트 발생
                    window.dispatchEvent(new CustomEvent('voice-scroll-down'));
                    createVisualFeedback();
                    break;

                case '추천메뉴조회':
                    console.log('추천 메뉴 조회 요청');
                    window.dispatchEvent(new CustomEvent('voice-recommended-menu'));
                    createVisualFeedback('추천 메뉴를 조회합니다');
                    break;

                case '카테고리이동':
                    if (slots && slots.카테고리) {
                        console.log(`카테고리 이동: ${slots.카테고리}`);
                        window.dispatchEvent(new CustomEvent('voice-category-change', {
                            detail: { category: slots.카테고리 }
                        }));
                        createVisualFeedback();
                    }
                    break;

                case '커피주문':
                case '논커피주문':
                case '디저트주문':
                case '베이커리주문':
                    // 메뉴 주문 이벤트 발생
                    const menuType = intent.replace('주문', '');
                    const menuName = slots[menuType] || '';
                    const quantity = slots.수량 ? convertKoreanNumberToDigit(slots.수량) : 1;

                    if (menuName) {
                        console.log(`메뉴 주문: ${menuName}, 수량: ${quantity}`);
                        window.dispatchEvent(new CustomEvent('voice-order-menu', {
                            detail: {
                                categoryType: menuType,
                                menuName: menuName,
                                quantity: quantity
                            }
                        }));

                        // 메뉴 추가 시 음성 안내
                        //playAudio('menuAdded');
                        createVisualFeedback();
                    }
                    break;

                case '구매요청':
                case '메뉴화면이동':
                    console.log(`${intent} 명령으로 장바구니 확인 다이얼로그 표시`);
                    // 장바구니 확인 다이얼로그 표시
                    window.dispatchEvent(new CustomEvent('voice-checkout'));
                    createVisualFeedback();
                    break;

                case '장바구니비우기':
                    // 장바구니 비우기
                    window.dispatchEvent(new CustomEvent('voice-clear-cart'));
                    // 장바구니 비우기 시 음성 안내
                    playAudio('cartCleared');
                    createVisualFeedback();
                    break;

                case '장바구니제거':
                    // 특정 메뉴 제거 이벤트
                    const itemToRemove = slots.커피 || slots.논커피 || slots.디저트 || slots.베이커리;
                    const removeQuantity = slots.수량 ? convertKoreanNumberToDigit(slots.수량) : 0;

                    if (itemToRemove) {
                        console.log(`장바구니 항목 제거: ${itemToRemove}, 수량: ${removeQuantity || '전체'}`);
                        window.dispatchEvent(new CustomEvent('voice-remove-item', {
                            detail: {
                                itemName: itemToRemove,
                                quantity: removeQuantity
                            }
                        }));

                        // 메뉴 제거 시 음성 안내
                        //playAudio('menuRemoved');
                        createVisualFeedback();
                    }
                    break;

                default:
                    isInvalidCommand = true;
                    break;
            }
        }

        // 결제 화면에서의 명령 처리
        else if (pathname === '/payment') {
            // 토글닫기 인텐트를 결제화면에서 다시 메뉴화면으로 돌아가는 명령으로 재사용하면 어떨까?
            if (intent === '토글닫기') {
                window.dispatchEvent(new CustomEvent('voice-payment-back'));
                createVisualFeedback();
            }
            // 결제요청 인텐트로 결제 진행 추가
            else if (intent === '결제요청') {
                window.dispatchEvent(new CustomEvent('voice-payment-proceed'));
                createVisualFeedback();
            } else {
                isInvalidCommand = true;
            }
        } else if (pathname === '/payment/success') {
            // 결제 성공 페이지에서는 모든 명령 무시
            isInvalidCommand = true;
        } else if (pathname === '/payment/fail') {
            // 결제 실패 페이지에서는 모든 명령 무시
            isInvalidCommand = true;
        }

        // 해당 페이지에서 처리할 수 없는 명령이 입력된 경우
        if (isInvalidCommand) {
            console.log('현재 페이지에서 지원하지 않는 명령:', intent);
            playAudio('tryAgain');
        }

        // 명령 처리 후 초기화 (페이지 전환 경우는 제외)
        if (shouldResetCommand) {
            resetVoiceCommand();
        }
    }, [commandResult, navigate, location.pathname, resetVoiceCommand]);

    // 한글 숫자를 숫자로 변환하는 헬퍼 함수 추가
    const convertKoreanNumberToDigit = (koreanNumber) => {
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
            //'스무': 20,
            //'서른': 30
        };

        return numberMap[koreanNumber] || 1;
    };

    // 로드 실패 시 일찍 반환
    if (!wakewordLoaded || !commandLoaded) {
        return (
            <VoiceCommandPortal>
                <div className="voice-loading-indicator">
                    음성AI 준비중...
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
                            <span className="listening-text">Listening...</span>
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

            {/* 클릭 피드백 효과 - 미니멀 버전 (색상 강화) */}
            {clickFeedback && (
                <motion.div
                    key={`click-feedback-${clickFeedback.id}`}
                    className="voice-click-feedback"
                    initial={{ scale: 0, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{
                        duration: 1.3,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                        position: 'fixed',
                        left: clickFeedback.x - clickFeedback.size / 2,
                        top: clickFeedback.y - clickFeedback.size / 2,
                        width: clickFeedback.size,
                        height: clickFeedback.size,
                        borderRadius: '50%',
                        /* 색상 및 그라디언트 진하게 수정 */
                        background: 'radial-gradient(circle, rgba(33,66,255,0.35) 0%, rgba(77,171,247,0.25) 50%, rgba(100,200,255,0.15) 70%, transparent 100%)',
                        /* 그림자 효과 강화 */
                        boxShadow: '0 0 80px rgba(33, 66, 255, 0.65), 0 0 40px rgba(33, 66, 255, 0.45) inset',
                        /* 약간의 테두리 추가로 가시성 향상 */
                        border: '1px solid rgba(77, 171, 247, 0.3)',
                        pointerEvents: 'none',
                        zIndex: 10000
                    }}
                />
            )}
        </VoiceCommandPortal>
    );
};

export default VoiceCommandSystem;