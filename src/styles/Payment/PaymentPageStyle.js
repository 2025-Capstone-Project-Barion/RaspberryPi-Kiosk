import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const PaymentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '32px 24px',
    maxWidth: '700px',
    minHeight: '90vh',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(33, 66, 255, 0.08)',
    background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)',
});

// OrderSummaryBox와 PaymentHeader는 필요 없으므로 제거

export const PaymentWidgetContainer = styled(Box)({
    margin: '24px 0 40px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '18px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
    backdropFilter: 'blur(10px)',
    '& > div': {
        borderRadius: '12px',
        overflow: 'hidden'
    }
});

export const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
});

export const PaymentButton = styled('button')({
    backgroundColor: '#2142FF',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    fontSize: '1.2rem',
    fontWeight: 700,
    borderRadius: '16px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(33, 66, 255, 0.25)',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '400px',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 28px rgba(33, 66, 255, 0.35)',
    },
    '&:active': {
        transform: 'translateY(1px)',
        boxShadow: '0 5px 15px rgba(33, 66, 255, 0.2)',
    },
    '&:disabled': {
        backgroundColor: '#a0a0a0',
        boxShadow: 'none',
        cursor: 'not-allowed'
    }
});