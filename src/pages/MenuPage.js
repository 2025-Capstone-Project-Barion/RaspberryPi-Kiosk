import React, { useState } from 'react';
import { Typography, Box, IconButton, ListItem } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
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
    PaymentButton
} from '../styles/Menu/MenuStyle';

import { categories, getMenuItems } from '../data/menuData';
import logo from '../assets/Image/Logo/logo.png'; // 로고 이미지 경로

const MenuPage = () => {
    // 디폴트 카테고리는 커피로 설정(메뉴페이지로 들어왔을 때 보이는 카테고리)
    const [selectedCategory, setSelectedCategory] = useState('coffee');
    const [cart, setCart] = useState([]);

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

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <AppContainer>
            {/* Logo & Categories */}
            <CategoryWrapper>
                <img src={logo} alt="logo" style={{ height: '40px' }} />
                <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'nowrap', overflow: 'auto' }}>
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

            {/* Main Content Area */}
            <Box sx={{
                display: 'flex',
                gap: '20px',
                height: 'calc(100vh - 120px)',
                width: '100%'
            }}>
                {/* Menu Items */}
                <MenuGridContainer>
                    {getMenuItems(selectedCategory).map((item) => (
                        <MenuCard
                            key={item.id}
                            onClick={() => handleAddToCart(item)}
                        // sx={{
                        //     '&:hover img': {
                        //         transform: 'scale(1.05)'
                        //     }
                        // }}
                        >
                            <MenuImageContainer>
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    //loading="lazy" // 이미지 지연 로딩으로 성능 최적화
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

                <CartContainer>
                    <CartHeader>
                        <Typography variant="h6">장바구니</Typography>
                        <IconButton
                            onClick={() => setCart([])}
                            color="error"
                            disabled={cart.length === 0}
                        >
                            <Delete />
                        </IconButton>
                    </CartHeader>

                    <CartList>
                        {cart.map((item, index) => (
                            <ListItem key={index} divider sx={{
                                padding: '10px 5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Typography sx={{
                                    flexGrow: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {item.name}
                                </Typography>
                                <IconButton size="small" onClick={() => handleQuantityChange(index, -1)}>
                                    <Remove fontSize="small" />
                                </IconButton>
                                <Typography sx={{ mx: 1, minWidth: '25px', textAlign: 'center' }}>
                                    {item.quantity}
                                </Typography>
                                <IconButton size="small" onClick={() => handleQuantityChange(index, 1)}>
                                    <Add fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error" onClick={() => handleQuantityChange(index, -item.quantity)}>
                                    <Delete fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </CartList>

                    <CartFooter>
                        <Typography variant="h6" align="right">
                            총 금액: {totalPrice.toLocaleString()}원
                        </Typography>
                        <PaymentButton
                            variant="contained"
                            disabled={cart.length === 0}
                        >
                            결제하기 ({totalPrice.toLocaleString()}원)
                        </PaymentButton>
                    </CartFooter>
                </CartContainer>
            </Box>
        </AppContainer>
    );
};

export default MenuPage; 