import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated, easings, useTrail } from '@react-spring/web';
import { Typography, Box, IconButton, ListItem, Badge } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import {
    AppContainer,
    CategoryWrapper,
    CategoryButton,
    MenuGridWrapper,
    MenuGridContainer,
    ScrollButtonContainer,
    ScrollButton,
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
// Hammer.js 라이브러리 추가 => 터치 스크롤 구현을 위한 라이브러리
import Hammer from 'hammerjs';

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
    // 카드 터치로 시작된 드래그 여부
    const [draggingFromCard, setDraggingFromCard] = useState(false);

    // 스크롤 관련 상태 추가
    const menuGridRef = useRef(null);
    const cartListRef = useRef(null); // 장바구니 목록 ref 추가
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(true);

    // Hammer.js 인스턴스 저장용 ref
    const menuHammerRef = useRef(null);
    const cartHammerRef = useRef(null);

    // 스크롤 타이머 ref 추가 (스크롤 이벤트 성능 최적화용)
    const scrollTimer = useRef(null);

    // 입장 애니메이션을 위한 상태 추가
    const [isEntering, setIsEntering] = useState(true);

    // 카테고리 애니메이션 - 순차적 등장
    const categoryTrail = useTrail(categories.length, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 170, friction: 26 },
        delay: 200, // 페이지 등장 후 약간 지연
    });

    // 선택된 카테고리에 따라 메뉴 아이템 애니메이션
    const menuItems = getMenuItems(selectedCategory);
    const menuTrail = useTrail(menuItems.length, {
        from: {
            opacity: 0,
            transform: 'translateY(20px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        },
        config: {
            tension: 100,
            friction: 18,
            mass: 1.1
        },
        delay: 300, // 카테고리 애니메이션 후 등장
    });

    // 페이지 입장 애니메이션
    const pageEntrance = useSpring({
        from: {
            opacity: 0,
            transform: 'translateX(3%) scale(0.98)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0%) scale(1)'
        },
        config: {
            tension: 60,
            friction: 16,
            mass: 1,
            duration: 700,
            easing: easings.easeOutQuart
        },
        onRest: () => {
            setIsEntering(false);
        }
    });


    // 장바구니 등장 애니메이션 추가
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
            duration: 800
        },
        // 페이지 애니메이션 후 조금 지연시켜 등장
        delay: 1200
    });

    // 행의 높이를 계산하는 함수 - useCallback으로 메모이제이션
    const calculateRowHeight = useCallback(() => {
        // 카드 높이 (CSS와 동일하게 맞춤)
        const cardHeight = (window.innerHeight - 230) / 2;
        // 그리드 간격 (MenuGridContainer의 gap과 동일하게 32px 설정)
        const rowGap = 32;
        // 전체 행 높이 = 카드 높이 + 간격
        return cardHeight + rowGap;
    }, []);

    // 카드 터치 시작 시 활성화 상태 설정
    const handleCardTouchStart = (id, e) => {
        // 애니메이션 진행 중에는 상호작용 방지
        if (isEntering) return;

        if (e) {
            // 드래그 시작 위치 저장
            setDraggingFromCard(true);
        }
        setActiveCardId(id);
    };

    // 카드 터치 종료 시 활성화 상태 해제 및 장바구니 추가
    const handleCardTouchEnd = (item, e) => {
        if (e) {
            // 매우 짧은 시간의 터치만 클릭으로 간주
            if (!draggingFromCard) {
                handleAddToCart(item);
            }
            setDraggingFromCard(false);
        }
        setActiveCardId(null);
    };

    // 다른 이벤트 핸들러에도 적용
    const handleCardClick = (item, e) => {
        // 애니메이션 진행 중에는 상호작용 방지
        if (isEntering) return;

        if (e) {
            // 모바일에서 터치 이벤트와 클릭 이벤트 중복 방지
            if ('ontouchstart' in window) {
                return;
            }
            handleAddToCart(item);
        }
    };

    // 카드 터치 이동 핸들러
    const handleCardTouchMove = () => {
        // 드래그 상태로 설정
        setDraggingFromCard(true);
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

    const handleQuantityChange = (index, value, e) => {
        if (e) {
            e.stopPropagation(); // 이벤트 버블링 방지
        }

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

    // 스크롤 위로 버튼 클릭 핸들러 - 정확한 행 단위 이동 보장
    const handleScrollUp = () => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const rowHeight = calculateRowHeight();

        // 현재 스크롤 위치
        const currentScroll = container.scrollTop;

        // 항상 정확히 2행 위로 이동 (음수 방지)
        const targetScroll = Math.max(0, currentScroll - (rowHeight * 2));

        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        // 스크롤 후 버튼 상태 업데이트 (애니메이션 완료 후)
        setTimeout(updateScrollButtonStates, 300);
    };

    // 스크롤 아래로 버튼 클릭 핸들러
    const handleScrollDown = () => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const rowHeight = calculateRowHeight();

        // 현재 스크롤 위치
        const currentScroll = container.scrollTop;

        // 컨테이너 내용물 전체 높이
        const scrollHeight = container.scrollHeight;
        // 컨테이너 높이
        const containerHeight = container.clientHeight;

        // 항상 정확히 2행 아래로 이동 (최대치 초과 방지)
        const targetScroll = Math.min(
            scrollHeight - containerHeight,
            currentScroll + (rowHeight * 2)
        );

        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        // 스크롤 후 버튼 상태 업데이트 (애니메이션 완료 후)
        setTimeout(updateScrollButtonStates, 300);
    };

    // 스크롤 버튼 상태 업데이트 함수 개선 - useCallback으로 메모이제이션
    const updateScrollButtonStates = useCallback(() => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        const rowHeight = calculateRowHeight();

        // 현재 행 위치 (소수점 자리까지 정확히 계산)
        const currentRowExact = scrollTop / rowHeight;

        // 더 위로 스크롤 가능한지 여부 - 정밀 계산
        // 현재 스크롤 위치가 아주 약간이라도 0보다 크면 위로 스크롤 가능
        setCanScrollUp(scrollTop > 2); // 매우 작은 오차 허용 (2px)

        // 더 아래로 스크롤 가능한지 여부 개선 - 정확한 바닥 감지
        // 스크롤 바닥 감지를 위한 정확한 계산
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2; // 작은 오차 허용

        // 첫 번째 검사: 일반적인 행 기반 계산
        const visibleRows = Math.floor(clientHeight / rowHeight);
        const totalRows = Math.ceil(scrollHeight / rowHeight);
        let canScrollMore = currentRowExact + visibleRows < totalRows - 0.1; // 오차 허용

        // 두 번째 검사: 실제로 스크롤 바닥에 도달했는지 확인
        if (isAtBottom) canScrollMore = false;

        setCanScrollDown(canScrollMore);
    }, [calculateRowHeight]); // calculateRowHeight를 의존성 배열에 추가

    // 카테고리 변경 시 useEffect - 의존성 배열 수정
    useEffect(() => {
        if (menuGridRef.current) {
            menuGridRef.current.scrollTop = 0;
        }

        // 약간의 지연 후 스크롤 버튼 상태 업데이트
        setTimeout(updateScrollButtonStates, 100);

        // 현재 ref 값을 변수에 저장
        const currentMenuGrid = menuGridRef.current;

        // 스크롤 이벤트 핸들러 - 성능 개선
        const handleScroll = () => {
            // 쓰로틀링으로 성능 최적화
            if (!scrollTimer.current) {
                scrollTimer.current = setTimeout(() => {
                    updateScrollButtonStates();
                    scrollTimer.current = null;
                }, 50);
            }
        };

        if (currentMenuGrid) {
            currentMenuGrid.addEventListener('scroll', handleScroll, { passive: true });
            currentMenuGrid.addEventListener('touchmove', handleScroll, { passive: true });

            // 이미지 로드 완료 후 다시 체크
            setTimeout(updateScrollButtonStates, 500);
        }

        return () => {
            if (currentMenuGrid) {
                currentMenuGrid.removeEventListener('scroll', handleScroll);
                currentMenuGrid.removeEventListener('touchmove', handleScroll);
            }
            // 타이머 정리
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
                scrollTimer.current = null;
            }
        };
    }, [selectedCategory, updateScrollButtonStates]); // updateScrollButtonStates 추가

    // Hammer.js를 이용한 터치 스크롤 구현 - 메뉴 그리드와 장바구니에 적용
    useEffect(() => {
        // 기존 Hammer 인스턴스 정리
        if (menuHammerRef.current) {
            menuHammerRef.current.destroy();
        }
        if (cartHammerRef.current) {
            cartHammerRef.current.destroy();
        }

        // 메뉴 그리드에 Hammer.js 적용
        if (menuGridRef.current) {
            menuHammerRef.current = new Hammer(menuGridRef.current);

            // 세로 방향 패닝(swipe) 이벤트만 감지하도록 설정
            menuHammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5 // 감도 조정 (낮을수록 민감)
            });

            // 패닝 이벤트 핸들러 등록
            menuHammerRef.current.on('panup pandown', (ev) => {
                if (!menuGridRef.current) return;

                // 스크롤 속도 계수 - 라즈베리파이 환경에 맞게 조정
                const scrollSpeed = 3.0;

                // 이동 거리에 따라 스크롤 조정 (deltaY가 양수면 아래로, 음수면 위로)
                menuGridRef.current.scrollTop += ev.deltaY * scrollSpeed * -1;

                // 수동 스크롤 위치 변경 후 버튼 상태 업데이트
                if (!scrollTimer.current) {
                    scrollTimer.current = setTimeout(() => {
                        updateScrollButtonStates();
                        scrollTimer.current = null;
                    }, 50);
                }
            });
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
            if (menuHammerRef.current) {
                menuHammerRef.current.destroy();
                menuHammerRef.current = null;
            }
            if (cartHammerRef.current) {
                cartHammerRef.current.destroy();
                cartHammerRef.current = null;
            }
        };
    }, [updateScrollButtonStates]); // updateScrollButtonStates 의존성 추가

    // 컴포넌트 마운트 시 초기 스크롤 상태 설정
    useEffect(() => {
        // 컴포넌트 마운트 시 초기화
        updateScrollButtonStates();

        // 창 크기 변경 시 다시 계산
        const handleResize = () => {
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => {
                updateScrollButtonStates();
                scrollTimer.current = null;
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
            }
        };
    }, [updateScrollButtonStates]); // updateScrollButtonStates 추가

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                        {/* Logo & Categories - 애니메이션 적용 */}
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
                                {categoryTrail.map((style, index) => (
                                    <animated.div key={categories[index].id} style={style}>
                                        <CategoryButton
                                            onClick={() => setSelectedCategory(categories[index].id)}
                                            active={selectedCategory === categories[index].id}
                                        >
                                            {categories[index].name}
                                        </CategoryButton>
                                    </animated.div>
                                ))}
                            </Box>
                        </CategoryWrapper>

                        {/* 메뉴 그리드와 스크롤 버튼 래퍼 */}
                        <MenuGridWrapper>
                            {/* 메뉴 그리드 컨테이너 - ref 추가 및 Hammer.js 적용 */}
                            <MenuGridContainer
                                ref={menuGridRef}
                                sx={{
                                    touchAction: 'none', // Hammer.js 사용 시 기본 터치 동작 비활성화
                                }}
                            >
                                {menuTrail.map((style, index) => {
                                    const item = menuItems[index];
                                    return (
                                        <animated.div key={item.id} style={style}>
                                            <MenuCard
                                                className="menu-card"
                                                onTouchStart={(e) => handleCardTouchStart(item.id, e)}
                                                onTouchMove={handleCardTouchMove}
                                                onTouchEnd={(e) => handleCardTouchEnd(item, e)}
                                                onClick={(e) => handleCardClick(item, e)}
                                                sx={{
                                                    transform: activeCardId === item.id ? 'scale(0.98)' : 'scale(1)',
                                                    borderColor: activeCardId === item.id ? '#2142FF' : '#f0f2fa',
                                                    transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                                                }}
                                            >
                                                {/* 기존 메뉴 카드 내용 */}
                                                <MenuImageContainer>
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="menu-image"
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
                                        </animated.div>
                                    );
                                })}
                            </MenuGridContainer>

                            {/* 토스 스타일 스크롤 버튼 */}
                            <ScrollButtonContainer>
                                <ScrollButton
                                    direction="up"
                                    disabled={!canScrollUp}
                                    onClick={handleScrollUp}
                                    aria-label="위로 스크롤"
                                >
                                    <KeyboardArrowUp />
                                </ScrollButton>
                                <ScrollButton
                                    direction="down"
                                    disabled={!canScrollDown}
                                    onClick={handleScrollDown}
                                    aria-label="아래로 스크롤"
                                >
                                    <KeyboardArrowDown />
                                </ScrollButton>
                            </ScrollButtonContainer>
                        </MenuGridWrapper>
                    </Box>

                    {/* 장바구니 영역 - 애니메이션 추가 */}
                    <animated.div style={cartAnimation}>
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
                                                    onClick={(e) => handleQuantityChange(index, -1, e)}
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
                                                    onClick={(e) => handleQuantityChange(index, 1, e)}
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
                                                onClick={(e) => handleQuantityChange(index, -item.quantity, e)}
                                                sx={{
                                                    ml: 1.5,
                                                    color: '#5d6b82',
                                                    padding: '10px',  // 터치 영역 확대
                                                    backgroundColor: 'rgba(232, 236, 245, 0.9)',  // 배경색 추가로 터치 영역 시각화
                                                    borderRadius: '12px',  // 모서리 둥글게
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
                    </animated.div>
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