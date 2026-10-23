// Original four-bar fingerstyle phrase, followed by a resolving E-minor chord.
// Timing is in beats; the audio clock, rather than UI timers, schedules the notes.
export const RIFF_BPM = 104
export const RIFF_BEATS = 18
export const RIFF_LABEL = 'A little endurance'
export interface RiffNote { beat: number; row: number; fret: number; velocity: number; durationBeats?: number }
const patterns = [
  [[0,0], [2,2], [3,0], [4,0], [5,0], [4,0], [3,0], [2,2]], // Em
  [[1,3], [2,2], [3,0], [4,0], [5,0], [5,3], [4,0], [3,0]], // Cmaj7
  [[0,3], [2,0], [3,0], [4,0], [5,3], [5,2], [4,3], [3,0]], // G
  [[2,0], [3,2], [4,3], [5,2], [5,0], [4,3], [3,2], [2,0]], // D / Dsus2
]
export const enduranceRiff: RiffNote[] = patterns.flatMap((notes, bar) => notes.map(([row, fret], i) => ({
  beat: bar * 4 + i * .5, row, fret, velocity: i === 0 ? .95 : row === 5 ? .86 : .64,
})))
// A short, deliberately staggered downstroke, letting the final chord ring out.
;[[0,0], [1,2], [2,2], [3,0], [4,0], [5,0]].forEach(([row, fret], i) => {
  enduranceRiff.push({ beat: 16 + i * .035, row, fret, velocity: .7 })
})

export function pluckedString(midi: number, sampleRate: number, seconds = 2.5): Float32Array {
  const frequency = 440 * 2 ** ((midi - 69) / 12)
  // The two-tap low-pass contributes half a sample of group delay. Interpolate
  // the remaining delay instead of rounding, keeping higher frets in tune too.
  const delay = sampleRate / frequency - .5
  const whole = Math.floor(delay)
  const fraction = delay - whole
  const samples = new Float32Array(Math.ceil(sampleRate * seconds))
  let seed = (midi * 7919 + 104729) >>> 0
  for (let i = 0; i <= whole + 1; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    samples[i] = (seed / 4294967296 * 2 - 1) * .65
  }
  for (let i = whole + 2; i < samples.length; i++) {
    const a = samples[i - whole] * (1 - fraction) + samples[i - whole - 1] * fraction
    const b = samples[i - whole - 1] * (1 - fraction) + samples[i - whole - 2] * fraction
    samples[i] = (a + b) * .4985
  }
  // Remove the initial click while keeping the crisp pick attack.
  const attack = Math.round(sampleRate * .002)
  for (let i = 0; i < attack; i++) samples[i] *= i / attack
  return samples
}
