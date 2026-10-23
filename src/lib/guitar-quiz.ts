import { songById } from './guitar-catalogue'
import { guitarPresets } from './guitar-presets'
export const QUIZ_VERSION = 'v4'
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
  const preferred=shuffled(songById(id).neighbours)
  const fallback=shuffled(QUIZ_IDS.filter(other=>other!==id&&!preferred.includes(other)))
  return shuffled([id,...[...preferred,...fallback].slice(0,3)])
}
export function ordinal(value: number): string {
  const suffix=value%100>=11&&value%100<=13?'th':({1:'st',2:'nd',3:'rd'} as Record<number,string>)[value%10]||'th'
  return `${value}${suffix}`
}
export interface QuizQuestion { number:number; total:number; songId:string; options:string[] }
export interface QuizComparison { percentile:number|null; previousRuns:number; benchmarkRuns:number }
export interface QuizAnswerResult { songId:string; correct:boolean; score:number; complete:boolean; result:QuizComparison|null }
const apiBase=()=> (import.meta.env.PUBLIC_RUNBLOG_API_BASE_URL || (import.meta.env.DEV?'http://127.0.0.1:3000':'https://runny.russel.is-a.dev')).replace(/\/$/,'')
async function postQuiz(path:string,body:unknown,signal:AbortSignal):Promise<Record<string,unknown>> {
  const response=await fetch(`${apiBase()}/api/blogs/guitar/session${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal})
  if(!response.ok)throw new Error('Could not save quiz action')
  const result=await response.json()
  if(!result||typeof result!=='object')throw new Error('Invalid quiz response')
  return result
}
function question(value:unknown):QuizQuestion {
  const q=value as QuizQuestion
  if(!q||!Number.isInteger(q.number)||q.number<1||q.number>QUIZ_LENGTH||q.total!==QUIZ_LENGTH||!QUIZ_IDS.includes(q.songId)||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||!q.options.includes(q.songId)||!q.options.every(id=>songById(id)))throw new Error('Invalid question')
  return q
}
export async function startQuizSession(signal:AbortSignal) {
  const result=await postQuiz('',{},signal)
  if(typeof result.runId!=='string'||!/^[0-9a-f-]{36}$/i.test(result.runId)||result.version!==QUIZ_VERSION)throw new Error('Invalid quiz session')
  return {runId:result.runId,question:question(result.question)}
}
export async function nextQuizQuestion(runId:string,questionNumber:number,signal:AbortSignal) {
  const result=await postQuiz(`/${encodeURIComponent(runId)}/next`,{questionNumber},signal)
  return question(result.question)
}
export async function recordQuizAnswer(runId:string,questionNumber:number,answerId:string,signal:AbortSignal):Promise<QuizAnswerResult> {
  const value=await postQuiz(`/${encodeURIComponent(runId)}/answer`,{questionNumber,answerId},signal)
  if(typeof value.correct!=='boolean'||typeof value.complete!=='boolean'||typeof value.songId!=='string'||!QUIZ_IDS.includes(value.songId)||!Number.isInteger(value.score)||(value.score as number)<0||(value.score as number)>QUIZ_LENGTH)throw new Error('Invalid answer result')
  if(value.complete){
    const result=value.result as QuizComparison
    if(!result||!Number.isInteger(result.previousRuns)||result.previousRuns<0||!Number.isInteger(result.benchmarkRuns)||result.benchmarkRuns<0||!(result.percentile===null||(Number.isInteger(result.percentile)&&result.percentile>=0&&result.percentile<=100)))throw new Error('Invalid comparison')
  }
  return value as unknown as QuizAnswerResult
}
