import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 환경변수 로드를 위한 __dirname 설정 (ESM에서는 __dirname이 기본적으로 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 환경변수 로드
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const CORS_ORIGINS = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

// CORS 설정
app.use(cors({
  origin: CORS_ORIGINS,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 기본 경로
app.get('/', (req, res) => {
  res.send('Med Ease API 프록시 서버 실행 중');
});

// 서버 상태 확인을 위한 간단한 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OpenAI API로 요청을 프록시합니다
app.post('/api/openai', async (req, res) => {
  // API 키 확인
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_api_key_here') {
    return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: req.body.model || 'gpt-4o-mini',
        messages: req.body.messages,
        temperature: req.body.temperature || 0,
        top_p: req.body.top_p || 1
      })
    });
    
    const data = await response.json();
    
    // API 에러 처리
    if (data.error) {
      console.error('OpenAI API 응답 오류:', data.error);
      return res.status(500).json({ error: `OpenAI API 오류: ${data.error.message}` });
    }
    
    res.json(data);
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
  console.log(`허용된 CORS 출처: ${CORS_ORIGINS.join(', ')}`);
}); 