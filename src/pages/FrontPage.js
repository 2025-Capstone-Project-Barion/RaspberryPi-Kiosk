import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, useSprings, animated, easings } from '@react-spring/web';
import styles from '../styles/Front/frontPage.module.css';

// 로고 및 아이콘
import logoImage from '../assets/Image/Logo/logo.png';
import MicIcon from '@mui/icons-material/Mic';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { playAudio } from '../utils/audioManager';
import { fetchMenuItems } from '../data/menuData'; // 메뉴 데이터 로드 함수 import

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

    // 페이지 전환 애니메이션 (좌우 방향으로 변경)
    const pageTransition = useSpring({
        opacity: isLeaving ? 0 : 1,
        // 좌에서 우로 슬라이드되는 효과
        transform: isLeaving
            ? 'translateX(3%) scale(0.98)'  // 오른쪽으로 살짝 이동하며 사라짐
            : 'translateX(0%) scale(1)',
        config: {
            easing: easings.easeOutQuint,
            tension: 120,
            friction: 14,
            duration: 450
        },
        onRest: () => {
            if (isLeaving) {
                navigate('/MenuPage');
            }
        },
    });

    // 오버레이 애니메이션 개선 - 더 세련된 블러 효과로 변경
    const overlaySpring = useSpring({
        opacity: isLeaving ? 1 : 0,
        backdropFilter: isLeaving ? 'blur(5px)' : 'blur(0px)',
        backgroundColor: isLeaving ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0)',
        config: {
            easing: easings.easeOutQuint,
            duration: 400
        },
    });


    // 로고 섹션 애니메이션
    const logoSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 120, friction: 14 },
    });

    // 제목 애니메이션
    const titleSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 300,
        config: { tension: 120, friction: 14 },
    });

    // 설명 텍스트 애니메이션
    const descriptionSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 500,
        config: { tension: 100, friction: 14 },
    });

    // 옵션 카드 애니메이션 - 부드러운 등장 개선
    const optionSprings = useSprings(
        2,
        [0, 1].map(i => ({
            from: { opacity: 0, transform: 'translateY(30px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
            delay: 300 + i * 150,
            config: {
                tension: 65,  // 낮은 tension으로 더 부드럽게
                friction: 12,  // 적당한 마찰력
                mass: 1.2,    // 더 무거운 질량감
                easing: easings.easeOutQuart // 자연스러운 감속 이징 적용
            },
        }))
    );

    // 버튼 애니메이션
    const buttonSpring = useSpring({
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
        delay: 600,
        config: { tension: 120, friction: 14 },
    });

    // 버튼 터치 애니메이션
    const buttonHoverSpring = useSpring({
        scale: activeTouch === 'order_button' ? 0.97 : 1,
        boxShadow: activeTouch === 'order_button'
            ? '0 4px 20px rgba(30, 36, 162, 0.7)'
            : '0 8px 35px rgba(62, 73, 240, 0.5)',
        config: { tension: 300, friction: 20 },
    });

    // 화살표 애니메이션 (더 큰 움직임)
    /*
    const arrowSpring = useSpring({
        from: { transform: 'translateX(0)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'translateX(12px)', config: { duration: 1000, easing: easings.easeInOutQuad } });
                await next({ transform: 'translateX(0px)', config: { duration: 1000, easing: easings.easeInOutQuad } });
            }
        },
    });
    */

    const handleStartOrder = useCallback(() => {
        setIsLeaving(true);
    }, []);

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

    return (
        <animated.div style={pageTransition} className={styles.container}>
            <animated.div className={styles.overlay} style={overlaySpring} />
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
                    <animated.div style={logoSpring} className={styles.logoContainer}>
                        <img
                            src={logoImage}
                            alt="Barion 로고"
                            className={styles.logo}
                            onClick={handleLogoClick} // 로고 클릭 시 데이터 로드
                            style={{ cursor: 'pointer' }} // 클릭 가능함을 시각적으로 표시
                        />
                    </animated.div>
                    <animated.div style={titleSpring} className={styles.titleContainer}>
                        <h1 className={styles.brandName}>Barion</h1>
                        <div className={styles.taglineContainer}>
                            <p className={styles.tagline}>스마트 배리어프리 키오스크</p>
                        </div>
                    </animated.div>

                    <animated.div style={descriptionSpring} className={styles.descriptionContainer}>
                        <p className={styles.description}>
                            누구나 편리하고 스마트하게 이용할 수 있는<br />
                            <span className={styles.highlightText}>스마트 배리어프리 키오스크</span>를<br />
                            지금 경험해보세요
                        </p>
                    </animated.div>
                </div>

                {/* 우측 주문 섹션 */}
                <div className={styles.orderSection}>
                    <div className={styles.optionsContainer}>
                        {/* 음성 주문 안내 */}
                        <animated.div style={optionSprings[0]} className={styles.optionCard}>
                            <div className={styles.iconWrapper}>
                                <MicIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>음성 인식으로 주문</h3>
                                <p><span className={styles.wakeWord}>"Hey, Barion"</span>으로</p>
                                <p>Barion AI 비서를 호출하세요</p>
                            </div>
                        </animated.div>

                        {/* 터치 주문 안내 */}
                        <animated.div style={optionSprings[1]} className={styles.optionCard}>
                            <div className={styles.iconWrapper}>
                                <TouchAppIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>터치로 직접 주문</h3>
                                <p>기존 방식이에요</p>
                                <p>터치로 간편하게 주문하세요</p>
                            </div>
                        </animated.div>
                    </div>

                    {/* 주문 버튼 - 개선된 디자인 */}
                    <animated.div style={buttonSpring} className={styles.buttonContainer}>
                        <animated.button
                            className={styles.orderButton}
                            style={buttonHoverSpring}
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
                        </animated.button>
                    </animated.div>
                </div>
            </div>
        </animated.div>
    );
};

export default FrontPage;