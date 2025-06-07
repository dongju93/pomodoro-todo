import js from "@eslint/js"; // ESLint 기본 recommended 룰셋
import tsEslint from "@typescript-eslint/eslint-plugin"; // TypeScript lint 규칙
import tsParser from "@typescript-eslint/parser"; // TypeScript parser
import react from "eslint-plugin-react"; // React-specific lint 규칙
import reactHooks from "eslint-plugin-react-hooks"; // React Hooks lint 규칙
import reactRefresh from "eslint-plugin-react-refresh"; // Vite React Fast Refresh 안전성 체크
import simpleImportSort from "eslint-plugin-simple-import-sort"; // import/export 자동 정렬
import globals from "globals"; // 브라우저 + ES2021 글로벌 변수 정의

export default [
    { ignores: ["dist", "node_modules"] }, // lint 검사에서 빌드 결과물과 라이브러리 폴더 제외
    {
        files: ["**/*.{js,jsx}"], // JS/JSX 파일용 설정
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "no-unused-vars": [
                "error",
                { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
            ],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["**/*.{ts,tsx}"], // TS/TSX 파일용 설정
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
                projectService: true,
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "@typescript-eslint": tsEslint,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...tsEslint.configs.recommended.rules,
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
            ],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
