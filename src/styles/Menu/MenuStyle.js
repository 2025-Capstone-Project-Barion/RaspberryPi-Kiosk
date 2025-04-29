// src/styles/Menu/MenuStyles.js

// MUI 프레임워크 사용시 @emotion/react, @emotion/styled 패키지 설치 필요! (v5부터 변경사항임: styled-components에서 @emotion/react로 변경됨)
// npm install @emotion/react @emotion/styled @mui/icons-material @mui/material

// @emotion/styled은 styled-components와 비슷한 기능을 제공하는 라이브러리로, MUI와 함께 사용하기 위해 설치.

// => 2025/03/16 수정: 1. MUI 컴포넌트 커스터마이징 시 (@emotion/styled 사용) & 2. 일반 컴포넌트 스타일링 시 (styled-components 사용) 으로 구분하여 사용하기로 함.
// 현 프로젝트의 스타일링 기조는 styled-components로 진행하기로 하였고, MUI 컴포넌트 커스터마이징시에는 MUI프레임워크의 원칙에 따라 이때만 @emotion/styled을 사용하기로 함.
import styled from '@emotion/styled';
//import styled from 'styled-components';
import { Box, Button, List } from '@mui/material';

// 기본 html 컴포넌트가 아닌 MUI 컴포넌트 커스터마이징이므로 styled.Box이 아닌, styled(Box)문법을 사용해야함.
// 메인 컨테이너 - 전체 화면 고정 레이아웃

// 앱 컨테이너 - 배리어프리 개선
export const AppContainer = styled(Box)({
  height: '100vh',
  width: '100vw',
  padding: '24px',
  background: '#f8f9fe', // 배경색 밝게 변경 - 가독성 향상
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  boxSizing: 'border-box',
  margin: 0,
  overflow: 'hidden', // 전체 스크롤 방지
  // 배리어프리 UI를 위한 터치 최적화
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent'
});

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
  backgroundColor: '#f8f9fd', // 배경색 약간 밝게
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

// 장바구니 컨테이너 - 너비 증가 및 배리어프리 개선
export const CartContainer = styled(Box)({
  width: '400px', // 너비 증가
  minWidth: '400px',
  height: '100%', // 전체 높이로 변경
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  // 브랜드 컬러 액센트 추가
  borderTop: '4px solid #2142FF'
});

// 장바구니 헤더 - 배리어프리 개선
export const CartHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '16px',
  borderBottom: '1px solid #eef1fa',

  // 헤더 제목 스타일 개선
  '& h6': {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1A1A1A',
    // 이모지 삭제하고 텍스트만 중앙 정렬
    textAlign: 'center'
  }
});

// 장바구니 목록 - 배리어프리 개선
export const CartList = styled(List)({
  overflowY: 'auto',
  overflowX: 'hidden',
  flex: 1,
  // 터치 스크롤 최적화
  WebkitOverflowScrolling: 'touch',
  scrollBehavior: 'smooth',
  padding: '4px 0',

  // 스크롤바 스타일링 개선
  '&::-webkit-scrollbar': {
    width: '8px'
  },

  '&::-webkit-scrollbar-track': {
    background: '#f5f7ff',
    borderRadius: '4px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#d0d7ff',
    borderRadius: '4px'
  }
});

// 장바구니 푸터 - 배리어프리 개선
export const CartFooter = styled(Box)({
  marginTop: 'auto',
  paddingTop: '20px',
  borderTop: '2px solid #eef1fa',

  // 총 금액 표시 스타일 개선
  '& h6': {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '16px',

    // 금액 부분만 강조
    '& span': {
      color: '#2142FF',
      fontWeight: 700,
      fontSize: '1.25rem'
    }
  }
});

// 구매 버튼 - 배리어프리 개선
export const PurchaseButton = styled(Button)({
  width: '100%',
  marginTop: '16px !important',
  // 충분한 터치 영역 확보
  padding: '16px !important',
  fontSize: '1.2rem !important',
  fontWeight: '700 !important',
  letterSpacing: '-0.5px !important',
  // 현대적인 모서리 둥글기
  borderRadius: '14px !important',
  backgroundColor: '#2142FF !important',
  // 그림자 효과로 입체감 강화
  boxShadow: '0 4px 12px rgba(33, 66, 255, 0.25) !important',

  // 터치 피드백 애니메이션
  '&:active': {
    transform: 'scale(0.98) !important',
    boxShadow: '0 2px 8px rgba(33, 66, 255, 0.15) !important',
    transition: 'all 0.15s ease !important'
  },

  // 호버 효과 제거 - 터치 환경 최적화
  '&:hover': {
    backgroundColor: '#2142FF !important'
  }
});