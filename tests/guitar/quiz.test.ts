import { describe, it, expect } from 'vitest'
import { ordinal, shuffled, newQuestions, QUIZ_IDS } from '../../src/lib/guitar-quiz'
import { thronesIntro, guitarPresets } from '../../src/lib/guitar-presets'
describe('quiz results',()=>{
  it('formats percentile ordinals including the teen exceptions',()=>{
    expect([0,1,2,3,11,12,13,21,22,100].map(ordinal)).toEqual(['0th','1st','2nd','3rd','11th','12th','13th','21st','22nd','100th'])
  })
  it('samples five distinct playable questions from the expanded pool',()=>{
    expect(new Set(shuffled(QUIZ_IDS))).toEqual(new Set(QUIZ_IDS))
    expect(QUIZ_IDS.every(id=>guitarPresets.some(p=>p.id===id))).toBe(true)
    const original=[...QUIZ_IDS]
    for(let i=0;i<30;i++) {
      const round=newQuestions()
      expect(round).toHaveLength(5)
      expect(new Set(round).size).toBe(5)
      expect(round.every(id=>QUIZ_IDS.includes(id))).toBe(true)
    }
    expect(QUIZ_IDS).toEqual(original)
  })
})
describe('long endurance arrangement',()=>{
  it('covers the main-title sections instead of looping the four-bar motif',()=>{
    expect(thronesIntro.beats / 3).toBeGreaterThanOrEqual(60)
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
