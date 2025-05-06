import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useNavigate } from 'react-router-dom';
import {
    PaymentContainer,
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
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: 3,
                background: 'linear-gradient(to bottom right, #ffffff, #f7f9ff)'
            }}>
                <CircularProgress size={70} sx={{ color: '#2142FF' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2142FF' }}>
                    결제 준비 중...
                </Typography>
            </Box>
        );
    }

    return (
        <PaymentContainer>
            <PaymentWidgetContainer>
                <div id="payment-method"></div>
            </PaymentWidgetContainer>

            <ButtonContainer>
                <PaymentButton
                    disabled={!ready}
                    onClick={handlePaymentRequest}
                >
                    {orderData.totalPrice.toLocaleString()}원 결제하기
                </PaymentButton>
            </ButtonContainer>
        </PaymentContainer>
    );
};

export default PaymentPage;