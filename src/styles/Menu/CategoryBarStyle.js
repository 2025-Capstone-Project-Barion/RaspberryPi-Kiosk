import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 카테고리 영역 - 배리어프리 UI 개선
export const CategoryWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '32px', // 간격 확대 - 터치 정확도 향상
    padding: '16px 24px',
    background: 'white',
    borderRadius: '16px', // 모서리 둥글게 - 현대적 UI
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    // 상단 고정 효과
    position: 'relative',
    zIndex: 10
});

// 카테고리 버튼 - 배리어프리 UI 개선
// 애러는 아니지만 경고제거를 위해=> active prop이 DOM으로 전달되지 않도록 shouldForwardProp를 적용함.
// HTML 표준에는 active라는 attribute가 없음. MUI에서 이를 사용하기 위해서는 Emotion/styled에서 제공하는 shouldForwardProp을 사용하여 active prop을 DOM으로 전달하지 않도록하면서 styled 함수 안에서만 스타일 계산용으로 쓰게 만듦. 
// 즉 active는 스타일 계산에는 쓰이고, HTML에는 안 나옴.
// 이 코드는 active prop이 DOM 요소로 전달되는 것을 방지하면서, 스타일링에는 계속 사용할 수 있게 해줌
export const CategoryButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active'
})(({ active }) => ({
    fontSize: '1.2rem',
    fontWeight: active ? 700 : 500,
    color: active ? '#2142FF' : '#555',
    // 터치 영역 확보를 위해 패딩 증가
    padding: '14px 22px', // 더 넓은 패딩으로 터치 정확도 향상
    minWidth: '110px',
    borderRadius: '12px', // 둥근 모서리 - 현대적 UI

    // 선택된 카테고리 표시 방법 개선 - 테두리 대신 배경색과 하단 바 사용
    backgroundColor: active ? 'rgba(33, 66, 255, 0.08)' : 'transparent',
    position: 'relative',
    '&::after': active ? {
        content: '""',
        position: 'absolute',
        bottom: '6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40%',
        height: '3px',
        backgroundColor: '#2142FF',
        borderRadius: '6px',
    } : {},

    // 터치 피드백을 위한 활성 상태 스타일링
    '&:active': {
        backgroundColor: 'rgba(33, 66, 255, 0.15)',
        // 버튼이 눌렸을때 버튼 크기 축소하여 버튼클릭됨을 주기 위한 스타일
        transform: 'scale(0.95)',
        // 버튼 크기 축소되는 애니메이션이 0.1s초 내에 수행되어 빠르게 축소 & 복구
        transition: 'transform 0.1s ease'
    },
    // 버튼 간 간격을 위한 마진
    margin: '4px',
    // 호버 효과 제거 - 터치 환경 최적화
    '&:hover': {
        backgroundColor: active ? 'rgba(33, 66, 255, 0.08)' : 'transparent',
    }
}));