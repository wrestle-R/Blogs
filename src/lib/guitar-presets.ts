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
// Short opening-hook arrangement, not a full-song transcription.
// Pitch reference: CCYD Music's Year 8 Ostinato booklet (Shape of You riff).
const shape = melody([61,64,61,61,64,61,61,64,61,63,61,59], [.5,1,.5,.5,1,.5,.5,1,.5,.5,1,.5])
// The intro pulse is quarter, quarter, eighth, eighth in 3/4. The previous
// dotted-quarter/eighth/eighth/eighth transcription rushed the lower C note.
// Rhythm reference: Pierre Loiselle, Guitare 1, bars 9–16 (A-minor arrangement,
// transposed here to the theme's C minor). Main phrases: Easy Breezy's C-minor
// transcription. No invented backing arpeggio or repeated attacks on tied notes.
export const THRONES_BPM = 144 // Deliberately calmer guitar interpretation.
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

// Short, score-referenced guitar reductions. Register is lowered to the guitar;
// simultaneous backing tones are reduced, while the melody and notated rests
// remain. See guitar-arrangement-sources.md for the exact source and measures.
const bluePitches = [72,71,67,72,71,67,72,71,67,72,74,76, 67,69,72,77,76,71,71,71,72,74,72, 67,64,65,67,71,72, 67,69,72,77,76,71,71,79,77,76]
const blueLengths = [...Array(12).fill(.5), ...Array(6).fill(.5),1,.5,.5,.5,.5, 1.5,.5,.5,.5,1.5,1.5, ...Array(6).fill(.5),1.5,.5,.5,.5]
const blueNotes = melody(bluePitches.map(p=>p-8),blueLengths)
const dandelionPitches = [81,79,76,76,74,76,74,72, 81,79,76,76,74,74,72,74,72, 69,72,74,76,74,72,76,81, 67,72,74,76,74,72,74]
const dandelionLengths = [1/3,1/3,1/3,2/3,1/3,2/3,1/3,1, 1/3,1/3,1/3,2/3,1/3,2/3,1/3,2/3,1/3, ...Array(6).fill(1/3),1,1, ...Array(6).fill(1/3),2]
const dandelionNotes = melody(dandelionPitches.map(p=>p-11),dandelionLengths)
const snowOpening = melody([64,67,72,76,72,67,64,67,72,76,72,67,64,67,72,76,79,84].map(p=>p-11),Array(18).fill(.5),.6)
const snowVoice = melody([69,74,76,74,74,69,76,74,74,74].map(p=>p-11),[1,.5,1,.5,1,.25,.75,.5,.5,1.5]).map(n=>({...n,beat:n.beat+10.5}))
const fifthNotes: RiffNote[] = [
  // Organ harmony reduced to guitar voicings. D minor for eight quarter beats,
  // E minor for eight, matching the four-bar opening at 140 BPM.
  ...[50,57,62,65].map(p=>({beat:0,...position(p),velocity:.65})),
  ...[52,59,64,67].map(p=>({beat:8,...position(p),velocity:.65})),
]
export const guitarPresets: GuitarPreset[] = [
 {id:'shape',label:'Shape of You',detail:'Ed Sheeran · opening riff',bpm:96,beats:8,notes:shape},
 {id:'blue',label:'blue',detail:'yung kai · opening melody',bpm:105,beats:24,notes:blueNotes},
 {id:'dandelions',label:'Dandelions',detail:'Ruth B. · opening melody',bpm:80,beats:16,notes:dandelionNotes},
 {id:'snowman',label:'Snowman',detail:'Sia · opening arpeggios and vocal pickup',bpm:103.5,beats:18,notes:[...snowOpening,...snowVoice]},
 {id:'505',label:'505',detail:'Arctic Monkeys · opening harmony',bpm:140,beats:16,notes:fifthNotes},
 ...arrangements.map(arrangement => {
   const song = songById(arrangement.id)
   return {id:song.id,label:song.title,detail:`${song.artist} · short guitar reduction`,bpm:arrangement.bpm,beats:arrangement.beats,notes:arrangedNotes(arrangement.events)}
 }),
 {id:'thrones',label:'Game of Thrones',detail:'Ramin Djawadi · opening theme',bpm:THRONES_BPM,beats:12,notes:melody(mainThemePitches.slice(0,8),mainThemeLengths.slice(0,8))},
 {id:'endurance',label:'A little endurance',detail:'An original fingerstyle phrase',bpm:RIFF_BPM,beats:RIFF_BEATS,notes:enduranceRiff},
]
