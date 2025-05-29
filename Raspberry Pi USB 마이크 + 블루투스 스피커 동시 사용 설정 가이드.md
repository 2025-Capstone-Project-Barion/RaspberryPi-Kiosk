# Raspberry Pi USB 마이크 + 블루투스 스피커 동시 사용 설정 가이드

## 1. 환경

- Raspberry Pi OS (PipeWire 기반 PulseAudio 사용)
- 블루투스 스피커: BTS-240
- USB 마이크 연결
- RealVNC 원격 접속 및 로컬 GUI 세션 병행

---

## 2. 문제 상황

- RealVNC 원격 터미널에서 `pactl set-card-profile` 명령어 권한 오류 발생
- 블루투스 스피커 프로필 변경 실패
- USB 마이크와 블루투스 스피커 동시 사용 불가 문제

---

## 3. 문제 원인 분석

- PulseAudio/PipeWire는 로컬 GUI 세션과 연동됨
- 원격 VNC 세션은 별도의 세션으로 권한 문제 발생
- `/run/user/1000` 디렉터리 권한 및 ACL 문제로 `pactl` 명령어 실패

---

## 4. 해결 과정

### 4.1 로컬 GUI 세션 환경 준비

- 라즈베리파이에 마우스, 키보드, 모니터 직접 연결
- RealVNC는 종료하거나 실제 로그인 세션으로 접속 변경 권장

### 4.2 `/run/user/1000` 권한 및 ACL 수정

```bash
sudo setfacl -x u:vnc /run/user/1000
sudo chmod 700 /run/user/1000
sudo chown pi:pi /run/user/1000
sudo reboot
```

### 4.3 블루투스 카드 확인

```
bash


복사
pactl list cards short
```

- `bluez_card.C5_C8_0D_19_58_B9` 확인

### 4.4 블루투스 스피커 프로필 선택

- `pavucontrol`(PulseAudio 볼륨 조절 툴) 사용 권장
- 프로필 선택 옵션:
  - `High Fidelity Playback (A2DP Sink, codec SBC)`: 고음질 출력 전용
  - `Headset Head Unit (HSP/HFP, codec mSBC)`: 스피커 출력 + 마이크 입력(음질 낮음)

### 4.5 기본 출력 장치 설정

```
bash


복사
pactl set-default-sink bluez_sink.C5_C8_0D_19_58_B9.a2dp_sink
```

### 4.6 USB 마이크 기본 입력 장치 설정

```
bash복사pactl list sources short
pactl set-default-source <USB 마이크 이름>
```

### 4.7 `pavucontrol`로 출력 및 입력 볼륨 조절 및 상태 확인

---

## 5. 결과

- USB 마이크 정상 입력 가능
- BTS-240 블루투스 스피커에서 고음질 출력 가능 (프로필에 따라 다름)
- 원격 VNC 세션이 아닌 로컬 GUI 세션에서 명령어 정상 작동

---

## 6. 추가 팁

- 사용하지 않는 다른 출력 장치는 음소거 또는 비활성화 권장
- PulseAudio/ PipeWire 환경 이해 필요 (WirePlumber가 프로필 관리 담당)
- 필요시 부팅 시 자동 프로필 설정 스크립트 작성 가능

---

## 7. 주요 명령어 요약

```
bash복사# 블루투스 카드 목록 확인
pactl list cards short

# 프로필 변경 (예: A2DP Sink)
pactl set-card-profile bluez_card.C5_C8_0D_19_58_B9 a2dp_sink

# 기본 출력 장치 설정
pactl set-default-sink bluez_sink.C5_C8_0D_19_58_B9.a2dp_sink

# 입력 장치 목록 확인
pactl list sources short

# 기본 입력 장치 설정 (USB 마이크)
pactl set-default-source <USB 마이크 이름>

# PulseAudio 볼륨 조절 GUI 실행
pavucontrol
```

## <초기 세팅>: `pavucontrol` 혹은 좌측상단 오디오&비디오클릭

#### -  `마이크 볼륨`은 `100`이 딱 적당하다

![image](https://github.com/user-attachments/assets/764f119f-0830-4639-ab16-dcd318d11256)

![image](https://github.com/user-attachments/assets/fb7a6751-f336-4225-8414-6232c73153ca)

![image](https://github.com/user-attachments/assets/9691a395-1dab-463e-aad7-92d4ca7b8fe3)

![image](https://github.com/user-attachments/assets/1a65a28d-61ce-415f-8fd0-8a1c7e9ba6a3)

![image](https://github.com/user-attachments/assets/467d506d-e995-44d6-8d86-bb65645e41ca)

