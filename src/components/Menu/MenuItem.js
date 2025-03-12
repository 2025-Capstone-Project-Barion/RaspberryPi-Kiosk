import React from "react";
import { ItemContainer, ItemImage, ItemInfo, OrderButton } from "../../styles/Menu/menuItem";

const MenuItem = ({ item, onAddToCart }) => {
    return (
        <ItemContainer>
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
                <h3>{item.name}</h3>
                <p>{item.price} 원</p>
                <OrderButton onClick={() => onAddToCart(item)}>주문하기</OrderButton>
            </ItemInfo>
        </ItemContainer>
    );
};

export default MenuItem;
