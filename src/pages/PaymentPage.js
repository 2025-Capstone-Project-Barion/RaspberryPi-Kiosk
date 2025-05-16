import { useEffect, useState, useCallback } from 'react';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import {
    PaymentContainer,
    PaymentHeader,
    HeaderTitle,
    PaymentWidgetContainer,
    OrderSummary,
    OrderInfo,
    TotalPrice,
    ButtonContainer,
    PaymentButton
} from '../styles/Payment/PaymentPageStyle';
import PaymentIcon from '@mui/icons-material/Payment';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaymentPage = () => {
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [loading, setLoading] = useState(true);

    // 로컬 스토리지에서 필요한 데이터만 직접 가져오기
    const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    const totalPrice = parseInt(localStorage.getItem('totalPrice') || '0');
    const tossId = localStorage.getItem('tossId') || '';

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
                setTimeout(() => setLoading(false), 800); // 로딩 UI를 잠시 보여주기 위한 딜레이
            } catch (error) {
                console.error('Toss 결제위젯 초기화 에러:', error);
                setLoading(false);
            }
        }

        fetchPaymentWidgets();
    }, []);

    // 결제위젯 렌더링
    useEffect(() => {
        if (!widgets || loading) return;

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
    }, [widgets, totalPrice, loading]);

    // 결제 요청 처리 함수
    // 결제 요청 처리 함수를 useCallback으로 메모이제이션
    const handlePaymentRequest = useCallback(async () => {
        if (!widgets || !ready) return;

        try {
            const orderName = orderItems.length > 1
                ? `${orderItems[0].name} 외 ${orderItems.length - 1}건`
                : orderItems[0].name;

            await widgets.requestPayment({
                orderId: tossId,
                orderName: orderName,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            });
        } catch (error) {
            console.error('결제 요청 에러:', error);
        }
    }, [widgets, ready, orderItems, tossId]);

    // 음성 명령 이벤트 리스너 추가
    useEffect(() => {
        // 음성 명령으로 결제 진행
        const handleVoicePayment = () => {
            console.log('음성 명령: 결제 진행');
            if (ready) {
                handlePaymentRequest();
            } else {
                console.log('결제 준비가 완료되지 않았습니다.');
            }
        };

        // 음성 명령으로 뒤로 가기
        const handleVoiceBack = () => {
            console.log('음성 명령: 뒤로 가기');
            // window.history.back() 대신 명시적인 경로로 이동
            window.location.href = '/MenuPage';
        };

        // 이벤트 리스너 등록
        window.addEventListener('voice-payment-proceed', handleVoicePayment);
        window.addEventListener('voice-payment-back', handleVoiceBack);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('voice-payment-proceed', handleVoicePayment);
            window.removeEventListener('voice-payment-back', handleVoiceBack);
        };
    }, [ready, handlePaymentRequest]);

    // 주문 항목 수 계산
    const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

    // 주문명 생성
    const orderName = orderItems.length > 0
        ? (orderItems.length > 1
            ? `${orderItems[0].menuName} 외 ${orderItems.length - 1}건`
            : orderItems[0].menuName)
        : '주문';

    return (
        <PaymentContainer>
            <PaymentHeader>
                <HeaderTitle>
                    <PaymentIcon sx={{ marginRight: '8px' }} />
                    결제하기
                </HeaderTitle>
                <Button
                    onClick={() => window.location.href = '/MenuPage'}
                    startIcon={<ArrowBackIcon />} // 왼쪽 화살표 아이콘 추가
                    sx={{
                        color: '#2142FF', // 앱 테마 색상 텍스트
                        backgroundColor: 'rgba(33, 66, 255, 0.15)', // 더 진한 배경색 (8% → 15%)
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: 500,
                        textTransform: 'none',
                        minWidth: 'auto'
                    }}
                >
                    메뉴로 돌아가기
                </Button>
            </PaymentHeader>

            <OrderSummary>
                <OrderInfo>
                    <h4>{orderName}</h4>
                    <p>총 {totalItems}개 상품</p>
                </OrderInfo>
                <TotalPrice>
                    {totalPrice.toLocaleString()}원
                </TotalPrice>
            </OrderSummary>

            <PaymentWidgetContainer>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <CircularProgress size={60} sx={{ color: '#2142FF' }} />
                        <div style={{ fontWeight: 500, color: '#64748b' }}>결제 수단을 불러오는 중입니다...</div>
                    </div>
                ) : (
                    <div id="payment-method"></div>
                )}
            </PaymentWidgetContainer>

            <ButtonContainer>
                <PaymentButton
                    disabled={!ready}
                    onClick={handlePaymentRequest}
                >
                    {!ready ? (
                        <CircularProgress size={24} sx={{ color: 'white', marginRight: '10px' }} />
                    ) : null}
                    {totalPrice.toLocaleString()}원 결제하기
                </PaymentButton>
            </ButtonContainer>
        </PaymentContainer>
    );
};

export default PaymentPage;