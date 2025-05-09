import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 메뉴 그리드와 스크롤 버튼을 함께 포함하는 컨테이너
export const MenuGridWrapper = styled(Box)({
    position: 'relative',
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

// 메뉴 그리드 컨테이너 - 간격과 여백 조정으로 세련된 UI 구현
export const MenuGridContainer = styled(Box)({
    flex: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px', // 간격 확대 (12px → 16px) - 더 넓은 공간감
    gridAutoRows: '1fr',
    alignItems: 'start',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 52px 16px 0', // 오른쪽 패딩 최적화 (60px → 52px)

    // 스크롤 부드럽게
    scrollBehavior: 'smooth',

    // Hammer.js 사용을 위한 속성 - 기본 터치 동작 수정
    // touchAction: 'none'은 Hammer.js에서 설정됨
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',

    // 스크롤바 완전히 숨김 (토스 스타일)
    '&::-webkit-scrollbar': {
        display: 'none'
    },

    // Firefox 등에서도 스크롤바 숨김
    scrollbarWidth: 'none',

    // 높이 제한 조정 - 증가된 간격 반영
    maxHeight: 'calc((100% - 32px) / 2 * 2 + 32px)',

    // 메뉴 카드의 행 높이를 살짝 키워 스크롤 버튼과 일치
    '& .menu-card': {
        height: 'calc((100vh - 230px) / 2)', // 210px → 230px로 조정하여 높이 증가
        // 카드 내부 터치 이벤트 처리를 위해 터치 액션 자동으로 설정
        touchAction: 'auto'
    }
});

// 스크롤 버튼 컨테이너 - 위치 정확히 조정
export const ScrollButtonContainer = styled(Box)({
    position: 'absolute',
    right: 0,
    top: 0, // 상단에 정확히 맞춤
    height: 'calc(100% - 16px)', // 하단 패딩 고려하여 높이 조정
    width: '42px', // 너비 약간 증가
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // 버튼 사이 간격 최대화
    zIndex: 2,
});

// 스크롤 버튼 - 메뉴카드와 완벽하게 일치하도록 조정
export const ScrollButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'direction' && prop !== 'disabled'
})(({ direction, disabled }) => ({
    width: '42px',
    // 메뉴카드와 정확히 같은 높이로 설정
    height: 'calc((100vh - 230px) / 2)', // 메뉴 카드 높이와 정확히 일치
    minWidth: 'unset',
    padding: 0,
    margin: 0, // 마진 제거하여 정확한 위치 조정
    borderRadius: '10px',
    backgroundColor: disabled ? '#f0f2fa' : '#2142FF',
    color: disabled ? '#d0d5e8' : 'white',
    border: 'none',
    boxShadow: disabled ? 'none' : '0 2px 10px rgba(33, 66, 255, 0.22)',

    '&:hover': {
        backgroundColor: disabled ? '#f0f2fa' : '#2142FF',
    },

    '&:active': !disabled ? {
        backgroundColor: '#1833d0',
        transform: 'scale(0.95)',
        transition: 'all 0.15s ease',
    } : {},

    borderBottom: 'none',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
        fontSize: '1.3rem',
    },
}));

// 메뉴 카드 - 전체적인 높이와 비율 최적화
export const MenuCard = styled(Box)({
    background: 'white',
    padding: '16px 16px 20px', // 하단 패딩 증가 (18px → 20px)
    borderRadius: '14px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 15px rgba(0,0,0,0.04)',
    border: '1px solid #f5f7fa',
    position: 'relative',
    overflow: 'hidden',
    width: '95%',
    margin: '0 auto',

    '&:active': {
        transform: 'scale(0.98)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        borderColor: '#2142FF',
        transition: 'all 0.15s ease-out'
    },

    '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: '#2142FF',
        opacity: 0.75
    }
});

// 이미지 컨테이너 - 높이 확대로 이미지 비율 개선
export const MenuImageContainer = styled(Box)({
    width: '100%',
    height: '52%', // 높이 대폭 증가 (50% → 52%)
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px', // 여백 증가 (12px → 14px)
    //backgroundColor: '#ffffff', // 배경색 흰색. 굳이 필요 없음.
    borderRadius: '12px', // 모서리 둥글기 증가
    overflow: 'hidden',

    '& img': {
        width: 'auto',
        height: 'auto',
        maxWidth: '80%', // 너비 약간 증가 (78% → 80%)
        maxHeight: '92%', // 높이 조정 (94% → 92%)
        objectFit: 'contain',
        transition: 'transform 0.2s ease-out'
    },

    '.menu-card:active & img': {
        transform: 'scale(0.95)'
    }
});

// 메뉴 정보 컨테이너 - 간격 최적화
export const MenuInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    gap: '8px',
});

// 메뉴 이름 - 토스 스타일로 세련되게 개선
export const MenuName = styled(Box)({
    fontSize: '1.38rem', // 크기 약간 증가
    fontWeight: 700,
    marginBottom: '8px', // 여백 감소 (10px → 8px)
    lineHeight: 1.2,
    color: '#121212', // 색상 더 진하게 (#101010 → #121212)
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative',
    paddingLeft: 0,
    letterSpacing: '-0.02em', // 토스 스타일 자간
});

// 메뉴 설명 - 토스 스타일로 세련되게 개선
export const MenuDescription = styled(Box)({
    fontSize: '1.05rem',
    color: '#666', // 색상 약간 어둡게 (#555 → #666)
    marginBottom: '10px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: 1.4,
    height: '2.9rem',
    letterSpacing: '-0.01em',
    fontWeight: 400, // 기본 폰트 무게 명시
});

// 메뉴 가격 - 고급스러운 구분선 추가
export const MenuPrice = styled(Box)({
    fontSize: '1.42rem', // 크기 미세 증가 (1.4rem → 1.42rem)
    fontWeight: 700,
    color: '#2142FF',
    padding: '12px 0 0',
    position: 'relative',
    marginTop: '4px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
    letterSpacing: '-0.02em',

    // 세련된 그라데이션 구분선 유지
    '&::before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: '0',
        right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, rgba(33, 66, 255, 0.2), rgba(33, 66, 255, 0.05) 70%, transparent)',
        borderRadius: '1px',
    }
});