
## 🛠 기술 스택

### 🖥 Frontend: Kiosk Application
|Category|Technology|
|-|-|
|<div align="center">**On-Device AIoT Platform**</div>|<div align="center"><img src="https://img.shields.io/badge/RUBIK Pi 3-3253DC?style=for-the-badge&logo=sequelize&logoColor=white"> ➕ ![Raspberry Pi](https://img.shields.io/badge/-Raspberry_Pi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)<br><sup><strong>Rubik Pi: On-device AI / Raspberry Pi: Kiosk Controller</strong></sup></div>|
|<div align="center">**Voice AI**</div>|<div align="center">![Porcupine](https://img.shields.io/badge/Porcupine-Wake_Word-7727A9?style=for-the-badge&logo=picovoice&logoColor=white)<br>![Rhino](https://img.shields.io/badge/Rhino-SLU-5500AA?style=for-the-badge&logo=picovoice&logoColor=white)</div>|
|<div align="center">**Object Detection AI**</div>|<div align="center">![YOLOv8](https://img.shields.io/badge/YOLOv8-Quantized-000000?style=for-the-badge&logo=yolo&logoColor=white)</div>|
|<div align="center">**Hardware Controller**</div>|<div align="center">![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)</div>|  
|<div align="center">**Hardware**</div>|<div align="center">**🖥️ Touch Display / ⚙️ Linear Actuator**<br> **📷 Pi Camera Module 2 (IMX219)** </div>|  
|<div align="center">**IoT Communication**</div>|<div align="center">![Mosquitto](https://img.shields.io/badge/Mosquitto-MQTT_Broker-FF9900?style=for-the-badge&logo=eclipse&logoColor=white)</div>|
|<div align="center">**Frontend Framework**</div>|<div align="center">![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)</div>|
|<div align="center">**UI Framework**</div>|<div align="center">![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)</div>|
|<div align="center">**Programming Language**</div>|<div align="center">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</div>| 
|<div align="center">**Styling**</div>|<div align="center">![Emotion](https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <img src="https://img.shields.io/badge/Spring-000000?style=for-the-badge&logo=spring_creators&logoColor=white"> <img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=framer&logoColor=white"></div>|

<br>


## 🧩 프로젝트 개요
Barion: 스마트 배리어프리 키오스크 플랫폼에서 **라즈베리파이(Raspberry Pi)** 는 단순히 React 기반 Kiosk UI 출력 장치를 넘어서, 전체 키오스크 시스템을 제어하고, 다양한 하드웨어 및 AI 기능을 통합하는 중앙 제어 장치 역할을 수행한다.

<br>

## 📌 라즈베리파이의 역할
#### 1. 키오스크 UI 실행  
- 크로미움 브라우저를 이용하여 React 기반의 키오스크 앱을 키오스크 모드로 구동
- React 앱은 사용자와의 인터랙션(음성 명령, 주문 등)을 담당
- React앱 내에 Picovoice 기반 On-Device Voice Ai 음성 주문 시스템 도입: Wake word 및 Speech-to-Intent 엔진 연동

#### 2. 음성 입출력 디바이스 제어
- USB 마이크 및 블루투스 스피커 연동을 통해 사용자 음성 인식과 안내 음성 출력


#### 3. MQTT 기반 메시지 브로커 역할
- MQTT통신 체계의 주체: RubikPi에서 전송하는 감지 결과(휠체어 여부 등)를 수신하여 키오스크 앱에 전달
- Arduino 제어 명령(UP/DOWN)도 MQTT 통해 송수신
- 사용자의 키오스크 이용흐름에 맞게 MQTT통신 제어

#### 4. On-Device AI 및 IoT 연동
- On-Device AI 기반 휠체어 감지 연산은 RubikPi에서 수행되며, 라즈베리파이는 그 결과에 따라 실제 화면 제어 및 안내음 재생, 하드웨어 명령 전송을 수행
- IoT 구성 요소(아두이노, 액추에이터, L298N 등)와의 인터페이스 담당

<br>

## 📝 구성 요약

라즈베리파이는 키오스크 전체 흐름을 사용자 중심으로 통합 제어하는 디바이스로써,  
AI 연산을 담당하는 RubikPi, 제어 모듈인 Arduino, 사용자 인터페이스인 React 앱을 하나로 엮는 허브 역할을 한다.  

사용자 접근성 향상을 위해 시각적 UI뿐만 아니라 음성 명령 기반 조작을 지원한다.  

휠체어 사용자 접근 시 자동으로 시스템이 반응하고, 액추에이터 제어 및 인터페이스 안내가 이루어진다.  

<br />
