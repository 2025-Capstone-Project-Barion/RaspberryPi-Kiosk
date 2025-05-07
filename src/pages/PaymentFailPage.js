import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const PaymentFailPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 에러 메시지와 코드 추출
    const errorMessage = searchParams.get('message') || '결제 중 오류가 발생했습니다';
    const errorCode = searchParams.get('code') || 'UNKNOWN_ERROR';

    // 메뉴 페이지로 돌아가기
    const goToMenuPage = () => {
        // 주문 정보 초기화 (로컬 스토리지 비우기)
        localStorage.removeItem('orderItems');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('tossId');

        navigate('/MenuPage');
    };

    // 다시 결제하기
    const retryPayment = () => {
        navigate('/payment');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            maxWidth: '600px',
            margin: '0 auto',
        }}>
            <ErrorIcon sx={{
                fontSize: '80px',
                color: '#e53935',
                mb: 3
            }} />

            <Typography variant="h4" sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: 'center'
            }}>
                결제에 실패했습니다
            </Typography>

            <Typography variant="body1" sx={{
                mb: 2,
                textAlign: 'center',
                color: '#666'
            }}>
                {errorMessage}
            </Typography>

            <Typography variant="caption" sx={{
                mb: 4,
                textAlign: 'center',
                color: '#999'
            }}>
                오류 코드: {errorCode}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={goToMenuPage}
                    sx={{
                        border: '1px solid #ccc',
                        color: '#555',
                        py: 1.5,
                        px: 3,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                            border: '1px solid #aaa',
                            bgcolor: '#f9f9f9'
                        }
                    }}
                >
                    메뉴로 돌아가기
                </Button>

                <Button
                    variant="contained"
                    onClick={retryPayment}
                    sx={{
                        bgcolor: '#2142FF',
                        py: 1.5,
                        px: 3,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: '#1a35cc'
                        }
                    }}
                >
                    다시 결제하기
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentFailPage;