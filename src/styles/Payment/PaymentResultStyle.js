import styled from '@emotion/styled';
import { Box, Button, Paper } from '@mui/material';

export const ResultContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    maxWidth: '700px',
    margin: '0 auto',
    minHeight: '80vh',
});

export const IconContainer = styled(Box)({
    marginBottom: '24px',
});

export const ResultInfoBox = styled(Box)({
    width: '100%',
    padding: '24px',
    backgroundColor: '#f7f9ff',
    borderRadius: '16px',
    marginBottom: '32px',
});

export const JsonDataPaper = styled(Paper)({
    width: '100%',
    padding: '16px',
    marginBottom: '32px',
    backgroundColor: '#f0f4ff',
    border: '1px solid #d0d7ff',
    borderRadius: '8px',
});

export const JsonPreBox = styled(Box)({
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    padding: '8px',
    margin: 0,
});

export const ActionButton = styled(Button)(({ variant }) => ({
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    ...(variant === 'contained' ? {
        backgroundColor: '#2142FF',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1a35cc',
        }
    } : {
        border: '1px solid #2142FF',
        color: '#2142FF',
        '&:hover': {
            backgroundColor: 'rgba(33, 66, 255, 0.04)',
        }
    }),
}));