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
            {/* 
                $primary: styled-components v5.1.0부터 도입된 Transient Props 문법
                $ 접두어가 붙은 props는 실제 DOM 요소에 전달되지 않고 오직 스타일링 목적으로만 사용됨
                이를 통해 "Received 'true' for a non-boolean attribute" 같은 React 경고를 방지
                OrderButton 컴포넌트 내부에서는 props.$primary 값에 따라 배경색 등의 스타일이 결정됨
            */}
            <OrderButton $primary>결제하기</OrderButton>
        </OrderContainer>
    );
};

export default OrderList;