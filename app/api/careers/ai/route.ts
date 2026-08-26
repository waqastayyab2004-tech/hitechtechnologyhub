import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function isKeyConfigured() {
  const key = process.env.ANTHROPIC_API_KEY ?? ''
  return key.startsWith('sk-ant-') && key.length > 20
}

export async function POST(req: NextRequest) {
  if (!isKeyConfigured()) {
    return NextResponse.json({
      error: 'ANTHROPIC_API_KEY not configured. Add your real key to .env.local and restart the server.',
      setupRequired: true,
    }, { status: 503 })
  }

  const body = await req.json()
  const { action, jobDescription, resume, interviewType } = body

  try {
    let prompt = ''

    if (action === 'match') {
      prompt = `You are a professional career coach and ATS expert.

Given the job description and resume below, provide a detailed match analysis.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

Respond ONLY with valid JSON in this exact format:
{
  "score": <number 0-100>,
  "verdict": "<one sentence summary>",
  "matched": ["<skill or keyword>", ...],
  "missing": ["<skill or gap>", ...],
  "recommendations": ["<actionable tip>", "<actionable tip>", "<actionable tip>"]
}`

    } else if (action === 'generate') {
      prompt = `You are an expert resume writer.

Given the job description and the candidate's current resume, generate a tailored, ATS-optimised resume in clean markdown.

JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME:
${resume}

Guidelines:
- Mirror key terms from the job description naturally
- Quantify achievements wherever possible
- Lead with a strong 2-sentence professional summary
- Keep it to 1-2 pages
- Use clean markdown with ## headers and bullet points
- Do NOT invent qualifications the candidate doesn't have

Respond with the full tailored resume in markdown only, no preamble.`

    } else if (action === 'interview') {
      const typeLabel = interviewType === 'technical' ? 'Technical' : interviewType === 'behavioural' ? 'Behavioural (STAR method)' : 'HR & General'
      prompt = `You are an expert interview coach.

Based on the job description below, generate 8 ${typeLabel} interview questions with concise answer guidance for each.

JOB DESCRIPTION:
${jobDescription}

Respond ONLY with valid JSON in this exact format:
{
  "questions": [
    {
      "question": "<interview question>",
      "hint": "<2-3 sentence guidance on how to answer well>"
    }
  ]
}`
    } else {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'anthropic--claude-4.5-sonnet',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text

    if (action === 'generate') {
      return NextResponse.json({ result: text })
    }

    // Parse JSON for match and interview
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (err) {
    console.error('AI API error:', err)
    return NextResponse.json({ error: 'AI request failed. Please try again.' }, { status: 500 })
  }
}
