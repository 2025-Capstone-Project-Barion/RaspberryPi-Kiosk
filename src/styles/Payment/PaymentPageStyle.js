import styled from '@emotion/styled';
import { Box } from '@mui/material';

// 전체 페이지 컨테이너 - 화면 전체를 채우도록 수정
export const PaymentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100vh',
    padding: 0,
    margin: 0,
    backgroundColor: '#f7f9ff',
    overflow: 'hidden',
    position: 'relative'
});

// 페이지 헤더 추가
export const PaymentHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    zIndex: 10,
});

export const HeaderTitle = styled(Box)({
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
        marginRight: '12px',
        color: '#2142FF',
        fontSize: '1.8rem'
    }
});

// 위젯 컨테이너 - 화면의 대부분을 차지하도록 수정
export const PaymentWidgetContainer = styled(Box)({
    flex: 1,
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'auto',
    '& > div': {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        minHeight: '400px',
        padding: '16px'
    }
});

// 주문 요약 섹션 추가
export const OrderSummary = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#f0f5ff',
    borderRadius: '12px',
    margin: '0 24px 16px',
    boxShadow: '0 2px 8px rgba(33, 66, 255, 0.1)',
});

export const OrderInfo = styled(Box)({
    '& h4': {
        margin: '0 0 4px 0',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#1e293b',
    },
    '& p': {
        margin: 0,
        fontSize: '0.95rem',
        color: '#64748b',
    }
});

export const TotalPrice = styled(Box)({
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#2142FF',
});

// 버튼 컨테이너 - 하단에 고정되도록 수정
export const ButtonContainer = styled(Box)({
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
});

// 결제 버튼 - 키오스크 스타일로 수정
export const PaymentButton = styled('button')({
    backgroundColor: '#2142FF',
    color: 'white',
    border: 'none',
    padding: '22px',
    fontSize: '1.4rem',
    fontWeight: 700,
    borderRadius: '14px',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(33, 66, 255, 0.2)',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: '0.5px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: '#1a37e8',
    },
    '&:active': {
        transform: 'scale(0.98)',
        boxShadow: '0 4px 8px rgba(33, 66, 255, 0.2)',
    },
    '&:disabled': {
        backgroundColor: '#a0a0a0',
        boxShadow: 'none',
        cursor: 'not-allowed'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        right: '-10px',
        bottom: '-10px',
        border: '2px solid #2142FF',
        borderRadius: '16px',
        animation: 'pulse 1.5s infinite',
        opacity: 0,
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
            opacity: 0,
        },
        '50%': {
            opacity: 0.3,
        },
        '100%': {
            transform: 'scale(1.05)',
            opacity: 0,
        },
    },
});