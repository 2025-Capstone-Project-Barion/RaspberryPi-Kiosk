import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // CheckCircleIcon으로 변경
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(10); // 10초로 변경
    const [orderData, setOrderData] = useState({
        totalPrice: 0,
        orderId: ''
    });

    // 로컬 스토리지에서 데이터 로드
    useEffect(() => {
        try {
            const price = parseInt(localStorage.getItem('totalPrice') || '0');
            const id = localStorage.getItem('orderId') || '';
            setOrderData({ totalPrice: price, orderId: id });
        } catch (error) {
            console.error('데이터 로딩 오류:', error);
        }
    }, []);

    // 로딩 화면 처리
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);
            console.log('결제 완료:', orderData);
        }, 2000);

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

    // 화면 이동 처리
    useEffect(() => {
        if (countdown !== 0) return;

        // 로컬스토리지 정리
        localStorage.removeItem('orderItems');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('orderId');

        navigate('/');
    }, [countdown, navigate]);

    // 기존 로딩 화면으로 복원, 텍스트 크기만 키움
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: 3, // 간격 약간 키움
                    background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)',
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <CircularProgress size={80} sx={{ color: '#2142FF' }} /> {/* 크기 키움 */}
                </Box>
                <Typography
                    variant="h4" // h5에서 h4로 변경하여 크기 키움
                    sx={{
                        fontWeight: 600,
                        color: '#2142FF',
                        textAlign: 'center'
                    }}
                >
                    결제를 완료하고 있습니다
                </Typography>
                <Typography
                    variant="h6" // body1에서 h6로 변경하여 크기 키움
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
            {/* 성공 아이콘 애니메이션 - CheckCircleIcon으로 변경 */}
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
                        marginBottom: '0.5rem',
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
                style={{ width: '100%', maxWidth: '550px', marginTop: '2rem' }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}
                >
                    {/* 결제 금액 섹션 */}
                    <Box
                        sx={{
                            padding: '1.8rem',
                            backgroundColor: '#1a56db',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                marginBottom: '0.5rem',
                                fontSize: '1.1rem',
                            }}
                        >
                            총 결제 금액
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PaidOutlinedIcon sx={{ fontSize: '2rem', color: '#ffffff' }} />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    fontSize: { xs: '2.2rem', md: '2.8rem' },
                                }}
                            >
                                {orderData.totalPrice.toLocaleString()}원
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ padding: '2rem' }}>
                        {/* 주문 감사 메시지 */}
                        <Box sx={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    fontSize: '1.3rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                주문해 주셔서 감사합니다
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#64748b',
                                    fontSize: '1rem',
                                }}
                            >
                                주문이 접수되었습니다. 잠시 후 맛있는 식사를 즐기세요.
                            </Typography>
                        </Box>

                        <Divider sx={{ margin: '1rem 0' }} />

                        {/* 카운트다운 섹션 - 카운트다운 10초로 변경 */}
                        <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
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

                            {/* 카운트다운 프로그레스 바 - 10초로 수정 */}
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

            {/* 라이센스 추가 아이콘 효과 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 1.5
                }}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                    결제 시스템 © {new Date().getFullYear()} 키오스크 솔루션
                </Typography>
            </motion.div>
        </Box>
    );
};

export default PaymentSuccessPage;