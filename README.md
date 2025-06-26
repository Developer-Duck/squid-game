
# 🦑 Squid Game Interactive Web

![Squid Game Logo](./src/images/Squid-Game-Logo.png)

**Squid Game Interactive Web**는 오징어 게임의 시각 요소(인형, 프론트맨, 배경 등)를 활용해 웹 기반 인터랙션을 구현한 프로젝트입니다.  
React와 Three.js를 기반으로 하여 3D 오브젝트(GLTF 파일)를 화면에 출력하며, 간단한 애니메이션/콘텐츠 구성을 제공합니다.

---

## 📁 프로젝트 구조

```
squid-game-master/
├── public/
│   ├── index.html
│   └── squid_game_doll/  ← GLTF 3D 모델 및 텍스처
├── src/
│   ├── App.js
│   ├── content/          ← 콘텐츠 컴포넌트 (ex. frontman, 인형 등)
│   ├── images/           ← 배경/캐릭터 이미지
│   ├── menu/             ← 메뉴 UI
│   ├── styles/           ← CSS 분할
│   └── video/            ← 비디오 컴포넌트
├── package.json
└── README.md
```

---

## 🚀 실행 방법

1. **패키지 설치**

```bash
npm install
```

2. **로컬 서버 실행**

```bash
npm start
```

웹 브라우저에서 [`http://localhost:3000`](http://localhost:3000)으로 접속하여 프로젝트를 확인할 수 있습니다.

---

## 🧩 사용 기술

- React
- Three.js
- WebGL / GLTF Loader
- CSS 모듈화 구조

---

## 🎮 주요 기능

- 🧍‍♀️ 3D GLTF 인형 모델 시각화 (`scene.gltf`)
- 🖼️ 이미지 기반 UI/UX 구성
- 🎥 비디오 컴포넌트 구성
- 🎨 스타일이 분리된 구조적 설계

---

## 📸 스크린샷

> (원한다면 `src/images/`에 있는 이미지를 사용해서 넣을 수 있습니다.)

---

## 📄 라이센스

- 3D 모델(`scene.gltf`)은 `license.txt` 참조  
- 그 외 코드는 자유롭게 수정 및 사용 가능 (MIT 등 라이센스 명시 가능)
