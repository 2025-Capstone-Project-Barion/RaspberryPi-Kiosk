import React from 'react';
import { Typography, Box } from '@mui/material';
import {
    OrderCheckContainer,
    OrderCheckHeader,
    OrderItemsList,
    OrderItem,
    OrderSummary,
    OrderFooter,
    BackButton,
    PaymentButton
} from '../../styles/Order/OrderCheckStyle';

/**
 * 주문 확인 컴포넌트
 * @param {Object} props
 * @param {Array} props.cartItems - 장바구니에 담긴 상품 목록
 * @param {Function} props.onClose - 다이얼로그 닫기 함수
 * @param {Function} props.onPayment - 결제 진행 함수
 */
const OrderCheck = ({ cartItems, onClose, onPayment }) => {
    // 총 주문 수량 계산
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // 총 금액 계산
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <OrderCheckContainer>
            <OrderCheckHeader>
                <Typography variant="h6">※ 주문 내역을 다시 한번 확인해주세요.</Typography>
            </OrderCheckHeader>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
                <Typography sx={{ flex: 1 }}>상품명</Typography>
                <Typography sx={{ width: '80px', textAlign: 'center' }}>수량</Typography>
                <Typography sx={{ width: '120px', textAlign: 'right' }}>금액</Typography>
            </Box>

            <OrderItemsList>
                {cartItems.map((item, index) => (
                    <OrderItem key={index}>
                        <Typography sx={{ flex: 1, fontWeight: '500' }}>{item.name}</Typography>
                        <Typography sx={{ width: '80px', textAlign: 'center' }}>{item.quantity}개</Typography>
                        <Typography sx={{ width: '120px', textAlign: 'right', color: '#ff6f61', fontWeight: 'bold' }}>
                            {(item.price * item.quantity).toLocaleString()}원
                        </Typography>
                    </OrderItem>
                ))}
            </OrderItemsList>

            <OrderSummary>
                <div>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        주문수량 {totalQuantity}개
                    </Typography>
                </div>
                <div>
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff6f61' }}>
                        {totalPrice.toLocaleString()} 원
                    </Typography>
                </div>
            </OrderSummary>

            <OrderFooter>
                <BackButton onClick={onClose}>
                    돌아가기
                </BackButton>
                <PaymentButton onClick={onPayment}>
                    결제하기
                </PaymentButton>
            </OrderFooter>
        </OrderCheckContainer>
    );
};

export default OrderCheck;