// MUI & React-Spring 애니메이션을 활용한 Front 컴포넌트
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// @react-spring/web은 React 16.8.0, 17.0.0, 또는 18.0.0 버전과 호환되기에, React 18 버전으로 다운그레이드하자.
// npm uninstall react react-dom
// npm install react @18.2.0 react-dom@18.2.0
// npm install @react-spring/web
import { useTransition, animated, useSpring } from '@react-spring/web'
import styles from '../styles/Front/frontPage.module.css'
import { Button } from '@mui/material';

// background 이미지들
import modernCafe from '../assets/Image/FrontPageBackgroundImages/디저트.jpg';
import seryenCafe from '../assets/Image/FrontPageBackgroundImages/세련카페.jpg';
import desert from '../assets/Image/FrontPageBackgroundImages/3d배경.jpg';
import cafeMood from '../assets/Image/FrontPageBackgroundImages/3d배경2.jpg';

const slides = [
    modernCafe,    // 모던한 카페 인테리어 이미지
    seryenCafe,    // 세련된 커피 이미지
    desert,        // 새로운 디저트 플레이팅 이미지
    cafeMood       // 카페 분위기 이미지
];

const messages = [
    "안녕하세요😊\nBarion 입니다",
    "손을 좌우로 흔들어\n주문을 시작해보세요",
    "우리 모두를 위한\n스마트 키오스크 플렛폼",
    "Barion과 함께\n스마트한 주문을 경험하세요",
];

const FrontPage = () => {
    const navigate = useNavigate();
    const [index, set] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);

    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 }, // 이미지 전환 시간 증가
        onRest: (_a, _b, item) => {
            if (index === item) {
                set(state => (state + 1) % slides.length)
            }
        },
    });

    // 페이지 전환 애니메이션
    const pageTransition = useSpring({
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? 'scale(1.1)' : 'scale(1)',
        config: { tension: 280, friction: 60 },
        onRest: () => {
            if (isLeaving) navigate('/MenuPage');
        },
    });

    // 버튼 애니메이션
    const buttonSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 1000,
        config: { tension: 120, friction: 14 },
    });

    // 하단 instruction 박스용 스프링 (한번만 나타나도록)
    const textSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        // reset 옵션 제거
        delay: 1000,
        config: { tension: 120, friction: 60 }, // 더 부드러운 애니메이션
    });

    // 메시지 전환용 스프링
    const messageSpring = useSpring({
        opacity: 1, // 페이드 효과만 사용
        delay: 500,
        config: { duration: 3000 }, // 더 긴 지속 시간
        key: index, // 메시지가 변경될 때만 애니메이션 실행
    });

    const handleStartOrder = () => {
        setIsLeaving(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            set(state => (state + 1) % slides.length);
        }, 20000); // 20초로 증가
        return () => clearInterval(timer);
    }, []);

    return (
        <animated.div style={pageTransition} className={styles.container}>
            {transitions((style, i) => (
                <animated.div
                    className={styles.bg}
                    style={{
                        ...style,
                        backgroundImage: `url(${slides[i]})`,
                    }}
                />
            ))}
            <div className={styles.content}>
                <animated.div style={messageSpring} className={styles.messageBox}>
                    {messages[index].split('\n').map((text, i) => (
                        <h1 key={i}>{text}</h1>
                    ))}
                </animated.div>
                <animated.div style={buttonSpring} className={styles.orderButton}>
                    <Button
                        onClick={handleStartOrder}
                        size="lg"
                        variant="solid"
                        sx={{
                            minWidth: '280px',
                            fontSize: '1.5rem',
                            padding: '1.5rem 3rem',
                            borderRadius: '50px',
                            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
                            },
                            transition: 'all 0.3s ease-in-out',
                        }}
                    >
                        주문하러 가기
                    </Button>
                </animated.div>
                <animated.div style={textSpring} className={styles.instructionBox}>
                    <div className={styles.handwave}>👋</div>
                    <p>화면을 터치하거나 손을 흔들어서 시작하세요</p>
                </animated.div>
            </div>
        </animated.div>
    );
};

export default FrontPage;