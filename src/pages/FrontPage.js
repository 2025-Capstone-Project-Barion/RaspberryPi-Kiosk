import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@mui/material';
import styles from '../styles/Front/frontPage.module.css';

// 로고 및 아이콘
import logoImage from '../assets/Image/Logo/logo.png';
import MicIcon from '@mui/icons-material/Mic';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const FrontPage = () => {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);

    // 페이지 전환 애니메이션 - 간소화
    const pageTransition = useSpring({
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'translateY(-30px)' : 'translateY(0)',
        config: { tension: 280, friction: 60 },
        onRest: () => {
            if (isLeaving) navigate('/MenuPage');
        },
    });

    // 로고 애니메이션
    const logoSpring = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { tension: 180, friction: 20 },
    });

    // 안내 메시지 애니메이션
    const textSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 300,
        config: { tension: 120, friction: 14 },
    });

    // 버튼 애니메이션
    const buttonSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 600,
        config: { tension: 120, friction: 14 },
    });

    // 음성 명령 아이콘 애니메이션
    const iconSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 900,
        config: { tension: 120, friction: 14 },
    });

    const handleStartOrder = () => {
        setIsLeaving(true);
    };

    return (
        <animated.div style={pageTransition} className={styles.container}>
            <div className={styles.content}>
                {/* 로고 섹션 */}
                <animated.div style={logoSpring} className={styles.logoSection}>
                    <img src={logoImage} alt="Barion 로고" className={styles.logo} />
                    <h1 className={styles.brandName}>Barion</h1>
                    <p className={styles.tagline}>스마트 배리어프리 키오스크</p>
                </animated.div>

                {/* 안내 메시지 섹션 */}
                <animated.div style={textSpring} className={styles.instructionSection}>
                    <h2>주문 방법을 선택하세요</h2>

                    {/* 음성 주문 안내 */}
                    <animated.div style={iconSpring} className={styles.optionCard}>
                        <div className={styles.iconWrapper}>
                            <MicIcon className={styles.optionIcon} />
                        </div>
                        <div className={styles.optionText}>
                            <h3>"Hey, Barion"</h3>
                            <p>먼저 부른 후,</p>
                            <p>"주문할래"라고 말해보세요</p>
                        </div>
                    </animated.div>

                    {/* 터치 주문 안내 */}
                    <animated.div style={iconSpring} className={styles.optionCard}>
                        <div className={styles.iconWrapper}>
                            <TouchAppIcon className={styles.optionIcon} />
                        </div>
                        <div className={styles.optionText}>
                            <h3>터치로 주문하기</h3>
                            <p>아래 버튼을 터치하세요</p>
                        </div>
                    </animated.div>
                </animated.div>

                {/* 버튼 섹션 */}
                <animated.div style={buttonSpring} className={styles.buttonSection}>
                    <Button
                        onClick={handleStartOrder}
                        variant="contained"
                        className={styles.orderButton}
                        sx={{
                            backgroundColor: '#3E49F0',
                            fontSize: '1.25rem',
                            padding: '0.75rem 2.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(62, 73, 240, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#2D37C4',
                                boxShadow: '0 6px 25px rgba(62, 73, 240, 0.4)',
                            },
                        }}
                    >
                        주문하러 가기
                    </Button>
                </animated.div>
            </div>
        </animated.div>
    );
};

export default FrontPage;