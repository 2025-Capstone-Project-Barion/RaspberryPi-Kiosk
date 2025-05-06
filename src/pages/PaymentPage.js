import React, { useEffect, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import {
    PaymentContainer,
    PaymentWidgetContainer,
    ButtonContainer,
    PaymentButton
} from '../styles/Payment/PaymentPageStyle';

const PaymentPage = () => {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);

    // 로컬 스토리지에서 필요한 데이터만 직접 가져오기
    const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    const totalPrice = parseInt(localStorage.getItem('totalPrice') || '0');
    const orderId = localStorage.getItem('orderId') || '';

    // 결제위젯 초기화
    useEffect(() => {
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
    }, []);

    // 결제위젯 렌더링
    useEffect(() => {
        if (!widgets) return;

        async function renderPaymentWidgets() {
            try {
                await widgets.setAmount({
                    currency: "KRW",
                    value: totalPrice
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
    }, [widgets, totalPrice]);

    // 결제 요청 처리 함수
    const handlePaymentRequest = async () => {
        if (!widgets || !ready) return;

        try {
            const orderName = orderItems.length > 1
                ? `${orderItems[0].name} 외 ${orderItems.length - 1}건`
                : orderItems[0].name;

            await widgets.requestPayment({
                orderId: orderId,
                orderName: orderName,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            });
        } catch (error) {
            console.error('결제 요청 에러:', error);
        }
    };

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
                    {totalPrice.toLocaleString()}원 결제하기
                </PaymentButton>
            </ButtonContainer>
        </PaymentContainer>
    );
};

export default PaymentPage;