import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box } from '@mui/material';
import { categories, getMenuItems } from '../data/menuData';
import OrderCheckDialog from '../components/Order/OrderCheckDialog';
import logo from '../assets/Image/Logo/logo.png'; // 로고 이미지 경로

// 리팩토링된 컴포넌트들 가져오기
import CategoryBar from '../components/Menu/CategoryBar';
import MenuGrid from '../components/Menu/MenuGrid';
import CartPanel from '../components/Menu/CartPanel';

// 앱 컨테이너 스타일
import { AppContainer } from '../styles/Menu/AppContainerStyle';

const MenuPage = () => {
    // 디폴트 카테고리는 커피로 설정(메뉴페이지로 들어왔을 때 보이는 카테고리)
    const [selectedCategory, setSelectedCategory] = useState('coffee');
    const [cart, setCart] = useState([]);
    // 기존 state 아래에 다이얼로그 상태 추가
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    // 입장 애니메이션을 위한 상태 추가
    const [isEntering, setIsEntering] = useState(true);

    // 선택된 카테고리에 따른 메뉴 아이템 가져오기
    const menuItems = getMenuItems(selectedCategory);

    // 페이지 입장 애니메이션 - 가볍게 최적화
    const pageEntrance = useSpring({
        from: {
            opacity: 0.8,  // 약간만 투명하게 시작
            transform: 'translateX(-1%)' // 이동 거리 크게 감소
        },
        to: {
            opacity: 1,
            transform: 'translateX(0%)'
        },
        config: {
            tension: 300,
            friction: 20,
            duration: 250, // 애니메이션 시간 단축
        },
        onRest: () => {
            setIsEntering(false);
        }
    });

    // 장바구니 등장 애니메이션 추가 <느리게>
    const cartAnimation = useSpring({
        from: {
            opacity: 0,
            transform: 'translateX(30px) scale(0.95)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0) scale(1)'
        },
        config: {
            tension: 80,
            friction: 20,
            mass: 1.2,
            duration: 500
        },
        // 페이지 애니메이션 후 조금 지연시켜 등장
        delay: 700
    });

    // 장바구니에 아이템 추가 함수
    const handleAddToCart = (item) => {
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

    // 장바구니 수량 변경 함수
    const handleQuantityChange = (index, value, e) => {
        if (e) {
            e.stopPropagation(); // 이벤트 버블링 방지
        }

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

    return (
        <animated.div style={pageEntrance}>
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
                        {/* 카테고리 바 컴포넌트 */}
                        <CategoryBar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
                            logoSrc={logo}
                        />

                        {/* 메뉴 그리드 컴포넌트 */}
                        <MenuGrid
                            menuItems={menuItems}
                            onAddToCart={handleAddToCart}
                            isEntering={isEntering}
                        />
                    </Box>

                    {/* 장바구니 패널 컴포넌트 */}
                    <CartPanel
                        cart={cart}
                        onQuantityChange={handleQuantityChange}
                        onClearCart={() => setCart([])}
                        onCheckout={() => setOrderDialogOpen(true)}
                        animationStyle={cartAnimation}
                    />
                </Box>

                {/* 주문 확인 다이얼로그 */}
                <OrderCheckDialog
                    open={orderDialogOpen}
                    cartItems={cart}
                    onClose={() => setOrderDialogOpen(false)}
                    onPayment={handlePayment}
                />
            </AppContainer>
        </animated.div>
    );
};

export default MenuPage;