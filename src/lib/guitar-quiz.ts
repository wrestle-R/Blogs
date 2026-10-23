import { songById } from './guitar-catalogue'
import { guitarPresets } from './guitar-presets'
export const QUIZ_VERSION = 'v3'
export const QUIZ_LENGTH = 10
export const QUIZ_IDS = guitarPresets.filter(preset=>preset.id!=='endurance').map(preset=>preset.id)
export interface QuizAnswer { songId: string; answerId: string }
export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]] }
  return result
}
export function newQuestions(): string[] { return shuffled(QUIZ_IDS).slice(0,QUIZ_LENGTH) }
export function answerOptions(id: string): string[] {
  return shuffled([id,...shuffled(songById(id).neighbours).slice(0,3)])
}
export function ordinal(value: number): string {
  const suffix=value%100>=11&&value%100<=13?'th':({1:'st',2:'nd',3:'rd'} as Record<number,string>)[value%10]||'th'
  return `${value}${suffix}`
}
export async function submitQuiz(runId: string, answers: QuizAnswer[], signal: AbortSignal): Promise<{percentile:number|null;previousRuns:number}> {
  const base=(import.meta.env.PUBLIC_RUNBLOG_API_BASE_URL || (import.meta.env.DEV?'http://127.0.0.1:3000':'https://runny.russel.is-a.dev')).replace(/\/$/,'')
  const response=await fetch(`${base}/api/blogs/guitar/result`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId,version:QUIZ_VERSION,answers}),signal})
  if(!response.ok)throw new Error('Could not save quiz result')
  const result=await response.json()
  if(!Number.isInteger(result.previousRuns)||result.previousRuns<0 || !(result.percentile===null || (Number.isFinite(result.percentile)&&result.percentile>=0&&result.percentile<=100)))throw new Error('Invalid percentile response')
  return result
}
