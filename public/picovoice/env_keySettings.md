# 라즈베리파이 키오스크 Picovoice 설정 가이드

이 문서는 라즈베리파이 키오스크 프로젝트에서 Picovoice(Porcupine 및 Rhino) 음성 인식 기능 설정에대한 메뉴얼이다.

## 목차

1. [Picovoice API 키 설정](#1-picovoice-api-키-설정)
2. [디렉토리 구조 및 파일 설명](#2-디렉토리-구조-및-파일-설명)
3. [커스텀 모델 적용 방법](#3-커스텀-모델-적용-방법)

## 1. Picovoice API 키 설정

### API 키 발급받기

1. [Picovoice Console](https://console.picovoice.ai/)에 가입/로그인
2. 'AccessKey' 메뉴로 이동하여 새 키 생성
3. 생성된 키를 복사

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 API 키를 설정한다.

```properties
# Picovoice API 키 (음성 인식 기능에 필요)
REACT_APP_PICOVOICE_API_KEY="여기에 발급받은 키 입력"
```

## 2. 디렉토리 구조 및 파일 설명

프로젝트 내 Picovoice 관련 파일은 다음과 같이 구성되어 있습니다:

```
/public/picovoice/
├── Porcupine/                 # Porcupine관련 디렉터리
│   ├── keyword/               # 웨이크워드 키워드 디렉토리
│   │   └── Hey-Barry-on_en_wasm_v3_0_0.ppn  # 웨이크워드 키워드 파일
│   └── model/                 # Porcupine 모델 디렉토리
│       └── porcupine_params.pv              # Porcupine 모델 파일
└── Rhino/                     # Rhino관련 디렉터리
    ├── context/               # 음성 명령 컨텍스트 디렉토리
    │   └── rhino_ko_wasm_v3_0_0.rhn         # 한국어 음성 명령 컨텍스트 파일
    ├── model/                 # Rhino 모델 디렉토리
    │   └── rhino_params_ko.pv               # 한국어 Rhino 모델 파일
    └── RhinoTrainer.yml       # Rhino 학습 파일
```

### 주요 파일 설명

- **Hey-Barry-on_en_wasm_v3_0_0.ppn**: "헤이 배리온" 웨이크워드를 인식하기 위한 키워드 파일(English)
- **porcupine_params.pv**: Porcupine 웨이크워드 감지 모델 파일(English용 엔진이다)
- **rhino_ko_wasm_v3_0_0.rhn**: 한국어 음성 명령을 인식하기 위한 컨텍스트 파일(Korean)
- **rhino_params_ko.pv**: 한국어 Rhino 음성 명령 인식 모델 파일(Korean용 엔진이다)
- **RhinoTrainer.yml**: 음성 명령 모델 학습을 위한 설정 파일 (메뉴, 카테고리, 명령어 등 정의)

## 3. 커스텀 모델 적용 방법

### 웨이크워드 키워드 변경 (선택사항)

1. [Picovoice Console](https://console.picovoice.ai/)에서 새 웨이크워드 키워드 생성
2. 생성된 `.ppn` 파일을 `/public/picovoice/Porcupine/keyword/` 디렉토리에 저장
3. `VoiceCommandSystem.js` 파일에서 다음 부분을 수정:

```javascript
// Porcupine 웨이크워드 키워드 설정
const porcupineKeyword = {
  publicPath: '/picovoice/Porcupine/keyword/[새로운_키워드_파일_이름].ppn',
  label: '[새로운_웨이크워드_이름]',
};
```

### 음성 명령 컨텍스트 변경/업데이트

1. **명령어 수정**: `/public/picovoice/Rhino/RhinoTrainer.yml` 파일을 수정
2. **컨텍스트 재학습**:
   - Picovoice Console에서 수정된 YML 파일을 업로드
   - 컨텍스트 학습 후 새 `.rhn` 파일 다운로드
3. **컨텍스트 적용**: 다운로드한 `.rhn` 파일을 `/public/picovoice/Rhino/context/` 디렉토리에 저장
4. **경로 업데이트**: 필요한 경우 `VoiceCommandSystem.js` 파일에서 경로 수정:

```javascript
// Rhino 컨텍스트 설정
const rhinoContext = {
  publicPath: '/picovoice/Rhino/context/[새로운_컨텍스트_파일_이름].rhn',
};
```

## 웨이크워드 선택 근거

현재 사용 중인 웨이크워드 "Hey Barry on"은 다음과 같은 이유로 선택되었다:

1. **인식률**: 영어 및 한글식 발음 모두에서 우수한 인식률을 보임
2. **브랜드 연관성**: "Barry"는 브랜드명 "Barion"과 발음이 유사함
3. **오탐 방지**: 일반적인 대화에서 잘 나오지 않는 단어 조합으로 오탐을 방지함

자세한 내용은 `/public/picovoice/porcupine/accuracy.md` 문서를 참조

## 참고사항

- Porcupine은 웨이크워드("헤이 베리") 감지를 담당
- Rhino는 음성 명령 인식을 담당(SLU, Speech-To-Intent)
- 각 모델 및 키워드/컨텍스트 파일은 해당하는 디렉토리에 정확히 위치해야 함
- 모든 파일 경로는 `/public` 기준으로 상대 경로 설정
- **model디렉터리안에 위치하는 각 엔진파일은 해당 Porcupine Rhino모델들이 학습된 언어와 동일한 언어 엔진들 공식사이트에서 다운받아 위치시켜야한다. **
