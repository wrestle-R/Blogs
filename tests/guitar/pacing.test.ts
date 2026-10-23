import { describe, expect, it } from 'vitest'
import { guitarPresets, THRONES_BPM } from '../../src/lib/guitar-presets'
const song = (id:string) => guitarPresets.find(p=>p.id===id)!

describe('score-checked musical pacing',()=>{
  it('keeps Shape of You’s dotted-eighth, dotted-eighth, eighth syncopation',()=>{
    expect(song('shape').bpm).toBe(96)
    expect(song('shape').notes.slice(0,6).map(n=>n.beat)).toEqual([0,.75,1.5,2,2.75,3.5])
  })
  it('uses the publisher’s 97 BPM for blue and preserves the short opening rest',()=>{
    const blue=song('blue')
    expect(blue.bpm).toBe(97)
    expect(blue.notes[5].beat+blue.notes[5].durationBeats!).toBe(2.75)
    expect(blue.notes[6].beat).toBe(3)
  })
  it('keeps Dandelions’ triplet conversion at the 78 BPM dotted-quarter pulse',()=>{
    const dandelions=song('dandelions')
    expect(dandelions.bpm).toBe(78)
    expect((dandelions.notes[1].beat-dandelions.notes[0].beat)*60/78).toBeCloseTo(.5*60/117,7)
    expect(dandelions.notes[8].beat).toBe(4)
    expect(dandelions.notes[9].beat).toBe(8)
  })
  it('keeps Snowman at 105 BPM without replaying the note across a tie',()=>{
    expect(song('snowman').bpm).toBe(105)
    expect(song('snowman').notes.slice(0,3).map(n=>[n.beat,n.durationBeats])).toEqual([[0,1],[1,1],[2.5,.5]])
  })
  it('holds the first 505 chord for eight beats and starts the next at beat eight',()=>{
    const intro=song('505')
    expect(intro.bpm).toBe(140)
    expect(intro.notes.slice(0,3).map(n=>[n.beat,n.durationBeats])).toEqual([[0,8],[0,8],[0,8]])
    expect(intro.notes[3].beat).toBe(8)
  })
  it('uses the 170 BPM Game of Thrones pulse and equal first two notes',()=>{
    expect(THRONES_BPM).toBe(170)
    expect(song('thrones').notes.slice(0,4).map(n=>n.beat)).toEqual([0,1,2,2.5])
  })
})
