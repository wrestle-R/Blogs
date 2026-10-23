import { enduranceRiff, RIFF_BPM, RIFF_BEATS, type RiffNote } from './guitar-riff'
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
// Short opening-hook arrangement, not a full-song transcription.
// Pitch reference: CCYD Music's Year 8 Ostinato booklet (Shape of You riff).
const shape = melody([61,64,61,61,64,61,61,64,61,63,61,59], [.5,1,.5,.5,1,.5,.5,1,.5,.5,1,.5])
// Four bars of the opening C-minor / C-major ostinato, simplified for guitar.
// Reference: unpianiste.com/wp-content/uploads/partitions/Game_of_Thrones.pdf
// Main-title guitar arrangement: four-bar ostinato, both statements of the
// opening melody, then the rising second section and closing cadence.
// Melody reference: the arranger's score at unpianiste.com (above), down an octave.
const mainThemePitches = [55,48,51,53,55,48,51,53,50, 53,46,50,48,53,46,50,48,48]
const mainThemeLengths = [3,3,.5,.5,2,2,.5,.5,12, 3,3,.5,.5,2,2,.5,.5,12]
const secondPitches = [55,48,51,53,55,48,51,53,50,53,46,50,51,50,46,48,60,58,48,56,55,44,51,53,55,58,57,48,53,50,41,48,47,46]
const secondLengths = [3,3,.5,.5,2,2,.5,.5,12,3,3,1.5,1.5,1.5,1.5,12,6,6,3,3,6,6,3,3,12,6,6,3,3,6,6,3,3,6]
// Keep tied long melody notes alive with a gentle pluck each bar, plus a quiet
// six-eighth-note accompaniment. This is guitar synthesis, not the recording.
const openingPitches = [55,48,51,53,55,48,51,53,55,48,52,53,55,48,52,53]
const openingLengths = Array.from({length:4},()=>[1.5,.5,.5,.5]).flat()
const titlePitches = [...openingPitches,...mainThemePitches,...mainThemePitches,...secondPitches]
const titleLengths = [...openingLengths,...mainThemeLengths,...mainThemeLengths,...secondLengths]
const titleLead = melody(titlePitches,titleLengths,.95).flatMap((note,i) =>
  Array.from({length:Math.ceil(titleLengths[i]/3)},(_,bar)=>({...note,beat:note.beat+bar*3,velocity:bar ? .65 : note.velocity})))
const titleBeats = titleLengths.reduce((a,b)=>a+b,0)
const titleBacking: RiffNote[] = []
for(let beat=0;beat<titleBeats;beat+=.5) {
  const bar=Math.floor(beat/3)
  const root = bar < 4 ? 48 : [48,48,48,48,43,43,43,43,46,46,46,46,41,41,41,41][(bar-4)%16]
  const pitch = [root,root+7,root+12,root+7,root+12,root+7][Math.round((beat%3)*2)]
  titleBacking.push({beat,...position(pitch),velocity:.22})
}
export const thronesIntro: GuitarPreset = {id:'thrones-intro',label:'Game of Thrones',detail:'Ramin Djawadi · main-title guitar arrangement',bpm:168,beats:titleBeats,notes:[...titleLead,...titleBacking].sort((a,b)=>a.beat-b.beat)}

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
 {id:'thrones',label:'Game of Thrones',detail:'Ramin Djawadi · opening theme',bpm:168,beats:24,notes:melody(mainThemePitches.slice(0,9),mainThemeLengths.slice(0,9))},
 {id:'endurance',label:'A little endurance',detail:'An original fingerstyle phrase',bpm:RIFF_BPM,beats:RIFF_BEATS,notes:enduranceRiff},
]
