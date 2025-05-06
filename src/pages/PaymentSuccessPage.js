import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    // 쿼리 파라미터에서 결제 정보 추출
    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');

    useEffect(() => {
        // 로컬 스토리지에서 주문 정보 가져오기
        const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
        const storedTotalPrice = parseInt(localStorage.getItem('totalPrice') || '0', 10);
        const receivedAmount = parseInt(amount || '0', 10);

        console.log('금액 불일치:', receivedAmount, storedTotalPrice);

        // 결제 정보 객체 생성
        const paymentInfo = {
            paymentKey,
            orderId,
            amount: receivedAmount,
            orderItems: orderItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };


        // 테스트 환경에서는 결제 승인 API 호출을 모방
        const confirmPayment = async () => {
            try {
                // 실제로는 서버에 요청을 보내 결제 승인 API를 호출해야 함
                // 테스트 환경에서는 성공했다고 가정
                console.log('결제 승인 요청 데이터:', {
                    paymentKey,
                    orderId,
                    amount: receivedAmount
                });

                // 결제 성공 처리
                setPaymentData(paymentInfo);
                setPaymentConfirmed(true);

                // 로컬 스토리지 정리
                localStorage.removeItem('orderItems');
                localStorage.removeItem('totalPrice');
            } catch (error) {
                console.error('결제 승인 실패:', error);
                navigate('/payment/fail?message=결제 승인 실패&code=CONFIRM_FAILED');
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [navigate, orderId, paymentKey, amount]);

    // 홈으로 이동 함수
    const goToHome = () => {
        navigate('/');
    };


    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: 2
            }}>
                <CircularProgress />
                <Typography>결제를 완료하고 있습니다...</Typography>
            </Box>
        );
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            maxWidth: '700px',
            margin: '0 auto',
        }}>
            <CheckCircleIcon sx={{
                fontSize: '80px',
                color: '#2142FF',
                mb: 3
            }} />

            <Typography variant="h4" sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: 'center'
            }}>
                {paymentConfirmed
                    ? '결제가 완료되었습니다'
                    : '결제 진행 중입니다'}
            </Typography>

            <Typography variant="body1" sx={{
                mb: 4,
                textAlign: 'center',
                color: '#666'
            }}>
                {paymentConfirmed
                    ? '주문이 성공적으로 처리되었습니다. 감사합니다!'
                    : '결제가 진행 중입니다. 잠시만 기다려주세요.'}
            </Typography>

            {paymentData && (
                <>
                    <Box sx={{
                        width: '100%',
                        p: 3,
                        bgcolor: '#f7f9ff',
                        borderRadius: '16px',
                        mb: 4
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            결제 정보
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">주문번호</Typography>
                            <Typography>{paymentData?.orderId}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">결제금액</Typography>
                            <Typography>{paymentData?.amount.toLocaleString()}원</Typography>
                        </Box>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            width: '100%',
                            p: 2,
                            mb: 4,
                            bgcolor: '#f0f4ff',
                            border: '1px solid #d0d7ff',
                            borderRadius: '8px',
                            fontFamily: 'monospace'
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2142FF' }}>
                            전송할 데이터 (JSON)
                        </Typography>
                        <Box
                            component="pre"
                            sx={{
                                overflowX: 'auto',
                                fontSize: '0.85rem',
                                p: 1,
                                m: 0
                            }}
                        >
                            {JSON.stringify(paymentData, null, 2)}
                        </Box>
                    </Paper>
                </>
            )}

            <Button
                variant="contained"
                onClick={goToHome}
                sx={{
                    bgcolor: '#2142FF',
                    py: 1.5,
                    px: 4,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                        bgcolor: '#1a35cc'
                    }
                }}
            >
                홈으로 돌아가기
            </Button>
        </Box>
    );
};

export default PaymentSuccessPage;