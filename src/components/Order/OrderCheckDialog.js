import React from 'react';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import OrderCheck from './OrderCheck';

// 커스텀 다이얼로그 스타일
const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        margin: '20px',
        maxWidth: 'none'
    },
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
});

/**
 * 주문 확인 다이얼로그 컴포넌트
 * @param {Object} props
 * @param {boolean} props.open - 다이얼로그 열림 상태
 * @param {Array} props.cartItems - 장바구니 항목
 * @param {Function} props.onClose - 닫기 함수
 * @param {Function} props.onPayment - 결제 함수
 */
const OrderCheckDialog = ({ open, cartItems, onClose, onPayment }) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth={false}
            aria-labelledby="order-check-dialog"
        >
            <OrderCheck
                cartItems={cartItems}
                onClose={onClose}
                onPayment={onPayment}
            />
        </StyledDialog>
    );
};

export default OrderCheckDialog;