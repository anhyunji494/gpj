# 🚀 GPJ (Great Project Journey)

## 📋 목차

- [소개](#소개)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [개발](#개발)

## 🌟 소개

GPJ는 React Native 클라이언트와 Express 서버로 구성된 풀스택 모바일 애플리케이션입니다.

## 📂 프로젝트 구조

```bash
.
├── .vscode/
├── client/ # React Native 앱
├── server/ # Express 서버
│ ├── node_modules/
│ ├── Dockerfile
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
├── docker-compose.yml
└── README.md
```

## 🚀 시작하기

## 🛠️ 개발 환경 요구사항

- Node.js: `v20.15.1`
- Java: `17.0.12 2024-07-16 LTS`
- Android SDK: `API 35 (Android 13)`
- React Native: `0.75.2`
- Android Studio:

```
Koala | 2024.1.1
  Build #AI-241.15989.150.2411.11948838, built on June 11, 2024
```

- npm: `10.7.0`
- Docker: `27.1.1, build 6312585` (서버 배포용)

주요 라이브러리:

- Express: `^4.19.2`

추가 정보:

- Runtime version: `17.0.10+0-11609105 amd64`
- VM: `OpenJDK 64-Bit Server VM by JetBrains s.r.o.`

### 설치

1. 저장소 클론:

```bash
   git clone https://github.com/your-username/gpj.git
   cd gpj
```

2. 클라이언트 종속성 설치:

```bash
   cd client
   npm install
```

3.  서버 종속성 설치:

```bash
   cd ../server
   npm install
```

## 🔐 환경 변수 설정

### 클라이언트 (.env 파일)

`client/` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
API_URL=http://localhost:3000
```

### 서버 (.env 파일)

`server/` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
PORT=3000
DATABASE_URL=mongodb://localhost:27017/gpj
```

⚠️ `.gitignore` 파일에 `.env`를 추가하여 환경 변수가 버전 관리에 포함되지 않도록 주의하세요.

## 💻 개발

### 안드로이드 에뮬레이터 설정 및 실행

1. Android Studio 실행
2. 상단 메뉴에서 "Tools" > "Device Manager" 선택
3. "Create Device" 버튼 클릭
4. 원하는 기기 선택 (예: Pixel 4)
5. 시스템 이미지 선택 (API 35 권장)
6. 에뮬레이터 이름 지정 후 "Finish" 클릭

### 클라이언트 실행

1. 에뮬레이터 실행:

   - Android Studio의 Device Manager에서 생성한 에뮬레이터 실행
   - 또는 명령줄에서 다음 명령어 실행:
     ```bash
     emulator -avd [에뮬레이터_이름]
     ```

2. React Native 앱 실행:

```bash
 cd client
 npx react-native run-android
```

3. 개발 서버가 자동으로 시작되지 않은 경우, 새 터미널 창에서:

```bash
npx react-native start
```

### 클라이언트 실행

```bash
cd server
npm run dev
```

### 문제 해결

- 빌드 오류 발생 시

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

- Metro 서버 재시작

```bash
npx react-native start --reset-cache
```

- 애뮬레이터에서 개발자 메뉴 열기
  - Windows/Linux: `Ctrl + M`
  - macOS: `Cmd + M`
