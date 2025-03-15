import React from "react";
import { MenuItemContainer, ItemImage, ItemInfo, ItemName, ItemPrice, AddButton } from "../../styles/Menu/menuItem";

const MenuItem = ({ item, onAddToCart }) => {
    return (
        <MenuItemContainer>
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price} 원</ItemPrice>
            </ItemInfo>
            <AddButton onClick={() => onAddToCart(item)}>추가</AddButton>
        </MenuItemContainer>
    );
};

export default MenuItem;