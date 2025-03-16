import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;  // 스크롤바 제거
    height: 100vh;     // 전체 높이로 설정
    width: 100vw;      // 전체 너비로 설정
  }

  body {
    background-color: #f9f9f9;
    position: fixed;   // 추가: 스크롤 방지
    // width: 100%;
  }

  #root {
    height: 100%;     // 전체 높이로 설정ㅈ
    overflow: hidden; // 스크롤바 제거
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
`;
