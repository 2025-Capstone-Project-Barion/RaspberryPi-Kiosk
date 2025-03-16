import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import {
    AppContainer,
    CategoryWrapper,
    CategoryButton,
    MenuGridContainer,
    MenuCard,
    CartContainer,
    CartHeader,
    CartFooter,
    PaymentButton
} from '../styles/Menu/MenuStyle';

import { categories, getMenuItems } from '../data/menuData';

const MenuPage = () => {
    // 디폴트 카테고리는 커피로 설정(메뉴페이지로 들어왔을 때 보이는 카테고리)
    const [selectedCategory, setSelectedCategory] = useState('coffee');
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            handleQuantityChange(cart.indexOf(existingItem), 1);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (index, value) => {
        const newCart = [...cart];
        newCart[index].quantity += value;
        if (newCart[index].quantity < 1) newCart.splice(index, 1);
        setCart(newCart);
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <AppContainer>
            {/* Logo & Categories */}
            <CategoryWrapper>
                <img src="/logo.png" alt="logo" style={{ height: '40px' }} />
                <Box sx={{ display: 'flex', gap: '20px' }}>
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
                width: '100%', // 명시적 너비 설정
                maxWidth: '100%' // 최대 너비 제한
            }}>
                {/* Menu Items */}
                <MenuGridContainer>
                    {getMenuItems(selectedCategory).map((item) => (
                        <MenuCard key={item.id} onClick={() => handleAddToCart(item)}>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                            )}
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography>{item.price.toLocaleString()}원</Typography>
                        </MenuCard>
                    ))}
                </MenuGridContainer>

                {/* Shopping Cart */}
                <CartContainer>
                    <CartHeader>
                        <Typography variant="h6">장바구니</Typography>
                        <Button onClick={() => setCart([])}>전체 삭제</Button>
                    </CartHeader>

                    <List sx={{ overflow: 'auto', flex: 1 }}>
                        {cart.map((item, index) => (
                            <ListItem key={index} divider>
                                <Typography sx={{ flexGrow: 1 }}>{item.name}</Typography>
                                <IconButton onClick={() => handleQuantityChange(index, -1)}>
                                    <Remove />
                                </IconButton>
                                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                <IconButton onClick={() => handleQuantityChange(index, 1)}>
                                    <Add />
                                </IconButton>
                                <IconButton onClick={() => handleQuantityChange(index, -item.quantity)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                    <CartFooter>
                        <Typography variant="h6">총 금액: {totalPrice.toLocaleString()}원</Typography>
                        <PaymentButton variant="contained">
                            결제하기 ({totalPrice.toLocaleString()}원)
                        </PaymentButton>
                    </CartFooter>
                </CartContainer>
            </Box>
        </AppContainer>
    );
};

export default MenuPage; 