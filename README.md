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
- Backend: Vercel Serverless Functions
- API: OpenAI GPT API

## 로컬 개발 환경 설정

### 사전 요구사항

- Node.js 18.0.0 이상
- OpenAI API 키
- Vercel CLI (로컬에서 서버리스 함수 테스트용)

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

3. Vercel CLI 설치 (필수)
   ```bash
   npm install -g vercel
   ```

4. 환경 변수 설정
   - 루트 디렉토리에 `.env` 파일 생성
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

5. 개발 서버 실행
   ```bash
   npm run dev
   ```
   이 명령어는 `vercel dev`를 실행하여 프론트엔드와 API를 함께 제공합니다.

6. 브라우저에서 `http://localhost:3000` 접속

### 주의사항

- 이 프로젝트는 Vercel 서버리스 함수를 사용하기 때문에, 로컬 개발 시에도 Vercel CLI가 필요합니다.
- 순수 Vite 개발 서버가 필요한 경우 `npm run vite-dev`를 사용할 수 있지만, API 기능은 작동하지 않습니다.

## Vercel 배포 가이드

1. [Vercel](https://vercel.com)에 가입하고 GitHub 계정을 연결합니다.
2. 저장소를 Vercel로 가져오기(Import)합니다.
3. 다음 설정으로 프로젝트를 구성합니다:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. 환경 변수 설정:
   - `OPENAI_API_KEY`: OpenAI API 키
5. 배포를 진행합니다.

## 프로젝트 구조

```
/
├── api/              # Vercel 서버리스 함수
│   └── openai.js     # OpenAI API 프록시 엔드포인트
├── src/              # 프론트엔드 소스 코드
│   ├── App.tsx       # 메인 애플리케이션 컴포넌트
│   └── ...
└── vercel.json       # Vercel 배포 설정
```

## 작동 방식

1. 프론트엔드는 사용자 입력을 받아 `/api/openai` 서버리스 함수로 요청을 보냅니다.
2. 서버리스 함수는 환경 변수에 저장된 API 키를 사용하여 OpenAI API를 호출합니다.
3. 응답을 받아 프론트엔드로 반환합니다.

이 구조의 장점은 API 키가 클라이언트에 노출되지 않고 서버 측에서 안전하게 API 호출을 처리한다는 것입니다.

## 주의사항

- OpenAI API 키는 절대 공개 저장소에 커밋하지 않도록 주의하세요.
- Vercel 대시보드에서 환경 변수를 안전하게 설정하세요.
- 요금이 발생할 수 있는 API 사용량을 모니터링하세요.

## 라이선스

This project is licensed under the ISC License
