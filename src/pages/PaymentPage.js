import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
    PaymentContainer,
    PaymentHeader,
    OrderSummaryBox,
    PaymentWidgetContainer,
    ButtonContainer,
    PaymentButton
} from '../styles/Payment/PaymentPageStyle';

const PaymentPage = () => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [ready, setReady] = useState(false); // 결제 준비 상태
    const [widgets, setWidgets] = useState(null); // 결제 위젯 저장
    const navigate = useNavigate();

    // 로컬 스토리지에서 주문 정보 가져오기
    useEffect(() => {
        const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
        const totalPrice = parseInt(localStorage.getItem('totalPrice') || '0', 10);

        console.log('로컬 스토리지에서 가져온 금액:', totalPrice, typeof totalPrice);

        if (orderItems.length === 0 || totalPrice === 0) {
            navigate('/MenuPage');
            return;
        }

        // 주문 정보 설정
        setOrderData({
            items: orderItems,
            totalPrice: totalPrice,
            orderId: uuidv4()
        });

        setLoading(false);
    }, [navigate]);

    // 결제위젯 초기화 (참고 코드 방식으로 변경)
    useEffect(() => {
        if (!orderData) return;

        async function fetchPaymentWidgets() {
            try {
                const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
                const tossPayments = await loadTossPayments(clientKey);

                // 위젯 초기화
                const widgets = tossPayments.widgets({
                    customerKey: ANONYMOUS, // ANONYMOUS 상수 사용
                });

                setWidgets(widgets);
            } catch (error) {
                console.error('Toss 결제위젯 초기화 에러:', error);
            }
        }

        fetchPaymentWidgets();
    }, [orderData]);

    // 결제위젯 렌더링
    useEffect(() => {
        if (!widgets || !orderData) return;

        async function renderPaymentWidgets() {
            try {
                // 금액 객체 생성 (참고 코드와 동일한 형태)
                const amount = {
                    currency: "KRW",
                    value: orderData.totalPrice
                };

                // 금액 설정
                await widgets.setAmount(amount);

                // UI 렌더링 (참고 코드와 동일한 방식으로 변경)
                await Promise.all([
                    widgets.renderPaymentMethods({
                        selector: "#payment-method",
                        variantKey: "DEFAULT",
                    }),
                    widgets.renderAgreement({
                        selector: "#agreement",
                    }),
                ]);

                setReady(true);
            } catch (error) {
                console.error('결제위젯 렌더링 에러:', error);
            }
        }

        renderPaymentWidgets();
    }, [widgets, orderData]);

    // 결제 요청 처리 함수
    const handlePaymentRequest = async () => {
        if (!widgets || !ready || !orderData) return;

        try {
            const orderName = orderData.items.length > 1
                ? `${orderData.items[0].name} 외 ${orderData.items.length - 1}건`
                : orderData.items[0].name;

            await widgets.requestPayment({
                orderId: orderData.orderId,
                orderName: orderName,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            });
        } catch (error) {
            console.error('결제 요청 에러:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <PaymentContainer>
            <PaymentHeader>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    결제 진행
                </Typography>
            </PaymentHeader>

            {/* 주문 내역 표시 */}
            <OrderSummaryBox>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    주문 정보
                </Typography>
                {orderData?.items.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>{item.name} x {item.quantity}</Typography>
                        <Typography>{(item.price * item.quantity).toLocaleString()}원</Typography>
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px dashed #ddd' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>총 결제금액</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2142FF' }}>
                        {orderData?.totalPrice.toLocaleString()}원
                    </Typography>
                </Box>
            </OrderSummaryBox>

            <PaymentWidgetContainer>
                {/* 결제 위젯 컨테이너 - ID를 수정된 방식으로 변경 */}
                <div id="payment-method"></div>

                {/* 이용약관 위젯 컨테이너 - ID 변경 */}
                <div id="agreement"></div>
            </PaymentWidgetContainer>

            {/* 결제하기 버튼 */}
            <ButtonContainer>
                <PaymentButton
                    disabled={!ready}
                    onClick={handlePaymentRequest}
                >
                    결제하기
                </PaymentButton>
            </ButtonContainer>
        </PaymentContainer>
    );
};

export default PaymentPage;