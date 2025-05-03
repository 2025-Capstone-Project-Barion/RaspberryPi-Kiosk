import React from 'react';
import { useTrail, animated } from '@react-spring/web';
import {
    CategoryWrapper,
    CategoryButton,
    LogoContainer,
    CategoryContainer
} from '../../styles/Menu/CategoryBarStyle';

/**
 * 카테고리 선택 바 컴포넌트
 * @param {Object} props
 * @param {Array} props.categories - 카테고리 목록
 * @param {string} props.selectedCategory - 현재 선택된 카테고리
 * @param {Function} props.onSelectCategory - 카테고리 선택 이벤트 핸들러
 * @param {string} props.logoSrc - 로고 이미지 경로
 */
const CategoryBar = ({ categories, selectedCategory, onSelectCategory, logoSrc }) => {
    // 카테고리 애니메이션
    const categoryTrail = useTrail(categories.length, {
        from: { opacity: 0, transform: 'translateY(-8px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: {
            tension: 380,
            friction: 26,
            mass: 0.5
        },
        delay: 50,
        trail: 20
    });

    return (
        <CategoryWrapper>
            {/* 로고 영역 */}
            <LogoContainer>
                <img
                    src={logoSrc}
                    alt="Barion Kiosk Logo"
                />
            </LogoContainer>

            {/* 카테고리 영역 */}
            <CategoryContainer>
                {categoryTrail.map((style, index) => (
                    <animated.div key={categories[index].id} style={style}>
                        <CategoryButton
                            onClick={() => onSelectCategory(categories[index].id)}
                            active={selectedCategory === categories[index].id}
                        >
                            {categories[index].name}
                        </CategoryButton>
                    </animated.div>
                ))}
            </CategoryContainer>
        </CategoryWrapper>
    );
};

export default CategoryBar;