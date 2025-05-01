## pomodoro-todo

### ✅ 핵심 목적
- CRUD 기반의 상태관리 학습
- React 컴포넌트 분리 연습
- 타이머 구현 (setInterval, useEffect)
- 로컬스토리지 사용
- Vite 기반의 빠른 개발 환경 익숙해지기

---

## 🧩 주요 기능

### 1. **To-Do 관리**
- 할 일 추가 / 수정 / 삭제
- 완료 상태 체크
- 태그 필터링 기능 (e.g. `Work`, `Study`, `Personal`)
- 마감일 설정 및 정렬

### 2. **Pomodoro 타이머**
- 기본 세션: 25분 / 쉬는 시간: 5분
- 시작 / 일시정지 / 리셋
- 작업 선택 후 타이머 시작 가능
- 세션 완료 시 사운드 알림

### 3. **상태 저장**
- 로컬스토리지 사용하여 페이지 새로고침 후에도 유지

---

## 🎨 UI/UX 요구사항

### 🌗 기본 UI
- 다크모드 / 라이트모드 토글
- 모바일 반응형 레이아웃 (TailwindCSS 추천)
- 카드 기반 UI (할 일 항목 + 타이머)

### 🧭 UX 흐름
- 직관적인 작업 흐름: "할 일 선택 → 타이머 실행"
- 할 일 필터링 및 정렬 기능
- 진행 중인 작업 강조 표시

---

## 🛠️ 기술 스택

- **Vite + React**
- **JavaScript**
- **TailwindCSS** (스타일링)
- **zustand** (전역 상태관리)
- **react-icons** (아이콘)
- **React Router** (페이징)

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
