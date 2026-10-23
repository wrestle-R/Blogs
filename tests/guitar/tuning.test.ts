import { describe, expect, it } from 'vitest'
import { enduranceRiff, pluckedString } from '../../src/lib/guitar-riff'

// Estimate the rendered wave's period, with parabolic sub-sample refinement.
function measuredFrequency(samples: Float32Array, sampleRate: number, reference: number) {
  const middle = sampleRate / reference
  const first = Math.floor(middle * .97)
  const last = Math.ceil(middle * 1.03)
  const start = Math.floor(sampleRate * .1)
  const length = Math.floor(sampleRate * .15)
  const correlations = new Map<number, number>()
  for (let lag = first - 1; lag <= last + 1; lag++) {
    let dot = 0, a2 = 0, b2 = 0
    for (let i = start; i < start + length; i++) {
      const a = samples[i], b = samples[i + lag]
      dot += a * b; a2 += a * a; b2 += b * b
    }
    correlations.set(lag, dot / Math.sqrt(a2 * b2))
  }
  let peak = first
  for (let lag = first; lag <= last; lag++) if (correlations.get(lag)! > correlations.get(peak)!) peak = lag
  const left = correlations.get(peak - 1)!, centre = correlations.get(peak)!, right = correlations.get(peak + 1)!
  const offset = .5 * (left - right) / (left - 2 * centre + right)
  return sampleRate / (peak + offset)
}

describe('plucked-string tuning', () => {
  for (const sampleRate of [44100, 48000]) {
    for (const [midi, reference] of [[40,82.406889], [48,130.812783], [59,246.941651], [64,329.627557], [67,391.995436], [76,659.255114]]) {
      it(`keeps MIDI ${midi} within 4 cents at ${sampleRate}Hz`, () => {
        const samples = pluckedString(midi, sampleRate, .5)
        const measured = measuredFrequency(samples, sampleRate, reference)
        expect(Math.abs(1200 * Math.log2(measured / reference))).toBeLessThan(4)
        expect(samples.every(Number.isFinite)).toBe(true)
      })
    }
  }
  it('fits the smallest visible fretboard and plays in chronological order', () => {
    expect(enduranceRiff.every(n => n.row >= 0 && n.row < 6 && n.fret >= 0 && n.fret <= 5)).toBe(true)
    expect(enduranceRiff.every((n, i) => i === 0 || n.beat >= enduranceRiff[i - 1].beat)).toBe(true)
  })
})
