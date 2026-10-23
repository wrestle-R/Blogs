import { describe, it, expect } from 'vitest'
import { percentile, readRuns, shuffled, QUIZ_IDS, type QuizRun } from '../../src/lib/guitar-quiz'
import { thronesIntro, guitarPresets } from '../../src/lib/guitar-presets'
const runs = [0,2,2,4].map((score,i):QuizRun=>({id:String(i),name:'Player',score,date:1}))
describe('quiz results',()=>{
  it('does not invent a percentile for a first run',()=>expect(percentile(4,[])).toBeNull())
  it('uses midranks for tied previous results',()=>{
    expect(percentile(2,runs)).toBe(50)
    expect(percentile(0,runs)).toBe(13)
    expect(percentile(5,runs)).toBe(100)
  })
  it('ignores corrupt or invalid local history',()=>{
    expect(readRuns('broken')).toEqual([])
    expect(readRuns('{}')).toEqual([])
    expect(readRuns(JSON.stringify([...runs,{id:'bad',name:'x',score:99,date:1}]))).toEqual(runs)
  })
  it('uses five distinct playable questions',()=>{
    expect(new Set(shuffled(QUIZ_IDS))).toEqual(new Set(QUIZ_IDS))
    expect(QUIZ_IDS.every(id=>guitarPresets.some(p=>p.id===id))).toBe(true)
  })
})
describe('long endurance arrangement',()=>{
  it('covers the main-title sections instead of looping the four-bar motif',()=>{
    expect(thronesIntro.beats).toBeGreaterThanOrEqual(240)
    expect(thronesIntro.beats*60/thronesIntro.bpm).toBeGreaterThan(85)
    expect(thronesIntro.notes.some(n=>n.beat>200)).toBe(true)
    expect(thronesIntro.notes.every(n=>n.beat<thronesIntro.beats && n.fret<=5)).toBe(true)
  })
})

describe('answer choices',()=>{
  it('uses three distinct similar-song choices with no songs outside the owner list', async()=>{
    const {answerOptions} = await import('../../src/lib/guitar-quiz')
    const {quizCatalogue,songById} = await import('../../src/lib/guitar-catalogue')
    for(const id of QUIZ_IDS){
      const options=answerOptions(id)
      expect(new Set(options).size).toBe(4)
      expect(options).toContain(id)
      expect(options.every(option=>quizCatalogue.some(song=>song.id===option))).toBe(true)
      expect(options.filter(option=>option!==id).every(option=>songById(id).neighbours.includes(option))).toBe(true)
    }
    expect(quizCatalogue.some(song=>song.id==='twinkle')).toBe(false)
  })
})
