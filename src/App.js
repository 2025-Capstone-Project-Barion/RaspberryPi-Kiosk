import React from 'react';

import Router from './routes/Router';
import { GlobalStyles } from './styles/Menu/GlobalStyles';

// MUI v5부터는 styled component가 아닌 Emotion을 사용하여 스타일링을 해줘야하지만, 현 프로젝트의 css 프레임워크를 styled-components로 정하였으므로 @mui/styled-engine이 아닌 styled-components를 사용하고자한다.  
// MUI와 styled-components를 함께 사용할 때는 <StyledEngineProvider injectFirst>로 감싸줘야 styled-components 문법을 사용할 수 있다.

// MUI v5는 기본적으로 @emotion을 스타일링 엔진으로 사용하지만,StyledEngineProvider를 사용하면 MUI가 styled - components를 스타일링 엔진으로 사용하도록 강제할 수 있기때문.

// reference: https://velog.io/@minju1009/Styled-Components-with-MUI

// import { StyledEngineProvider } from '@mui/styled-engine';

function App() {
  return (
    <div className="App">
      {/* <StyledEngineProvider injectFirst> */}
      <GlobalStyles />
      <Router />
      {/* </StyledEngineProvider> */}
    </div>
  );
}

export default App;
