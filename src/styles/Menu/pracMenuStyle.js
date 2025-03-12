// src/styles/Menu/MenuStyles.js

// MUI 프레임워크 사용시 @emotion/react, @emotion/styled 패키지 설치 필요! (v5부터 변경사항임: styled-components에서 @emotion/react로 변경됨)
// npm install @emotion/react @emotion/styled @mui/icons-material @mui/material

// @emotion/styled은 styled-components와 비슷한 기능을 제공하는 라이브러리로, MUI와 함께 사용하기 위해 설치.
// import styled from '@emotion/styled';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';

// 기본 html 컴포넌트가 아닌 MUI 컴포넌트 커스터마이징이므로 styled.Box이 아닌, styled(Box)문법을 사용해야함.
export const AppContainer = styled(Box)`
  height: 100vh;
  width: 100vw; // 뷰포트 너비로 설정
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box; // 패딩이 너비에 포함되도록
  margin: 0; // 마진 제거
  overflow-x: hidden; // 가로 스크롤 방지
`;

export const CategoryWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 10px 20px;
  background: white;
  border-radius: 10px;
  width: 100%; // 너비 100%로 설정
`;

export const CategoryButton = styled(Button)(({ active }) => ({
  fontSize: '1.2rem',
  fontWeight: active ? 'bold' : 'normal',
  color: active ? '#ff6f61' : '#333',
}));

export const MenuGridContainer = styled(Box)`
  flex: 1;
  width: 100%; // 너비 추가
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  overflow: auto;
  padding-right: 10px;
`;

export const MenuCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  
  /* 호버 대신 액티브 상태로 변경 */
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
`;

export const CartContainer = styled(Box)`
  width: 350px;
  min-width: 350px; // 최소 너비 설정
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CartFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px solid #eee;
`;

export const PaymentButton = styled(Button)`
  width: 100%;
  margin-top: 20px !important;
  padding: 15px !important;
  font-size: 1.2rem !important;
  background: #ff6f61 !important;
  &:hover {
    background: #ff4d3d !important;
  }
`;