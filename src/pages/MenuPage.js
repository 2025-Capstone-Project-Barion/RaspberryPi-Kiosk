import React, { useState } from "react";
import CategoryMenu from "../components/Menu/CategoryMenu";
import MenuItem from "../components/Menu/MenuItem";
import OrderList from "../components/Menu/OrderList";
import { menuData } from "../data/menuData";
import { Container, Content, Sidebar, OrderSection } from "../styles/Menu/menuPage";

const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("coffee");
    const [cart, setCart] = useState([]);

    // 카테고리 변경 핸들러
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // 장바구니에 메뉴 추가
    const addToCart = (item) => {
        setCart((prevCart) => {
            const exists = prevCart.find((cartItem) => cartItem.id === item.id);
            if (exists) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    return (
        <Container>
            <Sidebar>
                <CategoryMenu selected={selectedCategory} onCategoryChange={handleCategoryChange} />
            </Sidebar>
            <Content>
                {menuData[selectedCategory].map((menu) => (
                    <MenuItem key={menu.id} item={menu} onAddToCart={addToCart} />
                ))}
            </Content>
            <OrderSection>
                <OrderList cart={cart} setCart={setCart} />
            </OrderSection>
        </Container>
    );
};

export default MenuPage;
