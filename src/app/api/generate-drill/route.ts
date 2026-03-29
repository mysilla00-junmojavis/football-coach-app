import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { purposes, duration, minPlayers, maxPlayers, difficulty } = await req.json()

  const difficultyLabel = difficulty === 'easy' ? '쉬움' : difficulty === 'hard' ? '어려움' : '보통'

  const prompt = `당신은 전문 축구 코치입니다. 아래 조건에 맞는 축구 훈련 드릴을 한국어로 작성해주세요.

조건:
- 훈련 목적: ${purposes.join(', ')}
- 소요시간: ${duration}분
- 참여 인원: ${minPlayers}~${maxPlayers}명
- 난이도: ${difficultyLabel}

다음 형식으로 정확히 답변해주세요 (JSON):
{
  "name": "드릴 이름 (간결하게)",
  "description": "훈련 방법 설명 (준비물, 진행 방법, 규칙, 코칭 포인트 포함, 3~5문장)",
  "equipment": "필요한 장비 (쉼표로 구분)"
}`

  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5'),
      prompt,
    })

    const json = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())
    return NextResponse.json(json)
  } catch {
    return NextResponse.json({ error: 'AI 생성 실패' }, { status: 500 })
  }
}
