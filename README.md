# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Med Ease

의학 용어와 설명을 누구나 이해하기 쉬운 언어로 변환해주는 애플리케이션입니다.

## 주요 기능

- 복잡한 의학 용어와 설명을 쉬운 언어로 변환
- 전문 용어나 생소한 표현에 대한 설명 제공
- 친절하고 자연스러운 어조로 정보 전달
- OpenAI API를 활용한 고품질 텍스트 변환

## 기술 스택

- Frontend: React, TypeScript, Vite, TailwindCSS
- API: OpenAI GPT API
- 배포: Vercel Serverless Functions

## 로컬 개발 환경 설정

### 사전 요구사항

- Node.js 18.0.0 이상
- OpenAI API 키

### 설치 및 실행 방법

1. 저장소 클론하기
   ```bash
   git clone https://github.com/yourusername/med-ease.git
   cd med-ease
   ```

2. 의존성 패키지 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   - 루트 디렉토리에 `.env` 파일 생성
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. 개발 서버 실행
   ```bash
   npm run dev
   ```

5. 브라우저에서 `http://localhost:5173` 접속

## Vercel 배포 가이드

1. [Vercel](https://vercel.com)에 가입하고 GitHub 계정을 연결합니다.
2. 저장소를 Vercel로 가져오기(Import)합니다.
3. 환경 변수 설정:
   - `OPENAI_API_KEY`: OpenAI API 키
4. 배포를 진행합니다.

이 프로젝트는 Vercel Serverless Functions를 사용하여 API 요청을 처리합니다. 별도의 백엔드 서버 구성이 필요하지 않습니다.

## 주의사항

- OpenAI API 키는 절대 공개 저장소에 커밋하지 않도록 주의하세요.
- 요금이 발생할 수 있는 API 사용량을 모니터링하세요.

## 라이선스

This project is licensed under the ISC License
