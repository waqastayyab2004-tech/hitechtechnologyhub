export async function onRequestPost(context) {
  const { request, env } = context

  const apiKey = env.ANTHROPIC_API_KEY
  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    return json({ error: 'ANTHROPIC_API_KEY not configured', setupRequired: true }, 503)
  }

  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid request body' }, 400) }

  const { action, jobDescription, resume, interviewType } = body

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
    return json({ error: 'Unknown action' }, 400)
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return json({ error: `Anthropic API error: ${res.status}` }, 500)
    }

    const data = await res.json()
    const text = data.content?.[0]?.text ?? ''

    if (action === 'generate') {
      return json({ result: text })
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return json({ error: 'Could not parse AI response' }, 500)
    const parsed = JSON.parse(jsonMatch[0])
    return json(parsed)

  } catch (err) {
    return json({ error: 'AI request failed. Please try again.' }, 500)
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
