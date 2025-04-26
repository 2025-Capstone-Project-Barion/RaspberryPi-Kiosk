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

export const AppContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden; // 전체 스크롤 방지
`;

// 카테고리 영역
export const CategoryWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 10px 20px;
  background: white;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

// 카테고리 버튼
// 애러는 아니지만 경고제거를 위해=> active prop이 DOM으로 전달되지 않도록 shouldForwardProp 적용
// 이 코드는 active prop이 DOM 요소로 전달되는 것을 방지하면서, 스타일링에는 계속 사용할 수 있게 해줌
export const CategoryButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ active }) => ({
  fontSize: '1.2rem',
  fontWeight: active ? 'bold' : 'normal',
  color: active ? '#ff6f61' : '#333',
  padding: '8px 16px',
  minWidth: '100px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 111, 97, 0.05)'
  }
}));

// 메뉴 그리드 컨테이너 수정 - 더 큰 높이의 그리드 셀
export const MenuGridContainer = styled(Box)`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열로 변경 - 각 메뉴 아이템이 더 크게 보임
  gap: 16px; // 간격 조정
  grid-auto-rows: 320px; // 충분한 높이 확보
  align-items: start;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 12px;
  padding-bottom: 20px;
  
  /* 터치 스크롤 최적화 */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

// 메뉴 카드 - 키오스크 스타일로 개선
export const MenuCard = styled(Box)`
  background: white;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  height: 320px; // 충분한 높이
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  border: 1px solid #f0f0f0;
  
  // 클릭 효과 - 키오스크에 적합한 피드백
  &:active {
    transform: scale(0.97);
    background-color: #fcfcfc;
    border-color: #ff6f61;
  }
`;

// 이미지 컨테이너 - 키오스크에 적합한 이미지 표시
export const MenuImageContainer = styled(Box)`
  width: 100%;
  height: 180px; // 더 큰 이미지 영역
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  
  & img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 180px; // 높이 제한
    object-fit: contain; // 이미지 비율 유지하면서 온전히 표시
  }
`;

// 호버 효과 관련 객체 제거
// export const MenuCardHoverEffect = {
//   '&:hover img': {
//     transform: 'scale(1.05)'
//   }
// };

// 메뉴 정보 컨테이너
export const MenuInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

// 메뉴 이름 - 키오스크에 적합한 크고 명확한 글꼴
export const MenuName = styled(Box)`
  font-size: 1.4rem; // 더 큰 글자 크기
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1.3;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 메뉴 설명
export const MenuDescription = styled(Box)`
  font-size: 0.95rem; // 적절한 크기로 조정
  color: #555;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

// 메뉴 가격 - 강조 표시
export const MenuPrice = styled(Box)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ff6f61;
  padding: 5px 0;
  border-top: 1px dashed #eee;
  margin-top: auto; // 항상 하단에 배치
`;

// 장바구니 컨테이너
export const CartContainer = styled(Box)`
  width: 320px;
  min-width: 320px; // 최소 너비 고정
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

// 장바구니 헤더
export const CartHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

// 장바구니 목록
export const CartList = styled(List)`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding: 4px;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

// 장바구니 푸터
export const CartFooter = styled(Box)`
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px solid #eee;
`;

// 구매 버튼
export const PurchaseButton = styled(Button)`
  width: 100%;
  margin-top: 20px !important;
  padding: 15px !important;
  font-size: 1.2rem !important;
  background-color: #ff6f61 !important;
  &:hover {
    background-color: #ff4d3d !important;
  }
`;