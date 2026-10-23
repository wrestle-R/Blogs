import { songById } from './guitar-catalogue'
export const QUIZ_IDS = ['shape', 'blue', 'dandelions', 'snowman', '505'] as const
export interface QuizRun { id: string; name: string; score: number; date: number }
export const QUIZ_STORAGE = 'russel-guitar-quiz-v1'
export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]] }
  return result
}
export function readRuns(raw: string | null): QuizRun[] {
  try {
    const data: unknown = JSON.parse(raw || '[]')
    if (!Array.isArray(data)) return []
    return data.filter((r): r is QuizRun => r && typeof r.id === 'string' && typeof r.name === 'string' && r.name.length <= 24 && Number.isInteger(r.score) && r.score >= 0 && r.score <= 5 && Number.isFinite(r.date)).slice(-100)
  } catch { return [] }
}
// Midrank: half credit for ties. Compare only with previous completed attempts.
export function percentile(score: number, runs: QuizRun[]): number | null {
  if (!runs.length) return null
  return Math.round(100 * (runs.filter(r => r.score < score).length + runs.filter(r => r.score === score).length / 2) / runs.length)
}

export function answerOptions(id: string): string[] {
  const similar = songById(id).neighbours
  return shuffled([id,...shuffled(similar).slice(0,3)])
}
