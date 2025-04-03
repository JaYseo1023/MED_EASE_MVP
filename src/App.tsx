import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

// 환경 변수에서 OpenAI API 키를 가져올 수 없으므로 사용자에게 입력 받도록 합니다
const exampleTexts = {
  somzz: `불면증 디지털치료기기 솜즈(Somzz)
본 제품은 만성불면증 치료의 목적으로 설계된 소프트웨어 의료기기로, 실제 임상진료 현장의 표준치료인 불면증인지행동치료법 (CBT-I; Cognitive Behavioral Therapy for Insomnia)의 프로토콜 (자극조절법, 수면제한법, 수면습관교육법, 이완요법 및 인지치료법)을 모바일용 어플리케이션에 체계적인 알고리즘을 순차적으로 적용하여 구현되었다. 인지행동치료는 사고와 행동을 조절함으로써 증상을 개선시키는 정신치료요법이다. 인지치료는 불면과 관련된 역기능적 신념을 교정하여 건강한 수면 습관을 기를 수 있게 하고, 행동치료는 자극조절요법, 수면제한요법, 이완요법을 통해 수면의 질이 향상되도록 한다. 이 내용을 바탕으로 불면증 환자들에게 교육, 실시간 피드백, 행동중재 및 푸시알림 메시지 등을 6~9주간 제공하여 수면효율을 증가시키고 결과적으로 환자의 불면증을 개선한다.`
}

const loadingMessages = [
  "의학 용어를 쉬운 말로 바꾸는 중...",
  "어려운 말을 찾아서 풀어쓰는 중...",
  "교수님 말투 OFF, 친절한 설명 모드 ON...",
  "의사 선생님이 친절하게 설명하는 중...",
  "복잡한 내용을 쉽게 풀어쓰는 중..."
]

function LoadingIndicator() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length)
      setCurrentMessageIndex(randomIndex)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <div className="text-indigo-600 font-medium">{loadingMessages[currentMessageIndex]}</div>
      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full animate-progress"></div>
      </div>
    </div>
  )
}

function App() {
  const [inputText, setInputText] = useState('')
  const [transformedText, setTransformedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    setError('')
    console.log('API 요청 시작: /api/openai')

    try {
      const requestData = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: "user",
            content: `다음 설명을 10세 정도의 문해력 수준으로도 쉽게 이해할 수 있도록 최대한 쉽게 풀어 써 주세요.

아래 조건을 지켜 주세요:

- 핵심 개념과 의학적 의미를 유지해 주세요.
- 전문 용어나 생소한 표현은 가능한 한 쉽게 풀어 쓰고, 의미 전달이 중요한 경우에는 짧은 설명을 덧붙여 주세요.
- 필요한 경우 간단한 예시나 쉬운 비유를 사용해 이해를 도와 주세요. 단, 전체 흐름을 해치지 않도록 균형 있게 사용해 주세요.
- 자연스럽게 받아들일 수 있는 어조로, 의료인이 설명하듯 친절하고 차분하게 작성해 주세요.

다음 텍스트를 위 조건에 맞게 변환해주세요:
${inputText}`
          }
        ],
        temperature: 0,
        top_p: 1
      };
      
      console.log('API 요청 데이터 준비 완료');
      
      // 서버리스 함수 호출
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      console.log('API 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 오류 응답:', errorText);
        throw new Error(`서버 응답이 올바르지 않습니다. 상태 코드: ${response.status}`);
      }

      const data = await response.json();
      console.log('API 응답 성공');
      setTransformedText(data.choices[0].message.content || '');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다'
      setError(`텍스트 변환 중 오류가 발생했습니다: ${errorMessage}`)
      console.error('상세 오류:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (key: keyof typeof exampleTexts) => {
    setInputText(exampleTexts[key])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4">
            Med Ease
          </h1>
          <p className="text-lg text-gray-600">
            복잡한 의학 정보를 누구나 이해하기 쉽게
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="input-text" className="block text-sm font-medium text-gray-700">
                  쉽게 바꾸고 싶은 내용을 입력하세요
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleExampleClick('somzz')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    DTx Somzz 설명
                  </button>
                </div>
              </div>
              <textarea
                id="input-text"
                rows={8}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="여기에 텍스트를 입력하세요..."
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? '변환 중...' : '변환하기'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-6 flex justify-center">
              <LoadingIndicator />
            </div>
          )}

          {transformedText && !isLoading && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">변환 결과</h2>
              <div className="bg-gray-50 p-4 rounded-md prose max-w-none">
                <ReactMarkdown>{transformedText}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
