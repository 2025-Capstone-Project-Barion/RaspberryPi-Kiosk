import { useRef, useEffect } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import Hammer from 'hammerjs'; // Hammer.js 임포트 - 라즈베리파이의 드레그 스크롤 미지원을 SW적으로 해결-> 터치로 스크롤 구현을 위한 라이브러리
import { v4 as uuidv4 } from 'uuid';
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

const OrderCheck = ({ cartItems, onClose }) => {

    // 주문 항목 리스트 ref 추가
    const orderItemsListRef = useRef(null);
    // Hammer.js 인스턴스 저장용 ref
    const orderHammerRef = useRef(null);

    // 총 주문 수량 계산
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    // 총 금액 계산
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Hammer.js 초기화 및 설정
    useEffect(() => {
        // 기존 Hammer 인스턴스 정리
        if (orderHammerRef.current) {
            orderHammerRef.current.destroy();
        }

        // 주문 항목 리스트에 Hammer.js 적용
        if (orderItemsListRef.current) {
            orderHammerRef.current = new Hammer(orderItemsListRef.current);

            // 세로 방향 패닝(swipe)만 감지하도록 설정
            orderHammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5 // 감도 조정 (낮을수록 민감)
            });

            // 패닝 이벤트 핸들러 등록
            orderHammerRef.current.on('panup pandown', (ev) => {
                if (!orderItemsListRef.current) return;

                // 스크롤 속도 계수 - 라즈베리파이 환경에 맞게 조정
                const scrollSpeed = 2.5;

                // 이동 거리에 따라 스크롤 조정 (deltaY가 양수면 아래로, 음수면 위로)
                orderItemsListRef.current.scrollTop += ev.deltaY * scrollSpeed * -1;
            });
        }

        // 클린업 함수
        return () => {
            if (orderHammerRef.current) {
                orderHammerRef.current.destroy();
                orderHammerRef.current = null;
            }
        };
    }, []);

    // 음성 명령 이벤트 리스너 추가
    useEffect(() => {
        // 닫기/돌아가기 명령 처리
        const handleDialogClose = () => {
            console.log('음성 명령: 다이얼로그 닫기');
            onClose && onClose();
        };

        // 결제 명령 처리
        const handlePaymentRequest = () => {
            console.log('음성 명령: 결제 요청');

            // 주문 ID 생성
            const newTossId = uuidv4();

            // 로컬 스토리지에 주문 정보 저장
            localStorage.setItem('orderItems', JSON.stringify(cartItems));
            localStorage.setItem('totalPrice', totalPrice.toString());
            localStorage.setItem('tossId', newTossId);

            onClose && onClose(); // 다이얼로그 닫기
            // 결제 페이지로 이동
            window.location.href = '/payment';
        };

        // 이벤트 리스너 등록
        window.addEventListener('voice-dialog-close', handleDialogClose);
        window.addEventListener('voice-payment-request', handlePaymentRequest);

        // 클린업 함수
        return () => {
            window.removeEventListener('voice-dialog-close', handleDialogClose);
            window.removeEventListener('voice-payment-request', handlePaymentRequest);
        };
    }, [onClose, cartItems, totalPrice]); // totalPrice 의존성 추가 필요

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

            {/* 주문 항목 리스트 - ref 추가 및 touchAction 설정 */}
            <OrderItemsList
                ref={orderItemsListRef}
                sx={{ touchAction: 'none' }} // Hammer.js 사용 시 필수 설정
            >
                {cartItems.map((item, index) => (
                    <OrderItem key={index}>
                        {/* 상품명 */}
                        <Typography sx={{
                            flex: 1,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: '#222'
                        }}>
                            {item.menuName}
                        </Typography>

                        {/* 수량 - 배지 스타일 */}
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

                        {/* 가격 */}
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

            {/* 구분선 */}
            <Divider sx={{ margin: '0 20px', borderStyle: 'dashed', borderColor: '#e0e0e0' }} />

            {/* 주문 요약 */}
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
                    {/* 총 결제금액 레이블 */}
                    <Box sx={{ textAlign: 'right', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                            총 결제금액
                        </Typography>
                    </Box>

                    {/* 금액 */}
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
                {/* 돌아가기 버튼 */}
                <BackButton onClick={onClose}
                    className="dialog-close-button"
                    sx={{
                        padding: '16px 24px',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        borderRadius: '14px',
                        border: '1px solid #ddd',
                        '&:active': {
                            transform: 'scale(0.97)',
                            backgroundColor: '#f5f5f5',
                            transition: 'transform 0.1s ease'
                        }
                    }}>
                    돌아가기
                </BackButton>

                <PaymentButton onClick={() => {
                    // 주문 ID 생성
                    const newTossId = uuidv4();

                    // 로컬 스토리지에 주문 정보 저장
                    localStorage.setItem('orderItems', JSON.stringify(cartItems));
                    localStorage.setItem('totalPrice', totalPrice.toString());
                    localStorage.setItem('tossId', newTossId);

                    onClose && onClose(); // 다이얼로그 닫기
                    // 결제 페이지로 이동
                    window.location.href = '/payment';
                }}
                    className="dialog-payment-button"
                    sx={{
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(33, 66, 255, 0.25)',
                        backgroundColor: '#2142FF',
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