import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Context 제거하고 로컬 스토리지 사용
// import { useOrder } from '../contexts/OrderContext';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(5);
    // Context 대신 로컬 상태 사용
    const [orderData, setOrderData] = useState({
        orderItems: [],
        totalPrice: 0,
        orderId: ''
    });

    // 로컬 스토리지에서 데이터 로드
    useEffect(() => {
        try {
            // 로컬 스토리지에서 주문 정보 불러오기
            const items = JSON.parse(localStorage.getItem('orderItems') || '[]');
            const price = parseInt(localStorage.getItem('totalPrice') || '0');
            const id = localStorage.getItem('orderId') || '';

            setOrderData({
                orderItems: items,
                totalPrice: price,
                orderId: id
            });
        } catch (error) {
            console.error('주문 데이터 로딩 오류:', error);
        }
    }, []);

    // 처음 2-3초 동안 로딩 화면 표시
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);

            // 주문 정보 콘솔에 출력 (백엔드로 전송할 데이터)
            console.log('백엔드로 전송할 주문 데이터:', {
                orderId: orderData.orderId,
                totalPrice: orderData.totalPrice,
                orderItems: orderData.orderItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity
                }))
            });

        }, 2500); // 2.5초 후 로딩 완료

        return () => clearTimeout(loadingTimer);
    }, [orderData]);

    // 카운트다운과 네비게이션을 분리한 개선된 코드

    // 1) 순수하게 카운트다운만 담당하는 effect
    useEffect(() => {
        if (loading) return;

        const timer = setInterval(() => {
            setCountdown(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [loading]);

    // 2) countdown 변화 감지하여 네비게이션 처리하는 별도 effect
    useEffect(() => {
        if (countdown !== 0) return;

        // 로컬스토리지 정리
        localStorage.removeItem('orderItems');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('orderId');

        // 렌더링이 완료된 후 네비게이션 수행
        navigate('/');
    }, [countdown, navigate]);

    // 로딩 화면 (기존 코드 유지)
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    gap: 2,
                    background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)',
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <CircularProgress size={70} sx={{ color: '#2142FF' }} />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: '#2142FF',
                        textAlign: 'center'
                    }}
                >
                    결제를 완료하고 있습니다
                </Typography>
                <Typography
                    variant="body1"
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '32px',
                background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)',
            }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
                <CheckCircleIcon
                    sx={{
                        fontSize: '120px',
                        color: '#2142FF',
                        mb: 3,
                    }}
                />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        textAlign: 'center',
                    }}
                >
                    결제가 완료되었습니다
                </Typography>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1.2rem',
                        mb: 5,
                        textAlign: 'center',
                        color: '#555',
                    }}
                >
                    주문이 성공적으로 처리되었습니다
                </Typography>
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ width: '100%', maxWidth: '500px' }}
            >
                <Box
                    sx={{
                        width: '100%',
                        p: 3,
                        mb: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '20px',
                        boxShadow: '0 10px 35px rgba(33, 66, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2142FF' }}>
                        주문 요약
                    </Typography>

                    {orderData.orderItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1.5,
                                pb: index !== orderData.orderItems.length - 1 ? 1.5 : 0,
                                borderBottom: index !== orderData.orderItems.length - 1 ? '1px dashed #e0e0e0' : 'none'
                            }}
                        >
                            <Typography sx={{ fontWeight: 500 }}>
                                {item.name} x {item.quantity}
                            </Typography>
                            <Typography sx={{ fontWeight: 600 }}>
                                {(item.price * item.quantity).toLocaleString()}원
                            </Typography>
                        </Box>
                    ))}

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2.5,
                        pt: 2,
                        borderTop: '2px solid #e8eaf6',
                        alignItems: 'center'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#222' }}>
                            총 결제금액
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: '#2142FF',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            {orderData.totalPrice.toLocaleString()}원
                        </Typography>
                    </Box>
                </Box>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                        {countdown}초 후 첫 화면으로 이동합니다
                    </Typography>

                    <Box
                        sx={{
                            width: '100px',
                            height: '100px',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CircularProgress
                            variant="determinate"
                            value={(countdown / 5) * 100}
                            size={80}
                            thickness={4}
                            sx={{ color: '#2142FF' }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                position: 'absolute',
                                fontWeight: 700,
                                color: '#2142FF'
                            }}
                        >
                            {countdown}
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default PaymentSuccessPage;