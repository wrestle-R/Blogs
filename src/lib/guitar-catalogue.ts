/** Owner-selected repertoire. A title in this list is not a playable arrangement.
 * Only scores explicitly registered in guitar-presets.ts can become questions. */
export interface QuizSong { id: string; title: string; artist: string; neighbours: string[] }
const entries: [string,string,string][] = [
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
]
// Deliberate confusers: a shared instrument, pace or musical texture, rather than
// arbitrary titles. These are hand-curated editorial matches, not audio analysis.
const neighbours: Record<string,string[]> = {
 shape:['closer','mine','want','young','best'],
 blue:['sailor','october','co2','league','teenage','wildflower'],
 snowman:['dandelions','smile','glimpse','drivers','party','her'],
 dandelions:['snowman','blue','glimpse','smile','her','wildflower'],
 '505':['mind','october','gossip','league','summer','hook'],
 another:['glimpse','drivers','party','dead','lie','snowman'],
}
export const quizCatalogue: QuizSong[] = entries.map(([id,title,artist])=>({id,title,artist,neighbours:neighbours[id]||[]}))
export const songById = (id:string) => quizCatalogue.find(song=>song.id===id)!
