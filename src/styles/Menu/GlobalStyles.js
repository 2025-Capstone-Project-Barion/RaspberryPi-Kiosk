import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    background-color: #f9f9f9;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
`;
