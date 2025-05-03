import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 카테고리 영역 - 배리어프리 UI 개선
export const CategoryWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '18px 24px',
    background: 'white',
    borderRadius: '20px', // 더 둥근 모서리 - 모던한 느낌
    width: '100%',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)', // 섀도우 개선
    position: 'relative',
    zIndex: 10,
    justifyContent: 'space-between' // 로고와 카테고리 영역 분리
});

// 로고 컨테이너
export const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    img: {
        height: '48px', // 로고 크기 약간 키움
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
});

// 카테고리 컨테이너
export const CategoryContainer = styled(Box)({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center', // 오른쪽 정렬로 변경
    gap: '30px'
});

// 카테고리 버튼
export const CategoryButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active'
})(({ active }) => ({
    fontSize: '1.25rem', // 폰트 사이즈 키움
    fontWeight: active ? 700 : 500,
    color: active ? '#2142FF' : '#555', // 비활성 상태 텍스트 색상 약간 진하게
    padding: '12px 24px',
    width: 'clamp(120px, 15vw, 180px)', // 최소 120px, 최대 180px, 화면 너비의 15% 기준
    minWidth: '120px',
    borderRadius: '16px', // 더 둥근 모서리
    boxSizing: 'border-box', // 추가: 테두리가 요소 크기에 영향을 주지 않음


    // 기본 스타일 - 모든 버튼에 적용
    background: active ? '#e0e7ff' : '#f5f6fa',  // 비활성 버튼 배경색을 더 밝게 변경
    boxShadow: active
        ? '0 6px 16px rgba(33, 66, 255, 0.22)'
        : '0 4px 10px rgba(0, 0, 0, 0.15)',     // 그림자 불투명도 강화
    position: 'relative',
    border: '2px solid',                         // 모든 버튼에 테두리 적용
    borderColor: active ? 'rgba(33, 66, 255, 0.3)' : 'rgba(0, 0, 0, 0.08)', // 비활성 버튼에도 약한 테두리

    // 활성화된 버튼 스타일
    ...(active && {
        background: 'linear-gradient(135deg, #e0e7ff, #c7d4ff)',
        transform: 'translateY(-2px)',
        // 테두리는 위에서 이미 설정했으므로 여기서는 제거
    }),

    // 활성화 인디케이터 (밑줄)
    '&::after': active ? {
        content: '""',
        position: 'absolute',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        height: '4px',
        background: 'linear-gradient(90deg, #2142FF, #5375FF)', // 그라데이션 밑줄
        borderRadius: '6px',
    } : {},

    // 활성화된 버튼에 아이콘 추가
    '&::before': active ? {
        content: '""',
        position: 'absolute',
        top: '12px',
        left: '12px',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#2142FF',
    } : {},

    // 터치 피드백을 위한 활성 상태 스타일링
    '&:active': {
        backgroundColor: active ? 'rgba(33, 66, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
        transform: 'scale(0.95)',
        transition: 'transform 0.1s ease'
    },

    margin: '5.5px 26px',
    transition: 'all 0.2s ease-in-out', // 모든 변화에 애니메이션 적용

    // 호버 효과 제거 - 터치 환경 최적화
    '&:hover': {
        backgroundColor: active ? 'rgba(33, 66, 255, 0.08)' : '#f5f7ff',
    }
}));