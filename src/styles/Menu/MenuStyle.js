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

// 메뉴 그리드 컨테이너 - 배리어프리 UI 개선
export const MenuGridContainer = styled(Box)({
  flex: 1,
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3열 그리드 유지
  gap: '20px', // 간격 확대 - 터치 정확도 향상
  gridAutoRows: '340px', // 높이 약간 증가 - 더 많은 정보 표시
  alignItems: 'start',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingRight: '12px',
  paddingBottom: '24px',

  // 터치 스크롤 최적화
  WebkitOverflowScrolling: 'touch',
  scrollBehavior: 'smooth',

  // 스크롤바 스타일링 - 더 직관적으로
  '&::-webkit-scrollbar': {
    width: '10px' // 넓은 스크롤바 - 터치 정확도 향상
  },

  '&::-webkit-scrollbar-track': {
    background: '#f1f3fa',
    borderRadius: '8px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#c1c7e0',
    borderRadius: '8px',
    border: '2px solid #f1f3fa'
  }
});

// 메뉴 카드 - 배리어프리 개선
export const MenuCard = styled(Box)({
  background: 'white',
  padding: '20px',
  borderRadius: '16px', // 모서리 둥글게 - 현대적 UI
  cursor: 'pointer',
  height: '340px', // 높이 증가 - 정보 가독성 향상
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  border: '1px solid #f0f2fa',
  position: 'relative',
  overflow: 'hidden',

  // 터치 피드백 효과 강화
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    // 터치 시 브랜드 컬러로 테두리 변경
    borderColor: '#2142FF',
    // 애니메이션 효과
    transition: 'all 0.15s ease-out'
  },

  // 상단 브랜드 컬러 액센트 추가
  '&::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: '#2142FF',
    opacity: 0.8
  }
});

// 이미지 컨테이너 - 배리어프리 개선
export const MenuImageContainer = styled(Box)({
  width: '100%',
  height: '180px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  backgroundColor: '#f9faff', // 배경색 변경 - 이미지 대비 향상
  borderRadius: '12px',
  overflow: 'hidden',

  '& img': {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '180px',
    objectFit: 'contain',
    // 터치시 이미지 반응 효과 추가
    transition: 'transform 0.2s ease-out'
  },

  // 부모 요소가 active일 때 이미지 축소 효과
  // 컴포넌트 셀렉터 대신 클래스 셀렉터 사용
  '.menu-card:active & img': {
    transform: 'scale(0.95)'
  }
});

// 메뉴 정보 컨테이너
export const MenuInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between'
});

// 메뉴 이름 - 배리어프리 개선
export const MenuName = styled(Box)({
  fontSize: '1.4rem',
  fontWeight: 700,
  marginBottom: '8px',
  lineHeight: 1.3,
  color: '#1A1A1A', // 더 높은 대비 - 가독성 향상
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // 레이블 효과 추가
  position: 'relative',
  paddingLeft: 0
});

// 메뉴 설명 - 배리어프리 개선
export const MenuDescription = styled(Box)({
  fontSize: '0.95rem',
  color: '#666', // 메뉴명과 구분되는 색상 - 계층 구조 명확화
  marginBottom: '12px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.5,
  // 높이 고정 - 레이아웃 안정화
  height: '2.9rem'
});

// 메뉴 가격 - 배리어프리 개선
export const MenuPrice = styled(Box)({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#2142FF',
  padding: '10px 0',
  borderTop: '1px dashed #e8ecfb',
  marginTop: 'auto',
  // 가격 레이블 추가
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  // 가격 레이블 추가
  '&::before': {
    content: "'가격'",
    fontSize: '0.85rem',
    fontWeight: 400,
    color: '#666'
  }
});

// 장바구니 컨테이너 - 배리어프리 개선
export const CartContainer = styled(Box)({
  width: '340px', // 약간 넓게 조정 - 가독성 향상
  minWidth: '340px',
  height: '100%',
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