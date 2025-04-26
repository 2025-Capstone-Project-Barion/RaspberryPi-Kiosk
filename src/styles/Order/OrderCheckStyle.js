import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 주문 확인 컨테이너
export const OrderCheckContainer = styled(Box)({
    width: '550px',
    maxWidth: '100%',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
});

// 주문 확인 헤더
export const OrderCheckHeader = styled(Box)({
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #eee',
    '& h6': {
        fontWeight: 'bold',
        color: '#333'
    }
});

// 주문 항목 리스트
export const OrderItemsList = styled(Box)({
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '10px 0',
    '&::-webkit-scrollbar': {
        width: '6px'
    },
    '&::-webkit-scrollbar-track': {
        background: '#f5f5f5',
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '4px'
    }
});

// 각 주문 항목
export const OrderItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #f5f5f5',
    '&:last-child': {
        borderBottom: 'none'
    }
});

// 주문 요약 (총 수량, 총 금액)
export const OrderSummary = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderTop: '2px solid #eee',
    backgroundColor: '#f9f9f9'
});

// 주문 확인 푸터 (버튼 영역)
export const OrderFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 20px',
    borderTop: '1px solid #eee'
});

// 돌아가기 버튼
export const BackButton = styled(Button)({
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#eee',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#ddd'
    }
});

// 결제 버튼
export const PaymentButton = styled(Button)({
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#ff6f61',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#ff5546'
    }
});