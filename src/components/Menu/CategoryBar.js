import React from 'react';
import { Box } from '@mui/material';
import { useTrail, animated } from '@react-spring/web';
import { CategoryWrapper, CategoryButton } from '../../styles/Menu/CategoryBarStyle';

/**
 * 카테고리 선택 바 컴포넌트
 * @param {Object} props
 * @param {Array} props.categories - 카테고리 목록
 * @param {string} props.selectedCategory - 현재 선택된 카테고리
 * @param {Function} props.onSelectCategory - 카테고리 선택 이벤트 핸들러
 * @param {string} props.logoSrc - 로고 이미지 경로
 */
const CategoryBar = ({ categories, selectedCategory, onSelectCategory, logoSrc }) => {
    // 카테고리 애니메이션 - 더 빠르게 등장하도록 개선
    const categoryTrail = useTrail(categories.length, {
        from: { opacity: 0, transform: 'translateY(-5px)' }, // 이동 거리 감소
        to: { opacity: 1, transform: 'translateY(0)' },
        config: {
            tension: 400,  // 더 빠른 시작
            friction: 26,  // 약간 조정
            mass: 0.5      // 가벼운 질량
        },
        delay: 50, // 지연 시간 크게 감소
        trail: 15  // 카테고리 간 등장 간격 (빠르게)
    });

    return (
        <CategoryWrapper>
            <img src={logoSrc} alt="logo" style={{ height: '44px' }} />
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
                            onClick={() => onSelectCategory(categories[index].id)}
                            active={selectedCategory === categories[index].id}
                        >
                            {categories[index].name}
                        </CategoryButton>
                    </animated.div>
                ))}
            </Box>
        </CategoryWrapper>
    );
};

export default CategoryBar;