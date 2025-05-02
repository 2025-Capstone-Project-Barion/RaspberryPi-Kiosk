import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, useSprings, animated } from '@react-spring/web';
import styles from '../styles/Front/frontPage.module.css';

// 로고 및 아이콘
import logoImage from '../assets/Image/Logo/logo.png';
import MicIcon from '@mui/icons-material/Mic';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WavesIcon from '@mui/icons-material/Waves';

// 배경 애니메이션 파티클 데이터
const PARTICLES = 35; // 파티클 수량 증가
const generateParticles = () => {
    return Array.from({ length: PARTICLES }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 8, // 크기 증가
        opacity: 0.15 + Math.random() * 0.3, // 투명도 조정
    }));
};

const FrontPage = () => {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);
    const [activeTouch, setActiveTouch] = useState(null);
    const particles = generateParticles();

    // 이미지 사전 로드 (메뉴 페이지 이미지)
    useEffect(() => {
        const preloadImages = [
            '/static/media/coffee1.jpg',
            '/static/media/coffee2.jpg',
            '/static/media/dessert1.jpg',
            '/static/media/beverage1.jpg',
        ];

        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // 파티클 애니메이션 - 더 뚜렷하고 다양하게
    const particleSprings = useSprings(
        PARTICLES,
        particles.map(particle => ({
            from: {
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0.3,
            },
            to: async (next) => {
                // 초기 페이드인
                await next({
                    opacity: particle.opacity,
                    scale: 1,
                    config: { tension: 80, friction: 10 }
                });

                // 계속 움직이는 애니메이션
                while (true) {
                    await next({
                        x: particle.x + (Math.random() * 15 - 7.5), // 더 큰 움직임
                        y: particle.y + (Math.random() * 15 - 7.5),
                        opacity: 0.1 + Math.random() * 0.4, // 더 큰 투명도 변화
                        scale: 0.8 + Math.random() * 0.4, // 크기도 변화
                        config: { duration: 4000 + Math.random() * 4000 }
                    });
                }
            },
        }))
    );

    // 페이지 전환 애니메이션
    const pageTransition = useSpring({
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'scale(1.05) translateX(-5%)' : 'scale(1) translateX(0%)',
        config: { tension: 200, friction: 26 },
        onRest: () => {
            if (isLeaving) navigate('/MenuPage');
        },
    });

    // 좌측 섹션 배경 물결 효과
    const waveSpring = useSpring({
        from: { transform: 'translateY(0px)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'translateY(-15px)', config: { duration: 3000 } });
                await next({ transform: 'translateY(15px)', config: { duration: 3000 } });
            }
        },
    });

    // 로고 섹션 애니메이션
    const logoSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 120, friction: 14 },
    });

    // 로고 부드러운 움직임 애니메이션
    const logoFloating = useSpring({
        from: { transform: 'translateY(0px)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'translateY(-5px) rotate(2deg)', config: { duration: 2500 } });
                await next({ transform: 'translateY(5px) rotate(-2deg)', config: { duration: 2500 } });
            }
        },
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

    // 우측 배경 물결 효과
    const rightWaveSpring = useSpring({
        from: { transform: 'translateY(0px)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'translateY(15px)', config: { duration: 3500 } });
                await next({ transform: 'translateY(-15px)', config: { duration: 3500 } });
            }
        },
    });

    // 옵션 카드 애니메이션
    const optionSprings = useSprings(
        2, // 2개의 카드
        [0, 1].map(i => ({
            from: { opacity: 0, transform: 'translateX(50px)' },
            to: { opacity: 1, transform: 'translateX(0)' },
            delay: 400 + i * 150,
            config: { tension: 120, friction: 14 },
        }))
    );

    // 버튼 애니메이션
    const buttonSpring = useSpring({
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
        delay: 700,
        config: { tension: 120, friction: 14 },
    });

    // 버튼 터치 애니메이션
    const buttonHoverSpring = useSpring({
        scale: activeTouch === 'order_button' ? 0.96 : 1,
        boxShadow: activeTouch === 'order_button'
            ? '0 4px 15px rgba(62, 73, 240, 0.6)'
            : '0 8px 30px rgba(62, 73, 240, 0.4)',
        config: { tension: 300, friction: 20 },
    });

    // 화살표 애니메이션
    const arrowSpring = useSpring({
        from: { transform: 'translateX(0)' },
        to: async (next) => {
            while (true) {
                await next({ transform: 'translateX(8px)', config: { duration: 1000 } });
                await next({ transform: 'translateX(0px)', config: { duration: 1000 } });
            }
        },
    });

    // 물결 아이콘 애니메이션
    const wavesIconSpring = useSpring({
        from: { opacity: 0.5 },
        to: async (next) => {
            while (true) {
                await next({ opacity: 0.8, config: { duration: 1500 } });
                await next({ opacity: 0.5, config: { duration: 1500 } });
            }
        },
    });

    const handleStartOrder = () => {
        setIsLeaving(true);
    };

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

    return (
        <animated.div style={pageTransition} className={styles.container}>
            {/* 배경 파티클 - 더 눈에 띄게 */}
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
            ))}

            <div className={styles.content}>
                {/* 좌측 브랜드 섹션 */}
                <div className={styles.brandSection}>
                    {/* 배경 물결 효과 */}
                    <animated.div className={styles.backgroundWave} style={waveSpring}>
                        <animated.div className={styles.wavesIconContainer} style={wavesIconSpring}>
                            <WavesIcon className={styles.wavesIcon} />
                        </animated.div>
                    </animated.div>

                    <animated.div style={logoSpring} className={styles.logoContainer}>
                        <animated.img
                            src={logoImage}
                            alt="Barion 로고"
                            className={styles.logo}
                            style={logoFloating}
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
                            누구나 편리하게 이용할 수 있는<br />
                            <span className={styles.highlightText}>음성 인식 기반 키오스크</span>를<br />
                            지금 경험해보세요
                        </p>
                    </animated.div>
                </div>

                {/* 우측 주문 섹션 */}
                <div className={styles.orderSection}>
                    {/* 우측 배경 물결 효과 */}
                    <animated.div className={styles.rightBackgroundWave} style={rightWaveSpring}></animated.div>

                    <div className={styles.optionsContainer}>
                        <h2 className={styles.optionsTitle}>주문 방법</h2>

                        {/* 음성 주문 안내 - 내용 변경 */}
                        <animated.div style={optionSprings[0]} className={styles.optionCard}>
                            <div className={styles.iconWrapper}>
                                <MicIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>음성으로 주문하기</h3>
                                <p><span className={styles.highlight}>"Hey, Barion"</span>이라고 부르면</p>
                                <p>Barion이 음성 명령을 인식합니다</p>
                            </div>
                        </animated.div>

                        {/* 터치 주문 안내 - 내용 변경 */}
                        <animated.div style={optionSprings[1]} className={styles.optionCard}>
                            <div className={styles.iconWrapper}>
                                <TouchAppIcon className={styles.optionIcon} />
                            </div>
                            <div className={styles.optionText}>
                                <h3 className={styles.optionTitle}>터치로 주문하기</h3>
                                <p>화면을 터치하여 원하는 메뉴를</p>
                                <p>직접 선택할 수 있습니다</p>
                            </div>
                        </animated.div>
                    </div>

                    {/* 주문 버튼 - 크게 강조 */}
                    <animated.div style={buttonSpring} className={styles.buttonContainer}>
                        <animated.button
                            className={styles.orderButton}
                            style={buttonHoverSpring}
                            onTouchStart={() => handleTouchStart('order_button')}
                            onTouchEnd={() => handleTouchEnd('order_button')}
                            onClick={handleStartOrder}
                        >
                            <span className={styles.buttonText}>주문하러 가기</span>
                            <animated.div className={styles.arrowIcon} style={arrowSpring}>
                                <ArrowForwardIcon />
                            </animated.div>
                        </animated.button>
                    </animated.div>
                </div>
            </div>
        </animated.div>
    );
};

export default FrontPage;