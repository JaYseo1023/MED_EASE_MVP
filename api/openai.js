export default async function handler(req, res) {
  // 디버깅용 - API 호출 시 정보 로깅
  console.log('API 호출 받음', {
    method: req.method,
    headers: req.headers,
    body: req.body ? 'Body 있음' : 'Body 없음'
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않은 메서드입니다. POST만 가능합니다.' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_api_key_here') {
    return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다.' });
  }

  try {
    const {
      model = 'gpt-4o-mini',
      messages,
      temperature = 0,
      top_p = 1
    } = req.body;

    console.log('OpenAI API 요청 준비:', { model, messagesCount: messages?.length });

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        top_p
      })
    });

    const data = await openaiResponse.json();

    if (data.error) {
      console.error('OpenAI API 응답 오류:', data.error);
      return res.status(500).json({ error: `OpenAI API 오류: ${data.error.message}` });
    }

    console.log('OpenAI API 응답 성공');
    res.status(200).json(data);
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
} 