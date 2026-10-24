import { enduranceRiff, RIFF_BPM, RIFF_BEATS, type RiffNote } from './guitar-riff'
import arrangements from './guitar-arrangements.json'
import { songById } from './guitar-catalogue'
export interface GuitarPreset { id: string; label: string; detail: string; bpm: number; beats: number; notes: RiffNote[] }
export const tuning = [40, 45, 50, 55, 59, 64]
export const chords = [
  { name: 'Em', frets: [0,2,2,0,0,0] }, { name: 'Am', frets: [-1,0,2,2,1,0] },
  { name: 'C', frets: [-1,3,2,0,1,0] }, { name: 'G', frets: [3,2,0,0,0,3] },
  { name: 'D', frets: [-1,-1,0,2,3,2] }, { name: 'A', frets: [-1,0,2,2,2,0] },
  { name: 'E', frets: [0,2,2,1,0,0] }, { name: 'Dm', frets: [-1,-1,0,2,3,1] },
]
function position(midi: number) {
  // Prefer the highest string; studio arrangements can use the full neck.
  for (let row = 5; row >= 0; row--) if (midi >= tuning[row] && midi - tuning[row] <= 12) return { row, fret: midi - tuning[row] }
  throw new Error(`No open-position fingering for MIDI ${midi}`)
}
export function melody(notes: number[], lengths: number[], velocity = .85): RiffNote[] {
  let beat = 0
  return notes.map((midi, i) => { const note = { beat, ...position(midi), velocity, durationBeats: lengths[i] }; beat += lengths[i]; return note })
}

// Source beats already include dotted notes and tuplets. Ties are merged during
// transcription, and a single octave shift preserves each phrase's intervals.
export function arrangedNotes(events: number[][]): RiffNote[] {
  const groups = new Map<number, Map<number, number>>()
  for (const [beat, pitch, duration] of events) {
    const chord = groups.get(beat) || new Map<number, number>()
    chord.set(pitch, Math.max(chord.get(pitch) || 0, duration))
    groups.set(beat, chord)
  }
  return [...groups].sort(([a], [b]) => a-b).flatMap(([beat, chord]) => {
    const pitches = [...chord.keys()].sort((a,b) => b-a)
    const placed: {row:number;fret:number}[] = []
    const assign = (i: number): boolean => {
      if (i === pitches.length) return true
      for (let row = 5; row >= 0; row--) {
        const fret = pitches[i]-tuning[row]
        if (fret < 0 || fret > 12 || placed.some(p => p.row === row)) continue
        placed.push({row,fret})
        if (assign(i+1)) return true
        placed.pop()
      }
      return false
    }
    if (!assign(0)) throw new Error(`Unplayable guitar voicing at beat ${beat}`)
    return pitches.map((pitch,i) => ({beat,...placed[i],velocity:pitches.length>2 ? .6 : .82,durationBeats:chord.get(pitch)!}))
  })
}
// The intro pulse is quarter, quarter, eighth, eighth in 3/4. The previous
// dotted-quarter/eighth/eighth/eighth transcription rushed the lower C note.
// Rhythm reference: Pierre Loiselle, Guitare 1, bars 9–16 (A-minor arrangement,
// transposed here to the theme's C minor). Main phrases: Easy Breezy's C-minor
// transcription. No invented backing arpeggio or repeated attacks on tied notes.
export const THRONES_BPM = 170 // Score-referenced quarter-note tempo (see source notes).
const ostinatoLengths = [1,1,.5,.5]
const minorOpening = [55,48,51,53]
const majorOpening = [55,48,52,53]
const openingNotes = melody([
 ...Array.from({length:4},()=>minorOpening).flat(),
 ...Array.from({length:4},()=>majorOpening).flat(),
],Array.from({length:8},()=>ostinatoLengths).flat(),.85)
const mainThemePitches = [55,48,51,53,55,48,51,53,
 ...Array.from({length:3},()=>[50,43,46,48]).flat(),50,43,46,
 53,46,51,50,53,46,
 51,50,48,44,46,...Array.from({length:2},()=>[48,41,44,46]).flat(),48,41,44]
const mainThemeLengths = [3,3,.5,.5,2,2,.5,.5,
 ...Array.from({length:3},()=>ostinatoLengths).flat(),1,1,1,
 3,3,.5,.5,2,3,
 .5,.5,1,.5,.5,...Array.from({length:2},()=>ostinatoLengths).flat(),1,1,1]
// Phrase lengths include the notated rests/ties; keep the upper statement in
// the guitar's register instead of changing isolated pitches to arbitrary octaves.
const mainNotes = melody(mainThemePitches,mainThemeLengths)
const mainBeats = mainThemeLengths.reduce((sum,value)=>sum+value,0)
const closingPitches = [60,58,48,56,55,44,51,53,55,48]
const closingLengths = [6,6,3,3,6,6,3,3,6,6]
const closingNotes = melody(closingPitches,closingLengths,.8)
export const thronesIntro: GuitarPreset = {
 id:'thrones-intro',label:'Game of Thrones',detail:'Ramin Djawadi · guitar theme',
 bpm:THRONES_BPM,beats:24+mainBeats*3+48,
 notes:[...openingNotes,
 ...mainNotes.map(n=>({...n,beat:n.beat+24})),
 ...mainNotes.map(n=>({...n,beat:n.beat+24+mainBeats})),
 ...melody(mainThemePitches.map(p=>p+12),mainThemeLengths).map(n=>({...n,beat:n.beat+24+mainBeats*2})),
 ...closingNotes.map(n=>({...n,beat:n.beat+24+mainBeats*3}))],
}

// Locally stored, source-referenced short reductions.
export const guitarPresets: GuitarPreset[] = [
 ...arrangements.map(arrangement => {
   const song = songById(arrangement.id)
   return {id:song.id,label:song.title,detail:`${song.artist} · short guitar reduction`,bpm:arrangement.bpm,beats:arrangement.beats,notes:arrangedNotes(arrangement.events)}
 }),
 {id:'endurance',label:'A little endurance',detail:'An original fingerstyle phrase',bpm:RIFF_BPM,beats:RIFF_BEATS,notes:enduranceRiff},
]
