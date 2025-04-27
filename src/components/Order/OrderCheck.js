import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
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

const OrderCheck = ({ cartItems, onClose, onPayment }) => {
    // 총 주문 수량 계산
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // 총 금액 계산
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <OrderCheckContainer>
            <OrderCheckHeader>
                {/* 주문 확인 헤더 - 더 명확한 제목과 설명 추가 */}
                <Typography variant="h5" sx={{
                    fontWeight: 700,
                    color: '#1A1A1A',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    // 점 아이콘 대신 색상 블록으로 변경하여 시인성 강화
                    '&::before': {
                        content: '""',
                        width: '6px',
                        height: '20px',
                        backgroundColor: '#2142FF',
                        borderRadius: '3px',
                        marginRight: '12px'
                    }
                }}>
                    주문 내역 확인
                </Typography>

                {/* 부가 설명 텍스트 추가 - 사용자 안내 강화 */}
                <Typography variant="body1" sx={{
                    fontSize: '1rem',
                    color: '#666',
                    mt: 1,
                    textAlign: 'center'
                }}>
                    아래 주문 내역을 확인 후 결제를 진행해주세요
                </Typography>
            </OrderCheckHeader>

            {/* 테이블 헤더 - 더 명확한 구분과 강조 */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 24px',
                backgroundColor: '#f7f9ff',
                borderBottom: '1px solid #e8eaf6'
            }}>
                <Typography sx={{ flex: 1, fontWeight: 600, color: '#555' }}>상품명</Typography>
                <Typography sx={{ width: '80px', textAlign: 'center', fontWeight: 600, color: '#555' }}>수량</Typography>
                <Typography sx={{ width: '120px', textAlign: 'right', fontWeight: 600, color: '#555' }}>금액</Typography>
            </Box>

            {/* 주문 항목 리스트 - 스크롤 영역 */}
            <OrderItemsList>
                {cartItems.map((item, index) => (
                    <OrderItem key={index}>
                        {/* 상품명 - 더 강조된 텍스트 */}
                        <Typography sx={{
                            flex: 1,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: '#222'
                        }}>
                            {item.name}
                        </Typography>

                        {/* 수량 - 배지 스타일로 변경하여 명확성 강화 */}
                        <Typography sx={{
                            width: '80px',
                            textAlign: 'center',
                            fontWeight: 600,
                            color: '#2142FF',
                            backgroundColor: 'rgba(33, 66, 255, 0.08)',
                            padding: '6px 0',
                            borderRadius: '24px',
                            fontSize: '0.95rem'
                        }}>
                            {item.quantity}개
                        </Typography>

                        {/* 가격 - 브랜드 컬러로 강조 */}
                        <Typography sx={{
                            width: '120px',
                            textAlign: 'right',
                            color: '#2142FF',
                            fontWeight: 700,
                            fontSize: '1.1rem'
                        }}>
                            {(item.price * item.quantity).toLocaleString()}원
                        </Typography>
                    </OrderItem>
                ))}
            </OrderItemsList>

            {/* 구분선 추가 - 시각적 분리 강화 */}
            <Divider sx={{ margin: '0 20px', borderStyle: 'dashed', borderColor: '#e0e0e0' }} />

            {/* 주문 요약 - 더 명확한 강조와 구분 */}
            <OrderSummary>
                <Box>
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        총 주문수량
                        <Box component="span" sx={{
                            ml: 1,
                            backgroundColor: '#2142FF',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.95rem',
                            fontWeight: 700
                        }}>
                            {totalQuantity}개
                        </Box>
                    </Typography>
                </Box>

                <Box>
                    {/* 총 결제금액 레이블 추가 */}
                    <Box sx={{ textAlign: 'right', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                            총 결제금액
                        </Typography>
                    </Box>

                    {/* 금액 - 크게 강조 */}
                    <Typography sx={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#2142FF',
                        letterSpacing: '-0.5px'
                    }}>
                        {totalPrice.toLocaleString()}원
                    </Typography>
                </Box>
            </OrderSummary>

            {/* 하단 버튼 영역 */}
            <OrderFooter>
                {/* 돌아가기 버튼 - 접근성 향상 */}
                <BackButton onClick={onClose} sx={{
                    padding: '16px 24px',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    borderRadius: '14px',
                    // 테두리 강화
                    border: '1px solid #ddd',
                    // 터치 피드백 애니메이션
                    '&:active': {
                        transform: 'scale(0.97)',
                        backgroundColor: '#f5f5f5',
                        transition: 'transform 0.1s ease'
                    }
                }}>
                    돌아가기
                </BackButton>

                {/* 결제하기 버튼 - 강조 및 접근성 향상 */}
                <PaymentButton onClick={onPayment} sx={{
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(33, 66, 255, 0.25)',
                    backgroundColor: '#2142FF',
                    // 터치 피드백 애니메이션
                    '&:active': {
                        transform: 'scale(0.97)',
                        boxShadow: '0 2px 8px rgba(33, 66, 255, 0.2)',
                        transition: 'all 0.1s ease'
                    }
                }}>
                    결제하기
                </PaymentButton>
            </OrderFooter>
        </OrderCheckContainer>
    );
};

export default OrderCheck;