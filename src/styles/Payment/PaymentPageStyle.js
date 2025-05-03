import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const PaymentContainer = styled(Box)({
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
});

export const PaymentHeader = styled(Box)({
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
        content: '""',
        width: '6px',
        height: '24px',
        backgroundColor: '#2142FF',
        borderRadius: '3px',
        marginRight: '12px'
    }
});

export const OrderSummaryBox = styled(Box)({
    marginBottom: '28px',
    padding: '20px',
    backgroundColor: '#f7f9ff',
    borderRadius: '14px',
    border: '1px solid #e0e7ff',
});

export const PaymentWidgetContainer = styled(Box)({
    marginBottom: '24px',
    '& > div': {
        marginBottom: '16px',
    }
});

export const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
});

export const PaymentButton = styled('button')({
    backgroundColor: '#2142FF',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(33, 66, 255, 0.25)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(33, 66, 255, 0.35)',
    },
    '&:active': {
        transform: 'translateY(0)',
    }
});