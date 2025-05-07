import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const [orderData, setOrderData] = useState({
        totalPrice: 0,
        tossId: '',
        orderItems: []
    });

    // 로컬 스토리지에서 데이터 로드
    useEffect(() => {
        try {
            const price = parseInt(localStorage.getItem('totalPrice') || '0');
            const id = localStorage.getItem('tossId') || '';
            const items = JSON.parse(localStorage.getItem('orderItems') || '[]');
            setOrderData({ totalPrice: price, tossId: id, orderItems: items });
        } catch (error) {
            console.error('데이터 로딩 오류:', error);
        }
    }, []);

    // 로딩 화면 처리
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);

            // 주문 정보 콘솔에 출력 (백엔드로 전송할 데이터)
            console.log('백엔드로 전송할 주문 데이터:', {
                tossId: orderData.tossId,
                totalPrice: orderData.totalPrice,
                orderItems: orderData.orderItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity
                }))
            });

            // 백엔드로 주문 정보 전송하는 코드 (주석처리)

            // 백엔드 서버 API 엔드포인트 설정
            const API_ENDPOINT = 'https://webhook.site/1c4a8c10-7a98-44b6-ae2c-3810122202c7'; // 실제 스프링부트 서버 주소로 변경

            // 전송할 데이터 구성 (필요한 정보만 포함)
            const orderPayload = {
                tossId: orderData.tossId,
                totalPrice: orderData.totalPrice,
                orderItems: orderData.orderItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity
                })),
                orderDate: new Date().toISOString() // 주문 일시 추가
            };

            // fetch API를 사용하여 백엔드로 데이터 전송
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // JSON 파싱 없이, 상태 코드만 확인
                    console.log('주문 정보 전송 성공, status:', response.status);
                    // 만약 응답 텍스트를 보고 싶다면:
                    // return response.text();
                })
                // .then(text => console.log('응답 본문:', text))
                .catch(error => {
                    console.error('주문 정보 전송 실패:', error);
                });

        }, 3000);

        return () => clearTimeout(loadingTimer);
    }, [orderData]);

    // 카운트다운 처리
    useEffect(() => {
        if (loading) return;

        const timer = setInterval(() => {
            setCountdown(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [loading]);

    // 화면 이동 처리 부분 수정
    useEffect(() => {
        if (countdown !== 0) return;

        // 1.2초 지연 후 네비게이트. 프로그래스바 0초 남기고 정확히 이동하기 위함.
        const timeout = setTimeout(() => {
            localStorage.removeItem('orderItems');
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('tossId');
            navigate('/');
        }, 1200);

        return () => clearTimeout(timeout);
    }, [countdown, navigate]);

    // 로딩 화면
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: 3,
                    background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)',
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <CircularProgress size={80} sx={{ color: '#2142FF' }} />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: '#2142FF',
                        textAlign: 'center'
                    }}
                >
                    결제를 완료하고 있습니다
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        color: '#666',
                        textAlign: 'center'
                    }}
                >
                    잠시만 기다려주세요...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
            }}
        >
            {/* 성공 아이콘 애니메이션 */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                }}
            >
                <Box
                    sx={{
                        borderRadius: '50%',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.2)',
                    }}
                >
                    <CheckCircleIcon
                        sx={{
                            fontSize: '5rem',
                            color: '#1a56db',
                        }}
                    />
                </Box>
            </motion.div>

            {/* 결제 완료 메시지 */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        color: '#1e293b',
                        textAlign: 'center',
                        marginBottom: '1.5rem',  // 0.5rem에서 1.5rem으로 증가
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                >
                    결제가 완료되었습니다
                </Typography>
            </motion.div>

            {/* 결제 카드 컨테이너 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                style={{ width: '100%', maxWidth: '550px', marginTop: '3.5rem' }}  // 2rem에서 3.5rem으로 증가
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        transform: 'translateY(-10px)', // 전체 카드를 위로 이동
                    }}
                >
                    {/* 감사 인사 섹션 */}
                    <Box
                        sx={{
                            padding: '2rem',
                            backgroundColor: '#1a56db',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#ffffff',
                                fontWeight: 700,
                                marginBottom: '0.6rem',
                                fontSize: '1.5rem'
                            }}
                        >
                            주문해 주셔서 감사합니다
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                            }}
                        >
                            주문이 접수되었습니다. 즐거운 하루 되세요!
                        </Typography>
                    </Box>

                    <Box sx={{ padding: '1.8rem' }}>
                        {/* 카운트다운 섹션 */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.2rem',
                                gap: '0.5rem',
                            }}>
                                <AccessTimeFilledIcon sx={{ color: '#1a56db', fontSize: '1.5rem' }} />
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: '#1e293b',
                                        fontWeight: 600,
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    {countdown}초 후 메인화면으로 돌아갑니다
                                </Typography>
                            </Box>

                            {/* 카운트다운 프로그레스 바 */}
                            <Box sx={{ position: 'relative', marginTop: '1rem' }}>
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${(countdown / 10) * 100}%` }}
                                    transition={{ duration: 1, ease: "linear" }}
                                    style={{
                                        height: '10px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(90deg, #1a56db, #3b82f6)',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(226, 232, 240, 0.8)',
                                        zIndex: -1,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>

            {/* 라이센스 텍스트 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', fontWeight: 500 }}>
                    Barion Kiosk © {new Date().getFullYear()} Made By WJLEE22
                </Typography>
            </motion.div>
        </Box>
    );
};

export default PaymentSuccessPage;