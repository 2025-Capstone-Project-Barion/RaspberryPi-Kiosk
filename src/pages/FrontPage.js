import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Front/frontPage.module.css';

// 로고 및 아이콘
import logoImage from '../assets/Image/Logo/logo.png';
import MicIcon from '@mui/icons-material/Mic';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { playAudio } from '../utils/audioManager';
import { fetchMenuItems } from '../data/menuData'; // 메뉴 데이터 로드 함수 import
import { useMqtt, TOPICS } from '../context/MqttContext';
// // 배경 애니메이션 파티클 데이터
// const PARTICLES = 35;
// const generateParticles = () => {
//     return Array.from({ length: PARTICLES }, () => ({
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: 3 + Math.random() * 8,
//         opacity: 0.15 + Math.random() * 0.3,
//     }));
// };

const FrontPage = () => {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);
    const [activeTouch, setActiveTouch] = useState(null);
    //const particles = generateParticles();
    const { publish } = useMqtt(); // MQTT 훅 추가

    // 메뉴 데이터 로드 및 로컬 스토리지 저장 함수
    // FrontPage.js에서 사용
    const loadAndSaveMenuData = async (source = "자동") => {
        console.log(`${source}: 메뉴 데이터 로드 시도`);
        try {
            await fetchMenuItems(); // fetchMenuItems 내부에서 로컬 스토리지 저장 처리
            console.log(`${source}: 메뉴 데이터 로드 완료`);
        } catch (error) {
            console.error(`${source}: 메뉴 데이터 로드 중 오류 발생:`, error);
        }
    };

    // 로고 클릭 이벤트 핸들러
    const handleLogoClick = () => {
        console.log('로고 클릭됨: 메뉴 데이터 업데이트 시작');
        loadAndSaveMenuData("로고 클릭");
    };

    // 첫 화면에서 로컬스토리지 초기화 로직 추가
    useEffect(() => {
        // 결제 관련 데이터 초기화
        localStorage.removeItem('orderItems');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('tossId');

        // 페이지 로드 시 백엔드에서 메뉴 데이터 가져오기
        loadAndSaveMenuData("페이지 로드");

        // 페이지 입장 시 환영 음성 재생
        playAudio('welcome');
    }, []);

    const handleStartOrder = useCallback(() => {
        setIsLeaving(true);

        // CSS 애니메이션 종료 후 메뉴 페이지로 이동 (애니메이션 시간과 일치)
        setTimeout(() => {
            navigate('/MenuPage');

            // 10초 지연 후 카메라 앱 종료 메시지 전송
            setTimeout(() => {
                publish(TOPICS.CLOSE, "close");
                console.log('MQTT: 10초 지연 후 카메라 종료 신호 전송');
            }, 10000); // 10초 지연

        }, 450); // 애니메이션 시간(450ms)과 동일하게 설정
    }, [navigate, publish]);

    // 터치 이벤트 핸들러
    const handleTouchStart = (id) => {
        setActiveTouch(id);
    };

    const handleTouchEnd = (id) => {
        setActiveTouch(null);
        if (id === 'order_button') {
            handleStartOrder();
        }
    };

    // 컴포넌트 내부 useEffect에 추가
    useEffect(() => {
        const handleNavigateToMenu = () => {
            handleStartOrder();
        };

        window.addEventListener('voice-navigate-menu', handleNavigateToMenu);

        return () => {
            window.removeEventListener('voice-navigate-menu', handleNavigateToMenu);
        };
    }, [handleStartOrder]);

    // MQTT 메시지 수신 처리 부분만 수정
    useEffect(() => {
        // 휠체어 감지 메시지 수신 시 음성 안내만 재생 (메뉴 자동 이동하지 않음)
        const handleMqttMessage = (event) => {
            const { topic, message } = event.detail;

            // 새로운 토픽명과 메시지 값으로 처리
            if (topic === TOPICS.DETECTED && message === "true") {
                console.log("휠체어+사람 감지: 2초 후 음성 안내 재생");

                // 2초 후에 휠체어 감지 음성 재생
                setTimeout(() => {
                    playAudio('wheelchairDetected');
                }, 2000);
            }
        };

        window.addEventListener('mqtt-message', handleMqttMessage);

        return () => {
            window.removeEventListener('mqtt-message', handleMqttMessage);
        };
    }, []);

    return (
        <div className={`${styles.container} ${isLeaving ? styles.leaving : ''}`}>
            <div className={`${styles.overlay} ${isLeaving ? styles.overlayActive : ''}`} />
            {/* 배경 파티클 
            {particleSprings.map((props, i) => (
                <animated.div
                    key={i}
                    className={styles.particle}
                    style={{
                        left: props.x.to(x => `${x}%`),
                        top: props.y.to(y => `${y}%`),
                        opacity: props.opacity,
                        transform: props.scale.to(s => `scale(${s})`),
                        width: `${particles[i].size}px`,
                        height: `${particles[i].size}px`,
                    }}
                />
            ))}*/}

            <div className={styles.content}>
                {/* 좌측 브랜드 섹션 */}
                <div className={styles.brandSection}>
                    <div className={styles.logoContainer} onClick={handleLogoClick}>
                        <img
                            src={logoImage}
                            alt="Barion 로고"
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.brandName}>Barion</h1>
                        <div className={styles.taglineContainer}>
                            <p className={styles.tagline}>스마트 배리어프리 키오스크</p>
                        </div>
                    </div>

                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>
                            누구나 편리하고 스마트하게 이용할 수 있는<br />
                            <span className={styles.highlightText}>스마트 배리어프리 키오스크</span>를<br />
                            지금 경험해보세요
                        </p>
                    </div>
                </div>

                {/* 우측 주문 섹션 */}
                <div className={styles.orderSection}>
                    <div className={styles.optionsContainer}>
                        {/* 음성 주문 안내 */}
                        <div className={`${styles.optionCard} ${styles.optionCardVoice}`}>
                            <div className={styles.iconWrapper}>
                                <MicIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>음성 인식으로 주문</h3>
                                <p><span className={styles.wakeWord}>"Hey, Barion"</span>으로</p>
                                <p>Barion AI 비서를 호출하세요</p>
                            </div>
                        </div>

                        {/* 터치 주문 안내 */}
                        <div className={`${styles.optionCard} ${styles.optionCardTouch}`}>
                            <div className={styles.iconWrapper}>
                                <TouchAppIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>터치로 직접 주문</h3>
                                <p>기존 방식이에요</p>
                                <p>터치로 간편하게 주문하세요</p>
                            </div>
                        </div>
                    </div>

                    {/* 주문 버튼 - 개선된 디자인 */}
                    <div className={styles.buttonContainer}>
                        <button
                            className={`${styles.orderButton} ${activeTouch === 'order_button' ? styles.buttonActive : ''}`}
                            onTouchStart={() => handleTouchStart('order_button')}
                            onTouchEnd={() => handleTouchEnd('order_button')}
                            onClick={handleStartOrder} // 메뉴 페이지로 이동
                        >
                            <span className={styles.buttonText}>주문하러 가기</span>
                            {/*<animated.div className={styles.arrowIcon} style={arrowSpring}>
                                <NavigateNextIcon className={styles.nextIcon} />
                            </animated.div>*/}
                            <div className={styles.arrowIcon}>
                                <NavigateNextIcon className={styles.nextIcon} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;