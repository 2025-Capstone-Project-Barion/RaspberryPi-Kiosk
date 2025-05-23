import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { motion } from 'framer-motion';
import { playAudio } from '../utils/audioManager';
import { useMqtt, TOPICS } from '../context/MqttContext'; // MQTT Context 추가
// API 기본 URL
const API_BASE_URL = "http://13.209.99.95:8080";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const [orderData, setOrderData] = useState({
        totalPrice: 0,
        tossId: '',
        orderItems: []
    });
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const { publish } = useMqtt(); // MQTT 훅 추가

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

    // 로딩 화면 처리 및 백엔드로 주문 정보 전송
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);

            // 백엔드로 주문 정보 전송
            if (!orderSubmitted && orderData.orderItems.length > 0) {
                submitOrder();
            }
        }, 3000);

        return () => clearTimeout(loadingTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderData]);

    // 로딩 완료 후 결제 성공 메시지 전송
    useEffect(() => {
        if (!loading && !orderSubmitted) {
            // 결제 성공 신호를 루빅파이로 전송 (다시 리니어 액추에이터을 원위치로 올리기 위함)
            publish(TOPICS.PAYMENT_DONE, "complete");
            console.log('MQTT: 결제 완료 신호 전송');
        }
    }, [loading, orderSubmitted, publish]);

    // 주문 정보 백엔드로 전송하는 함수
    const submitOrder = async () => {
        // 전송할 데이터 구성
        const orderPayload = {
            storeId: 0,
            orderDate: new Date().toISOString(),
            orderStatus: "COMPLETED", // 주문 상태 추가
            totalAmount: orderData.totalPrice,
            items: orderData.orderItems.map(item => ({
                menuId: item.menuId,
                menuName: item.menuName,
                quantity: item.quantity,
                unitPrice: item.price,
                totalPrice: item.price * item.quantity
            }))
        };

        try {
            console.log('주문 데이터 전송:', orderPayload);

            // 백엔드로 주문 데이터 전송
            const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('주문 전송 성공:', responseData);
            setOrderSubmitted(true);
        } catch (error) {
            console.error('주문 정보 전송 실패:', error);
            // 실패해도 사용자 경험 유지를 위해 화면은 계속 진행
        }
    };

    // 카운트다운 처리
    useEffect(() => {
        if (loading) return;

        const timer = setInterval(() => {
            setCountdown(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [loading]);

    // 결제 성공 감사 음성 재생 (별도의 useEffect로 분리)
    useEffect(() => {
        if (!loading) {
            // 결제 성공 감사 음성 재생
            playAudio('thankYou');
        }
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
                            구매해 주셔서 감사합니다
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