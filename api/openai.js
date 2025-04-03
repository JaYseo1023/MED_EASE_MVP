export default async function handler(req, res) {
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

    res.status(200).json(data);
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
} 