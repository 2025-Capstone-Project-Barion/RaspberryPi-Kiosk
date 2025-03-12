import React from "react";
import { OrderContainer, OrderItem, OrderButton, TotalPrice } from "../../styles/Menu/orderList";

const OrderList = ({ cart, setCart }) => {
    const updateQuantity = (id, amount) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + amount } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <OrderContainer>
            <h2>ORDER LIST</h2>
            {cart.map((item) => (
                <OrderItem key={item.id}>
                    <span>{item.name}</span>
                    <div>
                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <span>{item.price * item.quantity} 원</span>
                </OrderItem>
            ))}
            <TotalPrice>총 결제금액: {totalPrice} 원</TotalPrice>
            <OrderButton onClick={clearCart}>전체 삭제</OrderButton>
            <OrderButton primary>결제하기</OrderButton>
        </OrderContainer>
    );
};

export default OrderList;
