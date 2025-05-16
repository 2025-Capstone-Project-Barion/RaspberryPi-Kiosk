import { useState, useEffect } from 'react';
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
import { useVoiceCommand } from '../components/VoiceCommand/VoiceCommandContext';

const MenuPage = () => {
    // 디폴트 카테고리는 커피로 설정(메뉴페이지로 들어왔을 때 보이는 카테고리)
    const [selectedCategory, setSelectedCategory] = useState(0); // 0 = Coffee 카테고리로 시작
    const [cart, setCart] = useState([]);
    // 기존 state 아래에 다이얼로그 상태 추가
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    // 입장 애니메이션을 위한 상태 추가
    const [isEntering, setIsEntering] = useState(true);

    const { setDialogOpen } = useVoiceCommand();

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
        const existingItem = cart.find(cartItem => cartItem.menuId === item.menuId);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.menuId === item.menuId
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


    useEffect(() => {
        console.log('[MenuPage] 다이얼로그 상태 변경:', orderDialogOpen ? '열림' : '닫힘');
        setDialogOpen(orderDialogOpen);
    }, [orderDialogOpen, setDialogOpen]);
    // 기존 useEffect 아래에 추가

    // 음성 명령 이벤트 리스너
    useEffect(() => {
        // 카테고리 이동 이벤트 처리 추가
        // 카테고리 이동 이벤트 핸들러 - 단순 매핑 방식
        const handleVoiceCategoryChange = (event) => {
            // 이벤트에서 카테고리명 가져오기
            const categoryName = event.detail?.category;

            if (!categoryName) {
                console.log('카테고리 이름이 없습니다');
                return;
            }

            // 간단한 매핑 객체로 카테고리명 → 인덱스 변환
            const categoryMapping = {
                '커피': 0,
                '논커피': 1,
                '디저트': 2,
                '베이커리': 3
            };

            // 매핑에서 인덱스 가져오기
            const categoryIndex = categoryMapping[categoryName];

            if (categoryIndex !== undefined) {
                console.log(`카테고리 '${categoryName}'(으)로 이동 (인덱스: ${categoryIndex})`);
                setSelectedCategory(categoryIndex);
            } else {
                console.log(`알 수 없는 카테고리: ${categoryName}`);
            }
        };

        // 메뉴 주문 이벤트 처리 수정
        const handleVoiceOrderMenu = (event) => {
            // eslint-disable-next-line no-unused-vars
            const { categoryType, menuName, quantity } = event.detail;
            console.log(`음성 명령으로 메뉴 주문: ${menuName} ${quantity}개`);

            // 모든 카테고리의 메뉴 아이템 가져오기
            const allMenuItems = [];
            for (let i = 0; i < categories.length; i++) {
                allMenuItems.push(...getMenuItems(i));
            }

            // 메뉴 이름 포함 여부로 찾기 (부분 일치)
            const foundItem = allMenuItems.find(item =>
                item.menuName.toLowerCase().includes(menuName.toLowerCase()) ||
                menuName.toLowerCase().includes(item.menuName.toLowerCase())
            );

            if (foundItem) {
                // 해당 카테고리로 이동 (선택적)
                const itemCategoryIndex = categories.findIndex(
                    cat => cat.categoryId === foundItem.category
                );
                if (itemCategoryIndex !== -1 && selectedCategory !== itemCategoryIndex) {
                    setSelectedCategory(itemCategoryIndex);
                }

                // 찾은 메뉴 quantity만큼 장바구니에 추가
                const existingItem = cart.find(cartItem => cartItem.menuId === foundItem.menuId);

                if (existingItem) {
                    // 이미 장바구니에 있는 메뉴라면 수량만 증가
                    setCart(cart.map(cartItem =>
                        cartItem.menuId === foundItem.menuId
                            ? { ...cartItem, quantity: cartItem.quantity + quantity }
                            : cartItem
                    ));
                } else {
                    // 새 메뉴라면 추가
                    setCart([...cart, { ...foundItem, quantity }]);
                }

                console.log(`장바구니에 추가됨: ${foundItem.menuName} ${quantity}개`);
            } else {
                console.log(`메뉴를 찾을 수 없음: ${menuName}`);
            }
        };

        // 장바구니에서 특정 메뉴 제거 이벤트 처리 추가
        const handleVoiceRemoveItem = (event) => {
            const { itemName, quantity } = event.detail;
            console.log(`음성 명령으로 장바구니에서 제거: ${itemName} ${quantity || '전체'}개`);

            // 부분 일치하는 메뉴 찾기
            const matchingItems = cart.filter(
                item => item.menuName.toLowerCase().includes(itemName.toLowerCase()) ||
                    itemName.toLowerCase().includes(item.menuName.toLowerCase())
            );

            if (matchingItems.length > 0) {
                if (quantity === 0) {
                    // 수량을 지정하지 않았으면 해당 메뉴를 모두 제거
                    setCart(cart.filter(item => !matchingItems.some(match => match.menuId === item.menuId)));
                    console.log(`${itemName} 메뉴 전체 제거됨`);
                } else {
                    // 지정된 수량만큼 제거
                    const updatedCart = [...cart];
                    const targetItem = matchingItems[0]; // 첫 번째 일치 항목 사용
                    const targetIndex = cart.findIndex(item => item.menuId === targetItem.menuId);

                    if (targetIndex !== -1) {
                        if (cart[targetIndex].quantity <= quantity) {
                            // 수량이 같거나 작으면 항목 제거
                            updatedCart.splice(targetIndex, 1);
                        } else {
                            // 수량이 더 크면 차감
                            updatedCart[targetIndex] = {
                                ...updatedCart[targetIndex],
                                quantity: updatedCart[targetIndex].quantity - quantity
                            };
                        }
                        setCart(updatedCart);
                        console.log(`${itemName} ${quantity}개 제거됨`);
                    }
                }
            } else {
                console.log(`장바구니에서 ${itemName} 메뉴를 찾을 수 없음`);
            }
        };

        // 장바구니 비우기 이벤트 처리
        const handleVoiceClearCart = () => {
            console.log('음성 명령으로 장바구니 비우기');
            setCart([]);
        };

        // 결제하기 이벤트 처리
        const handleVoiceCheckout = () => {
            console.log('음성 명령으로 결제 진행');
            setOrderDialogOpen(true);
        };

        // 이벤트 리스너 등록
        window.addEventListener('voice-category-change', handleVoiceCategoryChange);
        window.addEventListener('voice-order-menu', handleVoiceOrderMenu);
        window.addEventListener('voice-remove-item', handleVoiceRemoveItem);
        window.addEventListener('voice-clear-cart', handleVoiceClearCart);
        window.addEventListener('voice-checkout', handleVoiceCheckout);

        // 정리 함수
        return () => {
            window.removeEventListener('voice-category-change', handleVoiceCategoryChange);
            window.removeEventListener('voice-order-menu', handleVoiceOrderMenu);
            window.removeEventListener('voice-remove-item', handleVoiceRemoveItem);
            window.removeEventListener('voice-clear-cart', handleVoiceClearCart);
            window.removeEventListener('voice-checkout', handleVoiceCheckout);
        };
    }, [cart, selectedCategory]);

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