import { useRef, useEffect } from 'react';
import { Typography, Box, IconButton, ListItem, Badge } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart } from '@mui/icons-material';
import { animated } from '@react-spring/web';
import Hammer from 'hammerjs';
import {
    CartContainer,
    CartHeader,
    CartList,
    CartFooter,
    PurchaseButton
} from '../../styles/Menu/CartPanelStyle';

/**
 * 장바구니 패널 컴포넌트
 * @param {Object} props
 * @param {Array} props.cart - 장바구니 항목 배열
 * @param {Function} props.onQuantityChange - 수량 변경 함수
 * @param {Function} props.onClearCart - 장바구니 비우기 함수
 * @param {Function} props.onCheckout - 결제 다이얼로그 열기 함수
 * @param {Object} props.animationStyle - 스프링 애니메이션 스타일
 */
const CartPanel = ({ cart, onQuantityChange, onClearCart, onCheckout, animationStyle }) => {
    // 장바구니 목록 ref 추가
    const cartListRef = useRef(null);
    // Hammer.js 인스턴스 저장용 ref
    const cartHammerRef = useRef(null);

    // 총 금액과 아이템 수량 계산
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Hammer.js를 이용한 터치 스크롤 구현 - 장바구니에 적용
    useEffect(() => {
        // 기존 Hammer 인스턴스 정리
        if (cartHammerRef.current) {
            cartHammerRef.current.destroy();
        }

        // 장바구니 목록에 Hammer.js 적용
        if (cartListRef.current) {
            cartHammerRef.current = new Hammer(cartListRef.current);

            // 세로 방향 패닝만 감지
            cartHammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5
            });

            // 패닝 이벤트 핸들러 등록
            cartHammerRef.current.on('panup pandown', (ev) => {
                if (!cartListRef.current) return;

                // 스크롤 속도 계수
                const scrollSpeed = 2.5;

                // 이동 거리에 따라 스크롤 조정
                cartListRef.current.scrollTop += ev.deltaY * scrollSpeed * -1;
            });
        }

        // 클린업 함수
        return () => {
            if (cartHammerRef.current) {
                cartHammerRef.current.destroy();
                cartHammerRef.current = null;
            }
        };
    }, []); // 빈 의존성 배열

    return (
        <animated.div style={animationStyle}>
            <CartContainer>
                <CartHeader>
                    {/* 왼쪽에 장바구니 아이콘 배치 - Badge 컴포넌트로 수량 표시 */}
                    <Badge
                        badgeContent={totalItems}
                        color="primary"
                        invisible={totalItems === 0}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#2142FF',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                minWidth: '20px',
                                height: '20px'
                            }
                        }}
                    >
                        <ShoppingCart
                            sx={{
                                color: '#2142FF',
                                fontSize: '1.8rem',
                                '&:active': {
                                    transform: 'scale(0.9)',
                                    transition: 'transform 0.1s ease'
                                }
                            }}
                        />
                    </Badge>

                    {/* 중앙에 장바구니 텍스트 배치 - 수량 표시 제거 */}
                    <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
                        장바구니
                    </Typography>

                    {/* 오른쪽에 삭제 버튼 배치 - 기존 코드 유지 */}
                    <IconButton
                        onClick={onClearCart}
                        color="error"
                        disabled={cart.length === 0}
                        sx={{
                            backgroundColor: cart.length > 0 ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
                            '&:active': cart.length > 0 ? {
                                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                                transform: 'scale(0.95)',
                                transition: 'all 0.1s ease-out'
                            } : {}
                        }}
                    >
                        <Delete />
                    </IconButton>
                </CartHeader>

                {/* 장바구니 목록 - 기존 코드 그대로 유지하되 ref 추가 */}
                <CartList
                    ref={cartListRef}
                    sx={{
                        touchAction: 'none', // Hammer.js 사용을 위해 추가
                    }}
                >
                    {cart.length === 0 ? (
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#888',
                            p: 3
                        }}>
                            <ShoppingCart sx={{ fontSize: '3rem', color: '#ddd', mb: 2 }} />
                            <Typography sx={{
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                textAlign: 'center',
                                lineHeight: 1.5
                            }}>
                                장바구니가 비어있습니다.<br />
                                메뉴를 터치하여 담아주세요.
                            </Typography>
                        </Box>
                    ) : (
                        cart.map((item, index) => (
                            // 장바구니 아이템 UI 개선 부분
                            <ListItem key={index} divider sx={{
                                padding: '16px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '1px solid #f0f4ff',
                                borderRadius: '10px',
                                margin: '8px 0',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',

                            }}>
                                {/* 메뉴 이름 - 레이아웃 개선 */}
                                <Box sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    pr: 1
                                }}>
                                    <Typography sx={{
                                        fontWeight: 600,
                                        fontSize: '1.05rem',
                                        color: '#333',
                                        mb: 0.5
                                    }}>
                                        {item.menuName}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.9rem',
                                        color: '#2142FF',
                                        fontWeight: 500
                                    }}>
                                        {(item.price * item.quantity).toLocaleString()}원
                                    </Typography>
                                </Box>
                                {/* 수량 조절 버튼 - 레이아웃 개선 */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#f5f7ff',
                                    borderRadius: '10px',
                                    padding: '2px',  // 패딩 축소하여 내부 버튼 공간 확보
                                    border: '1px solid #e8ecfb',
                                }}>
                                    <IconButton
                                        size="medium"  // small에서 medium으로 변경
                                        onClick={(e) => onQuantityChange(index, -1, e)}
                                        sx={{
                                            padding: '8px',  // 패딩 증가 (4px → 8px)
                                            minWidth: '36px',  // 최소 너비 설정
                                            minHeight: '36px',  // 최소 높이 설정
                                            '&:active': {
                                                transform: 'scale(0.9)',
                                                transition: 'transform 0.1s ease'
                                            }
                                        }}
                                    >
                                        <Remove sx={{ color: '#2142FF', fontSize: '1.3rem' }} />
                                    </IconButton>

                                    <Typography sx={{
                                        mx: 1,
                                        minWidth: '24px',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        fontSize: '1.1rem'  // 폰트 크기 약간 증가
                                    }}>
                                        {item.quantity}
                                    </Typography>

                                    <IconButton
                                        size="medium"  // small에서 medium으로 변경
                                        onClick={(e) => onQuantityChange(index, 1, e)}
                                        sx={{
                                            padding: '8px',  // 패딩 증가
                                            minWidth: '36px',
                                            minHeight: '36px',
                                            '&:active': {
                                                transform: 'scale(0.9)',
                                                transition: 'transform 0.1s ease'
                                            }
                                        }}
                                    >
                                        <Add sx={{ color: '#2142FF', fontSize: '1.3rem' }} />
                                    </IconButton>
                                </Box>

                                {/* 삭제 버튼 - 터치 최적화 개선 */}
                                <IconButton
                                    size="medium"  // small에서 medium으로 변경
                                    onClick={(e) => onQuantityChange(index, -item.quantity, e)}
                                    sx={{
                                        ml: 1,  // 좌측 여백 축소 (1.5 → 1)
                                        color: '#5d6b82',
                                        padding: '10px',
                                        minWidth: '42px',  // 최소 너비 설정
                                        minHeight: '42px',  // 최소 높이 설정
                                        backgroundColor: 'rgba(232, 236, 245, 0.9)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Delete
                                        sx={{
                                            fontSize: '1.3rem',  // 아이콘 크기 증가
                                            '&:active': {
                                                color: '#2142FF'
                                            }
                                        }}
                                    />
                                </IconButton>
                            </ListItem>
                        ))
                    )}
                </CartList>

                <CartFooter>
                    <Typography variant="h6" align="right">
                        총 금액: <span>{totalPrice.toLocaleString()}</span>원
                    </Typography>

                    {/* 구매 버튼 - 접근성 및 배리어프리 UI 향상 */}
                    <PurchaseButton
                        variant="contained"
                        disabled={cart.length === 0}
                        onClick={onCheckout}
                        // 비활성화 상태 스타일 개선
                        sx={{
                            opacity: cart.length === 0 ? 0.6 : 1,
                            cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {cart.length === 0 ? '메뉴를 선택해주세요' : `구매하기 (${totalPrice.toLocaleString()}원)`}
                    </PurchaseButton>
                </CartFooter>
            </CartContainer>
        </animated.div>
    );
};

export default CartPanel;