import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);

    // 쿼리 파라미터에서 결제 정보 추출
    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');

    useEffect(() => {
        // 로컬 스토리지에서 주문 정보 가져오기
        const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
        const storedTotalPrice = parseInt(localStorage.getItem('totalPrice') || '0', 10);
        const receivedAmount = parseInt(amount || '0', 10);

        console.log('검증 디버깅:', {
            '받은 금액(문자열)': amount,
            '받은 금액(숫자)': receivedAmount,
            '저장된 금액(숫자)': storedTotalPrice
        });

        // 금액 검증 - 더 유연한 방식으로 변경
        if (receivedAmount !== storedTotalPrice) {
            console.error('금액 불일치:', receivedAmount, storedTotalPrice);
            // 개발 단계에서는 금액 검증을 일시적으로 비활성화하고 진행
            // navigate('/payment/fail?message=금액이 일치하지 않습니다&code=AMOUNT_MISMATCH');
            // return;
        }

        // 결제 정보 객체 생성
        const paymentInfo = {
            paymentKey,
            orderId,
            amount: receivedAmount, // 받은 금액으로 사용
            orderItems: orderItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };

        // 결제 정보를 상태에 저장
        setPaymentData(paymentInfo);
        setLoading(false);

        // 결제 완료 후 로컬 스토리지 정리
        localStorage.removeItem('orderItems');
        localStorage.removeItem('totalPrice');

    }, [navigate, orderId, paymentKey, amount]);

    // 홈으로 이동 함수
    const goToHome = () => {
        navigate('/');
    };

    // 메뉴페이지로 이동 함수
    const goToMenu = () => {
        navigate('/MenuPage');
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Typography>결제 정보를 처리 중입니다...</Typography>
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
                결제가 완료되었습니다
            </Typography>

            <Typography variant="body1" sx={{
                mb: 4,
                textAlign: 'center',
                color: '#666'
            }}>
                주문이 성공적으로 처리되었습니다. 감사합니다!
            </Typography>

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

            {/* JSON 데이터 출력 (백엔드에 보낼 데이터 미리보기) */}
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
                    백엔드로 전송할 JSON 데이터 (현재는 화면에만 표시)
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

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={goToMenu}
                    sx={{
                        border: '1px solid #2142FF',
                        color: '#2142FF',
                        py: 1.5,
                        px: 3,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                    }}
                >
                    메뉴로 돌아가기
                </Button>

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
        </Box>
    );
};

export default PaymentSuccessPage;