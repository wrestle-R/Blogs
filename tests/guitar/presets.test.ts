import { describe, expect, it } from 'vitest'
import { chords, guitarPresets, tuning } from '../../src/lib/guitar-presets'

describe('guitar arrangements', () => {
  for (const preset of guitarPresets) {
    it(`${preset.id} fits the visible guitar and has an ordered, bounded timeline`, () => {
      expect(preset.notes.length).toBeGreaterThan(0)
      expect(preset.bpm).toBeGreaterThanOrEqual(60)
      expect(preset.bpm).toBeLessThanOrEqual(180)
      for (const [i, note] of preset.notes.entries()) {
        expect(note.beat).toBeGreaterThanOrEqual(i ? preset.notes[i - 1].beat : 0)
        expect(note.beat).toBeLessThan(preset.beats)
        expect(note.row).toBeGreaterThanOrEqual(0)
        expect(note.row).toBeLessThan(6)
        expect(note.fret).toBeGreaterThanOrEqual(0)
        expect(note.fret).toBeLessThanOrEqual(12)
        expect(note.velocity).toBeGreaterThan(0)
        expect(note.velocity).toBeLessThanOrEqual(1)
      }
    })
  }
  const roots: Record<string, number> = { Em: 4, Am: 9, C: 0, G: 7, D: 2, A: 9, E: 4, Dm: 2 }
  for (const chord of chords) {
    it(`${chord.name} strums only the root, third and fifth of that chord`, () => {
      const expected = [0, chord.name.endsWith('m') ? 3 : 4, 7]
      const actual = chord.frets.flatMap((fret, row) => fret < 0 ? [] : [(tuning[row] + fret - roots[chord.name] + 120) % 12])
      expect([...new Set(actual)].sort()).toEqual([...expected].sort())
    })
  }
})
