import { describe, expect, it } from 'vitest'
import arrangements from '../../src/lib/guitar-arrangements.json'
import { guitarPresets, tuning } from '../../src/lib/guitar-presets'

describe('source-referenced guitar clips',()=>{
  for(const arrangement of arrangements) {
    it(`${arrangement.id} preserves source pitch, onset, rests and note lengths on distinct strings`,()=>{
      const preset=guitarPresets.find(p=>p.id===arrangement.id)!
      expect(arrangement.source.revisionId).toBeGreaterThan(0)
      expect(arrangement.source.url).toMatch(/^https:\/\/www.songsterr.com\//)
      expect(Math.abs(arrangement.source.octaveShift%12)).toBe(0)
      expect(preset.beats*60/preset.bpm).toBeLessThanOrEqual(12.001)
      const expected=new Map<string,number>()
      for(const [beat,pitch,duration] of arrangement.events){
        const key=`${beat}:${pitch}`
        expected.set(key,Math.max(expected.get(key)||0,duration))
      }
      expect(preset.notes).toHaveLength(expected.size)
      const strings=new Map<number,Set<number>>()
      for(const note of preset.notes){
        expect(note.durationBeats).toBeGreaterThan(0)
        expect(note.beat+note.durationBeats!).toBeLessThanOrEqual(preset.beats+.00001)
        expect(note.durationBeats).toBe(expected.get(`${note.beat}:${tuning[note.row]+note.fret}`))
        const rows=strings.get(note.beat)||new Set<number>()
        expect(rows.has(note.row)).toBe(false)
        rows.add(note.row);strings.set(note.beat,rows)
      }
    })
  }
})
