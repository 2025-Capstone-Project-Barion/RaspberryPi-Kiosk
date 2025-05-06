import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useNavigate } from 'react-router-dom';
// Context 제거
// import { useOrder } from '../contexts/OrderContext';
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
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const navigate = useNavigate();

    // Context 대신 로컬 상태 사용
    const [orderData, setOrderData] = useState({
        orderItems: [],
        totalPrice: 0,
        orderId: ''
    });

    // 로컬 스토리지에서 주문 정보 로드
    useEffect(() => {
        try {
            // 로컬 스토리지에서 주문 정보 불러오기
            const items = JSON.parse(localStorage.getItem('orderItems') || '[]');
            const price = parseInt(localStorage.getItem('totalPrice') || '0');
            const id = localStorage.getItem('orderId') || '';

            setOrderData({
                orderItems: items,
                totalPrice: price,
                orderId: id
            });

            // 주문 정보 확인
            if (!items.length || !price || !id) {
                navigate('/MenuPage');
                return;
            }

            setLoading(false);
        } catch (error) {
            console.error('주문 데이터 로딩 오류:', error);
            navigate('/MenuPage');
        }
    }, [navigate]);

    // 결제위젯 초기화
    useEffect(() => {
        if (loading) return;

        async function fetchPaymentWidgets() {
            try {
                const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
                const tossPayments = await loadTossPayments(clientKey);

                const widgets = tossPayments.widgets({
                    customerKey: ANONYMOUS,
                });

                setWidgets(widgets);
            } catch (error) {
                console.error('Toss 결제위젯 초기화 에러:', error);
            }
        }

        fetchPaymentWidgets();
    }, [loading]);

    // 결제위젯 렌더링
    useEffect(() => {
        if (!widgets || loading) return;

        async function renderPaymentWidgets() {
            try {
                await widgets.setAmount({
                    currency: "KRW",
                    value: orderData.totalPrice
                });

                await widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                });

                setReady(true);
            } catch (error) {
                console.error('결제위젯 렌더링 에러:', error);
            }
        }

        renderPaymentWidgets();
    }, [widgets, loading, orderData.totalPrice]);

    // 결제 요청 처리 함수
    const handlePaymentRequest = async () => {
        if (!widgets || !ready) return;

        try {
            const orderName = orderData.orderItems.length > 1
                ? `${orderData.orderItems[0].name} 외 ${orderData.orderItems.length - 1}건`
                : orderData.orderItems[0].name;

            // 결제 요청
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

            <OrderSummaryBox>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    주문 정보
                </Typography>
                {orderData.orderItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>{item.name} x {item.quantity}</Typography>
                        <Typography>{(item.price * item.quantity).toLocaleString()}원</Typography>
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px dashed #ddd' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>총 결제금액</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2142FF' }}>
                        {orderData.totalPrice.toLocaleString()}원
                    </Typography>
                </Box>
            </OrderSummaryBox>

            <PaymentWidgetContainer>
                <div id="payment-method"></div>
            </PaymentWidgetContainer>

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