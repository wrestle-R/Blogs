import { describe, it, expect } from 'vitest'
import { ordinal, shuffled, newQuestions, QUIZ_IDS, QUIZ_LENGTH, QUIZ_VERSION } from '../../src/lib/guitar-quiz'
import { ownerSongList, quizCatalogue } from '../../src/lib/guitar-catalogue'
import { thronesIntro, guitarPresets } from '../../src/lib/guitar-presets'
describe('quiz results',()=>{
  it('formats percentile ordinals including the teen exceptions',()=>{
    expect([0,1,2,3,11,12,13,21,22,100].map(ordinal)).toEqual(['0th','1st','2nd','3rd','11th','12th','13th','21st','22nd','100th'])
  })
  it('samples ten distinct playable questions from the expanded pool',()=>{
    expect(QUIZ_LENGTH).toBe(10)
    expect(QUIZ_VERSION).toBe('v3')
    expect(new Set(shuffled(QUIZ_IDS))).toEqual(new Set(QUIZ_IDS))
    expect(QUIZ_IDS.every(id=>guitarPresets.some(p=>p.id===id))).toBe(true)
    const original=[...QUIZ_IDS]
    for(let i=0;i<30;i++) {
      const round=newQuestions()
      expect(round).toHaveLength(10)
      expect(new Set(round).size).toBe(10)
      expect(round.every(id=>QUIZ_IDS.includes(id))).toBe(true)
    }
    expect(QUIZ_IDS).toEqual(original)
  })
})

describe('owner song list',()=>{
  it('preserves all 199 supplied tracks in order, including artist-distinct titles',()=>{
    expect(ownerSongList).toHaveLength(199)
    expect(new Set(ownerSongList.map(s=>s.id)).size).toBe(199)
    expect(ownerSongList.map(s=>s.position)).toEqual(Array.from({length:199},(_,i)=>i+1))
    expect(ownerSongList.slice(-9).map(s=>s.title)).toEqual(['Mockingbird','Till I Collapse','Mr. Loverman','From the Start','Those Eyes','Atlantis','Runaway','Stick Season','That’s So True'])
    const sameTitle=ownerSongList.filter(s=>s.title==='See You Again')
    expect(sameTitle).toHaveLength(2)
    expect(new Set(sameTitle.map(s=>s.id)).size).toBe(2)
    expect(ownerSongList.every(s=>quizCatalogue.some(c=>c.id===s.id))).toBe(true)
  })
})
describe('long endurance arrangement',()=>{
  it('covers the main-title sections instead of looping the four-bar motif',()=>{
    expect(thronesIntro.beats / 3).toBeGreaterThanOrEqual(60)
    expect(thronesIntro.bpm).toBe(170)
    expect(thronesIntro.beats*60/thronesIntro.bpm).toBeGreaterThan(70)
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
