import styled from '@emotion/styled';
import { Box } from '@mui/material';

// MUI 프레임워크 사용시 @emotion/react, @emotion/styled 패키지 설치 필요! (v5부터 변경사항임: styled-components에서 @emotion/react로 변경됨)
// npm install @emotion/react @emotion/styled @mui/icons-material @mui/material

// @emotion/styled은 styled-components와 비슷한 기능을 제공하는 라이브러리로, MUI와 함께 사용하기 위해 설치.

// => 2025/03/16 수정: 1. MUI 컴포넌트 커스터마이징 시 (@emotion/styled 사용) & 2. 일반 컴포넌트 스타일링 시 (styled-components 사용) 으로 구분하여 사용하기로 함.
// 현 프로젝트의 스타일링 기조는 styled-components로 진행하기로 하였고, MUI 컴포넌트 커스터마이징시에는 MUI프레임워크의 원칙에 따라 이때만 @emotion/styled을 사용하기로 함.

// => 2025/05/03 수정: styled-components와 @emotion/styled을 혼용하여 사용하는 것보다, @emotion/styled 만을 사용하여 스타일링하는 것이 더 일관성 있고 유지보수하기 쉬운 코드가 될 것 같음. 따라서, 모든 스타일링을 @emotion/styled로 통일하기로 함.

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