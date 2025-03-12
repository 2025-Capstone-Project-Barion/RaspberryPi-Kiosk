import React from "react";
import { CategoryContainer, CategoryItem } from "../../styles/Menu/categoryMenu";

const categories = ["coffee", "smoothies", "gift", "yogurt", "dessert"];

const CategoryMenu = ({ selected, onCategoryChange }) => {
    return (
        <CategoryContainer>
            {categories.map((category) => (
                <CategoryItem
                    key={category}
                    $active={selected === category}
                    onClick={() => onCategoryChange(category)}
                >
                    {category.toUpperCase()}
                </CategoryItem>
            ))}
        </CategoryContainer>
    );
};

export default CategoryMenu;