import Router from './routes/Router';
import { VoiceCommandProvider } from './components/VoiceCommand/VoiceCommandContext';
import VoiceCommandSystem from './components/VoiceCommand/VoiceCommandSystem';
import { GlobalStyles } from './styles/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MqttProvider } from './context/MqttContext';
// MUI v5부터는 기본 스타일링 엔진을 Emotion으로 지정하였기에, styled component가 아닌 Emotion을 사용하여 스타일링을 해줘야한다. 현 프로젝트의 css 프레임워크를 styled-components에서 Emotion으로 migration하고자한다.
// reference: https://velog.io/@minju1009/Styled-Components-with-MUI

// FrontPage 컴포넌트: 시작화면으로, 정적 스타일 및 애니메이션 성능을 위해 CSS 모듈을 FrontPage 컴포넌트에서만 사용하기로 하자.
// GlobalStyles.js: 전역 스타일 설정<일반 HTML 요소들의 폰트 설정> (@emotion/react의 Global 컴포넌트 사용)
// 현재 이 App.js: MUI 컴포넌트들의 테마(폰트) 설정(Typography, Button 등)

// MUI 컴포넌트들의 폰트
const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* MQTT Provider 추가 - 전체 앱에 MQTT 통신 기능 제공 */}
      <MqttProvider>
        {/* 음성 명령 시스템 전역 상태 관리를 위한 Provider */}
        <VoiceCommandProvider>
          <GlobalStyles />
          <Router />
          {/* 음성 명령 시스템 - 전체 앱에서 활성화 */}
          <VoiceCommandSystem />
        </VoiceCommandProvider>
      </MqttProvider>
    </ThemeProvider>
  );
}

export default App;
