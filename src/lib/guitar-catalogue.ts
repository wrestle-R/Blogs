/** Owner-selected repertoire. A title in this list is not a playable arrangement.
 * Only scores explicitly registered in guitar-presets.ts can become questions. */
import ownerSongList from './guitar-song-list.json'
import arrangements from './guitar-arrangements.json'
export { default as ownerSongList } from './guitar-song-list.json'
export interface QuizSong { id: string; title: string; artist: string; neighbours: string[] }
const legacyEntries: [string,string,string][] = [
 ['shape','Shape of You','Ed Sheeran'], ['miracle','Miracle','Benjamin Steer'],
 ['bridges','Bridges','Ike Dweck'], ['dreaming','Am I Dreaming','Metro Boomin, A$AP Rocky & Roisee'],
 ['blue','blue','yung kai'], ['glimpse','Glimpse of Us','Joji'],
 ['hook','Line Without a Hook','Ricky Montgomery'], ['felt','The Way You Felt','Alec Benjamin'],
 ['want','THATS WHAT I WANT','Lil Nas X'], ['teenage','Teenage Dream (Acoustic)','Stephen Dawes'],
 ['bombay','Chal Bombay','DIVINE'], ['trying','DIE TRYING','PARTYNEXTDOOR, Drake & Yebba'],
 ['blame','Don’t Blame Me','Taylor Swift'], ['mine','Make You Mine','PUBLIC'],
 ['best','Best Song Ever','One Direction'], ['gossip','GOSSIP','Måneskin'],
 ['better','Little Bit Better','Caleb Hearn & ROSIE'], ['hov','HOV','GRAHAM'],
 ['lie','Lie','NF'], ['smile','Die With a Smile','Lady Gaga & Bruno Mars'],
 ['young','Die Young','Kesha'], ['snowman','Snowman','Sia'],
 ['co2','Co2','Prateek Kuhad'], ['505','505','Arctic Monkeys'],
 ['sailor','Sailor Song','Gigi Perez'], ['league','Out of My League','Fitz and The Tantrums'],
 ['another','Another Love','Tom Odell'], ['dandelions','Dandelions','Ruth B.'],
 ['lucid','Lucid Dreams','Juice WRLD'], ['good','good 4 u','Olivia Rodrigo'],
 ['drivers','drivers license','Olivia Rodrigo'], ['closer','Closer','The Chainsmokers & Halsey'],
 ['october','we fell in love in october','girl in red'], ['homecoming','Homecoming','Kanye West'],
 ['summer','Summertime Sadness','Lana Del Rey'], ['party','when the party’s over','Billie Eilish'],
 ['wildflower','WILDFLOWER','Billie Eilish'], ['beautiful','Something Beautiful','Tom Walker'],
 ['dead','Play Dead','Tom Walker'], ['fine','I’m Fine','Sophia Pecora'],
 ['risk','Risk','Gracie Abrams'], ['mind','Mind Over Matter','Young the Giant'], ['her','her','JVKE'],
 ["tell-me", "Tell Me", "Peech."],
 ["fireflies", "Fireflies", "Owl City"],
 ["self-aware", "Self Aware", "Temper City"],
 ["players", "Players", "Coi Leray"],
 ["bad-dream", "Bad Dream", "ISHAN"],
 ["if-i-had-no-song", "If I Had No Song", "ISHAN"],
 ["the-shade", "THE SHADE", "Rex Orange County"],
 ["sucker-for-pain", "Sucker for Pain", "Lil Wayne, Wiz Khalifa, Imagine Dragons, X Ambassadors, Logic, Ty Dolla $ign"],
 ["two-moons", "Two Moons", "BoyWithUke"],
 ["me-and-my-guitar", "Me and My Guitar", "A Boogie Wit da Hoodie"],
 ["you", "You", "Benjamin Steer"],
 ["closure", "Closure", "Hayd"],
 ["miracle-acoustic", "Miracle - Acoustic Version", "Benjamin Steer"],
 ["wishes", "Wishes", "Carter Ryan"],
 ["dawn", "Dawn", "Ike Dweck"],
 ["self-love", "Self Love (Spider-Man: Across the Spider-Verse) (Metro Boomin & Coi Leray)", "Metro Boomin, Coi Leray"],
 ["country-roads", "Take Me Home, Country Roads - Original Version", "John Denver"],
 ["lucky-enough", "Lucky Enough", "Jez Dior"],
 ["the-first-time", "The First Time", "Damiano David"],
 ["mirror", "Mirror", "Lil Wayne, Bruno Mars"],
 ["no-role-modelz", "No Role Modelz", "J. Cole"],
 ["sinner", "Sinner", "Benjamin Steer"],
 ["double-take", "double take", "Dhruv"],
 ["whats-poppin", "Whats Poppin (feat. DaBaby, Tory Lanez & Lil Wayne) [Remix] - Bonus Track", "Jack Harlow, Tory Lanez, DaBaby, Lil Wayne"],
 ["interlude-i-m-not-angry-anymore", "Interlude: I'm Not Angry Anymore", "Paramore"],
 ["white-ferrari", "White Ferrari", "Frank Ocean"],
 ["sicko-mode", "SICKO MODE", "Travis Scott"],
 ["keep-your-head-up-princess", "Keep Your Head Up Princess", "Anson Seabra"],
 ["i-love-you-i-m-sorry", "I Love You, I'm Sorry", "Gracie Abrams"],
 ["leather", "Leather", "Jez Dior"],
 ["no-one-wants-to-die-alone", "No One Wants To Die Alone", "Benjamin Steer"],
 ["judas", "Judas", "Benjamin Steer"],
 ["if-we-have-each-other", "If We Have Each Other", "Alec Benjamin"],
 ["oceans-where-feet-may-fail", "Oceans (Where Feet May Fail)", "Hillsong UNITED, TAYA"],
 ["cigarette-smoke", "cigarette smoke", "Olivia Rodrigo"],
 ["stick-season", "Stick Season", "Noah Kahan"],
 ["i-just-wanna-know", "I Just Wanna Know", "NF"],
 ["less", "less", "Olivia Rodrigo"],
 ["remember-that-night", "Remember That Night?", "Sara Kays"],
 ['thrones','Game of Thrones','Ramin Djawadi'],
]
// Deliberate confusers: a shared instrument, pace or musical texture, rather than
// arbitrary titles. These are hand-curated editorial matches, not audio analysis.
const neighbours: Record<string,string[]> = {
 shape:['closer','mine','want','young','best'],
 blue:['sailor','october','co2','league','teenage','wildflower'],
 snowman:['dandelions','smile','glimpse','drivers','party','her'],
 dandelions:['snowman','blue','glimpse','smile','her','wildflower'],
 '505':['mind','october','gossip','league','summer','hook'],
 fireflies:['closer','shape','league','mine','want'],
 good:['drivers','gossip','best','young','risk'],
 smile:['snowman','dandelions','glimpse','her','another'],
 summer:['party','wildflower','october','drivers','sailor'],
 thrones:['mind','505','dreaming','another'],
 another:['glimpse','drivers','party','dead','lie','snowman'],
}
// Editorial confusers grouped by broad sound; these are not audio similarity scores.
const confuserGroups = [
 ['blue','sailor','october','co2','teenage','wildflower','hook','mine','mind','i-love-you-i-m-sorry','interlude-i-m-not-angry-anymore','if-we-have-each-other','country-roads','stick-season'],
 ['snowman','dandelions','smile','glimpse','drivers','party','her','another','less','white-ferrari','better','oceans-where-feet-may-fail'],
 ['shape','closer','want','young','best','fireflies','league','good','risk'],
 ['505','gossip','mind','summer','good','self-aware','the-shade','best','the-first-time'],
 ['dreaming','trying','lucid','homecoming','sicko-mode','sucker-for-pain','self-love','mirror','no-role-modelz'],
]
const entries = new Map(legacyEntries.map(([id,title,artist])=>[id,{id,title,artist}]))
for(const {id,title,artist} of ownerSongList) entries.set(id,{id,title,artist})
const texture=new Map(arrangements.map(a=>{const attacks=new Set(a.events.map(e=>e[0])).size;return [a.id,{bpm:a.bpm,density:attacks/a.beats,chord:a.events.length/attacks}]}))
texture.set('thrones',{bpm:170,density:32/24,chord:1})
const primaryArtist=(artist:string)=>artist.split(/,| & | feat\./)[0].toLowerCase()
function similarSongs(song:{id:string;artist:string}) {
  const original=neighbours[song.id]||confuserGroups.find(group=>group.includes(song.id))?.filter(other=>other!==song.id)||[]
  const own=texture.get(song.id)
  const distance=(other:{id:string;artist:string})=>{
    const t=texture.get(other.id)
    const same=primaryArtist(song.artist)===primaryArtist(other.artist)?-4:0
    return same+(own&&t?Math.abs(Math.log2(own.bpm/t.bpm))*2+Math.abs(own.density-t.density)+Math.abs(own.chord-t.chord):10)
  }
  const remaining=[...entries.values()].filter(other=>other.id!==song.id&&!original.includes(other.id)).sort((a,b)=>distance(a)-distance(b))
  return [...original,...remaining.map(other=>other.id)].slice(0,8)
}
export const quizCatalogue: QuizSong[] = [...entries.values()].map(song=>({...song,neighbours:similarSongs(song)}))
export const songById = (id:string) => quizCatalogue.find(song=>song.id===id)!
