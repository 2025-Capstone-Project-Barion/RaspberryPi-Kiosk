import { Global } from '@emotion/react';
import NotoSansKR from '../assets/Font/NotoSansKR-SemiBold.ttf';

// 객체 표현법으로 Global 스타일 정의
export const GlobalStyles = () => (
  <Global
    styles={{
      '@font-face': {
        fontFamily: "'Noto Sans KR'",
        fontStyle: 'normal',
        /* // font-weight: 600 제거 가능 - 이미 SemiBold 폰트 파일이므로 */
        src: `url(${NotoSansKR}) format('truetype')`,
        fontDisplay: 'block',
      },

      // 전역 폰트 설정 - 즉 html, body에 적용되는 모든 엘리먼트들의 폰트 설정임
      // MUI 컴포넌트들에 대한 폰트설정은 App.js에서 theme 객체로 진행함

      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: "'Noto Sans KR', sans-serif",
      },

      'html, body': {
        margin: 0,
        padding: 0,
        overflow: 'hidden',  // 스크롤바 제거
        height: '100vh',     // 전체 높이로 설정
        width: '100vw',      // 전체 너비로 설정
      },

      'body': {
        backgroundColor: '#f9f9f9',
        position: 'fixed',   // 추가: 스크롤 방지
        // width: 100%;
      },

      '#root': {
        height: '100%',     // 전체 높이로 설정ㅈ
        overflow: 'hidden', // 스크롤바 제거
      },

      'button': {
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
      }
    }}
  />
);