import React from 'react';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import OrderCheck from './OrderCheck';

// 반응형 다이얼로그 스타일
const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        // 여기서 전체 다이얼로그 크기를 조절할 수 있음
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        margin: '20px',
        // 고정 너비 대신 화면 비율로 설정
        // ✅ 이 값들을 수정하여 크기를 키울 수 있음
        width: '95vw',       // 화면 너비의 90% → 95vw (화면 너비의 95%로 증가)
        maxWidth: '700px',   // 최대 너비는 550px → 700px (최대 너비 증가)
        minWidth: '320px',   // 최소 너비는 320px

        // 높이도 화면 비율로 설정
        height: 'auto',      // 내용에 맞춰 자동 조정
        maxHeight: '85vh',   // 화면 높이의 80% 제한 → 85vh (화면 높이의 85%로 증가)
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
            // maxWidth prop 제거 (직접 스타일로 제어)
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