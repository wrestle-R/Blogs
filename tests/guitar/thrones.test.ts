import { describe, expect, it } from 'vitest'
import { thronesIntro, tuning } from '../../src/lib/guitar-presets'
const pitch = (note: (typeof thronesIntro.notes)[number]) => tuning[note.row]+note.fret

describe('GoT transcription regressions',()=>{
  it('gives the first two notes equal quarter beats, followed by two eighths',()=>{
    expect(thronesIntro.notes.slice(0,4).map(pitch)).toEqual([55,48,51,53])
    expect(thronesIntro.notes.slice(0,5).map(n=>n.beat)).toEqual([0,1,2,2.5,3])
    expect(thronesIntro.notes.slice(0,4).map(n=>n.durationBeats)).toEqual([1,1,.5,.5])
  })
  it('keeps four minor and four major bars before the main melody',()=>{
    const opening=thronesIntro.notes.filter(n=>n.beat<24)
    expect(opening).toHaveLength(32)
    expect(opening.filter(n=>n.beat<12).map(pitch)).not.toContain(52)
    expect(opening.filter(n=>n.beat>=12).map(pitch)).toContain(52)
    expect(thronesIntro.notes.find(n=>n.beat===24)).toMatchObject({durationBeats:3})
  })
  it('keeps the rest in C minor and resolves to C instead of the previous B-flat ending',()=>{
    const cMinor=[0,2,3,5,7,8,10]
    expect(thronesIntro.notes.filter(n=>n.beat>=24).every(n=>cMinor.includes(pitch(n)%12))).toBe(true)
    expect(pitch(thronesIntro.notes.at(-1)!)).toBe(48)
  })
})
