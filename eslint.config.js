import js from "@eslint/js"; // ESLint 기본 recommended 룰셋
import react from "eslint-plugin-react"; // React-specific lint 규칙
import reactHooks from "eslint-plugin-react-hooks"; // React Hooks lint 규칙
import reactRefresh from "eslint-plugin-react-refresh"; // Vite React Fast Refresh 안전성 체크
import simpleImportSort from "eslint-plugin-simple-import-sort"; // import/export 자동 정렬
// import tailwindcss from "eslint-plugin-tailwindcss"; // Tailwind className 검사
import globals from "globals"; // 브라우저 + ES2021 글로벌 변수 정의

export default [
    { ignores: ["dist", "node_modules"] }, // lint 검사에서 빌드 결과물과 라이브러리 폴더 제외
    {
        files: ["**/*.{js,jsx,ts,tsx}"], // JS/JSX/TS/TSX 파일에만 적용
        languageOptions: {
            ecmaVersion: "latest", // 최신 ECMAScript 문법 지원
            sourceType: "module", // ES Modules 모드
            globals: {
                ...globals.browser, // window, document 등 브라우저 글로벌 변수 허용
                ...globals.es2021, // ES2021 글로벌 객체 추가 (ex. Promise.allSettled)
            },
            parserOptions: {
                ecmaFeatures: { jsx: true }, // JSX 문법 파싱 활성화
            },
        },
        plugins: {
            react, // react 플러그인 등록
            "react-hooks": reactHooks, // react-hooks 플러그인 등록
            "react-refresh": reactRefresh, // react-refresh 플러그인 등록
            // tailwindcss, // tailwindcss 플러그인 등록
            "simple-import-sort": simpleImportSort, // import 정렬 플러그인 등록
        },
        rules: {
            ...js.configs.recommended.rules, // JS 기본 추천 규칙 적용
            ...react.configs.recommended.rules, // React 추천 규칙 적용
            ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
            "no-unused-vars": [
                "error",
                { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
            ], // 사용되지 않는 변수 경고, 단 _로 시작하는 변수는 허용
            "no-console": ["warn", { allow: ["warn", "error"] }], // console.log 금지, console.warn/error는 허용
            "no-debugger": "warn", // debugger 구문 경고
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ], // Fast Refresh를 깨지 않게 export 제한
            // "tailwindcss/no-custom-classname": "off", // tailwind className 직접 지정 제한 해제
            "simple-import-sort/imports": "error", // import 정렬 필수
            "simple-import-sort/exports": "error", // export 정렬 필수
            "react/react-in-jsx-scope": "off", // React 17+에서는 JSX에 React import 필요 없음
        },
        settings: {
            react: {
                version: "detect", // 설치된 react 버전 자동 감지
            },
        },
    },
];
