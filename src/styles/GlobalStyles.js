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
        // 터치 하이라이트 효과 제거 - 터치 환경 최적화
        WebkitTapHighlightColor: 'transparent',
        // 텍스트 선택 방지 - 키오스크 환경 최적화
        userSelect: 'none',
      },

      'html, body': {
        margin: 0,
        padding: 0,
        overflow: 'hidden',  // 스크롤바 제거
        height: '100vh',     // 전체 높이로 설정
        width: '100vw',      // 전체 너비로 설정
        // 배경색 밝게 - 배리어프리 UI
        backgroundColor: '#f8f9fe',
      },

      'body': {
        position: 'fixed',   // 추가: 스크롤 방지
        // 터치 동작 최적화
        touchAction: 'manipulation',
      },

      '#root': {
        height: '100%',     // 전체 높이로 설정
        overflow: 'hidden', // 스크롤바 제거
      },

      // 버튼 스타일 개선 - 터치 최적화
      'button': {
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        // 터치 피드백 기본 설정
        transition: 'transform 0.15s ease-out',
        borderRadius: '10px',
        // 물리적 피드백을 위한 탭 하이라이트 추가
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      },

      // 접근성 개선 - 포커스 표시자
      ':focus-visible': {
        outline: '3px solid rgba(33, 66, 255, 0.5)',
        outlineOffset: '2px',
      },

      // 이미지 드래그 방지
      'img': {
        userDrag: 'none',
        WebkitUserDrag: 'none',
        userSelect: 'none',
        pointerEvents: 'none',
      }
    }}
  />
);