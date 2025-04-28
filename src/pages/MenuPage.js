import React, { useState } from 'react';
import { Typography, Box, IconButton, ListItem, Badge } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart } from '@mui/icons-material';
import {
    AppContainer,
    CategoryWrapper,
    CategoryButton,
    MenuGridContainer,
    MenuCard,
    MenuImageContainer,
    MenuInfo,
    MenuName,
    MenuDescription,
    MenuPrice,
    CartContainer,
    CartHeader,
    CartList,
    CartFooter,
    PurchaseButton
} from '../styles/Menu/MenuStyle';

import { categories, getMenuItems } from '../data/menuData';
import OrderCheckDialog from '../components/Order/OrderCheckDialog';
import logo from '../assets/Image/Logo/logo.png'; // 로고 이미지 경로

const MenuPage = () => {
    // 디폴트 카테고리는 커피로 설정(메뉴페이지로 들어왔을 때 보이는 카테고리)
    const [selectedCategory, setSelectedCategory] = useState('coffee');
    const [cart, setCart] = useState([]);
    // 기존 state 아래에 다이얼로그 상태 추가
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    // 카드 활성화 상태 추적 - 터치 피드백 개선
    const [activeCardId, setActiveCardId] = useState(null);

    // 카드 터치 시작 시 활성화 상태 설정
    const handleCardTouchStart = (id) => {
        setActiveCardId(id);
    };

    // 카드 터치 종료 시 활성화 상태 해제 및 장바구니 추가
    const handleCardTouchEnd = (item) => {
        setActiveCardId(null);
        handleAddToCart(item);
    };

    const handleAddToCart = (item) => {
        // 기존 로직 유지
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (index, value) => {
        // 기존 로직 유지
        const updatedCart = [...cart];
        const newQuantity = updatedCart[index].quantity + value;

        if (newQuantity <= 0) {
            updatedCart.splice(index, 1);
        } else {
            updatedCart[index].quantity = newQuantity;
        }

        setCart(updatedCart);
    };

    // 결제 처리 함수
    const handlePayment = () => {
        console.log('결제 진행:', cart);
        // 여기에 결제 로직 추가
        setOrderDialogOpen(false);
        // 결제 후 장바구니 비우기
        setCart([]);
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppContainer>
            {/* 전체 레이아웃 구조 변경 - 좌측(카테고리+메뉴), 우측(장바구니) 2단 구조 */}
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                gap: '24px'
            }}>
                {/* 왼쪽 영역: 카테고리 + 메뉴 */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 400px)', // 장바구니 너비를 늘리기 위해 메뉴 영역 축소
                    gap: '24px'
                }}>
                    {/* Logo & Categories */}
                    <CategoryWrapper>
                        <img src={logo} alt="logo" style={{ height: '44px' }} />
                        <Box sx={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'nowrap',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            pb: 1,
                            '&::-webkit-scrollbar': { height: '6px' },
                            '&::-webkit-scrollbar-track': { background: 'transparent' },
                            '&::-webkit-scrollbar-thumb': { background: '#e0e6ff', borderRadius: '3px' }
                        }}>
                            {categories.map(category => (
                                <CategoryButton
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    active={selectedCategory === category.id}
                                >
                                    {category.name}
                                </CategoryButton>
                            ))}
                        </Box>
                    </CategoryWrapper>

                    {/* Menu Items Grid */}
                    <MenuGridContainer>
                        {getMenuItems(selectedCategory).map((item) => (
                            <MenuCard
                                key={item.id}
                                className="menu-card" // 이 클래스 추가
                                onTouchStart={() => handleCardTouchStart(item.id)} // 터치 시작 핸들러
                                onTouchEnd={() => handleCardTouchEnd(item)} // 터치 종료 핸들러
                                onClick={() => handleAddToCart(item)} // 클릭 핸들러 유지 (PC 환경)
                                sx={{
                                    // 카드 활성 상태에 따른 스타일 변경
                                    transform: activeCardId === item.id ? 'scale(0.98)' : 'scale(1)',
                                    borderColor: activeCardId === item.id ? '#2142FF' : '#f0f2fa',
                                    transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                                }}
                            >
                                <MenuImageContainer>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="menu-image" // 이미지 클래스 추가
                                        />
                                    )}
                                </MenuImageContainer>
                                <MenuInfo>
                                    <div>
                                        <MenuName>{item.name}</MenuName>
                                        <MenuDescription>{item.description}</MenuDescription>
                                    </div>
                                    <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
                                </MenuInfo>
                            </MenuCard>
                        ))}
                    </MenuGridContainer>
                </Box>

                {/* 장바구니 영역 - 세로 전체 높이로 확장 */}
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
                            onClick={() => setCart([])}
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

                    {/* 장바구니 목록 */}
                    <CartList>
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
                                    transition: 'all 0.2s ease',
                                    // 터치 피드백 개선
                                    '&:active': {
                                        backgroundColor: '#f9faff',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                                        transform: 'scale(0.99)',
                                        transition: 'all 0.15s ease'
                                    }
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
                                            {item.name}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '0.9rem',
                                            color: '#2142FF',
                                            fontWeight: 500
                                        }}>
                                            {(item.price * item.quantity).toLocaleString()}원
                                        </Typography>
                                    </Box>

                                    {/* 수량 조절 UI 모던하게 개선 */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f7ff',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        border: '1px solid #e8ecfb',
                                    }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleQuantityChange(index, -1)}
                                            sx={{
                                                padding: '4px',
                                                '&:active': {
                                                    transform: 'scale(0.9)',
                                                    transition: 'transform 0.1s ease'
                                                }
                                            }}
                                        >
                                            <Remove fontSize="small" sx={{ color: '#2142FF' }} />
                                        </IconButton>

                                        <Typography sx={{
                                            mx: 1,
                                            minWidth: '24px',
                                            textAlign: 'center',
                                            fontWeight: 600,
                                            fontSize: '1rem'
                                        }}>
                                            {item.quantity}
                                        </Typography>

                                        <IconButton
                                            size="small"
                                            onClick={() => handleQuantityChange(index, 1)}
                                            sx={{
                                                padding: '4px',
                                                '&:active': {
                                                    transform: 'scale(0.9)',
                                                    transition: 'transform 0.1s ease'
                                                }
                                            }}
                                        >
                                            <Add fontSize="small" sx={{ color: '#2142FF' }} />
                                        </IconButton>
                                    </Box>

                                    {/* 삭제 버튼 - 터치 최적화 디자인 */}
                                    <IconButton
                                        size="small"
                                        onClick={() => handleQuantityChange(index, -item.quantity)}
                                        sx={{
                                            ml: 1.5,
                                            color: '#5d6b82',
                                            padding: '10px',  // 터치 영역 확대
                                            backgroundColor: 'rgba(232, 236, 245, 0.9)',  // 배경색 추가로 터치 영역 시각화
                                            borderRadius: '12px',  // 모서리 둥글게
                                            // 호버링 효과 제거
                                            // 터치 피드백 강화

                                        }}
                                    >
                                        <Delete
                                            fontSize="small"
                                            sx={{
                                                // 아이콘 자체에도 터치 효과 추가
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
                            onClick={() => setOrderDialogOpen(true)}
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
            </Box>

            {/* 주문 확인 다이얼로그 */}
            <OrderCheckDialog
                open={orderDialogOpen}
                cartItems={cart}
                onClose={() => setOrderDialogOpen(false)}
                onPayment={handlePayment}
            />
        </AppContainer>
    );
};

export default MenuPage;