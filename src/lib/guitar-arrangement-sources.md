# Guitar arrangement references

The quiz has **200 playable short guitar reductions**, drawn only from the owner's supplied lists and Spotify top-song selection. The master catalogue retains233song identities; the ordered owner-selection list remains199tracks. 177ofthose199haveplayableclips; other eligible clips are earlier owner/top-song selections. Catalogue presence alone does not make a song playable.

The bank contains199pinned tab-based excerpts plus the separately scored Game of Thrones reduction. Of those tabs,166are contributor notation and33are marked as automated transcriptions by the source. That distinction is recorded per clip below and in JSON. Automated source material is not silently described as human-authored or official artist notation.

The independent rational-duration audit matches pitches, onsets, rests, ties, tempo conversion and documented reductions for all199tabs. Browser checks compare actual scheduled audio for all200clips. These checks do not establish note-for-note perceptual identity with every studio recording. Guitar synthesis replaces the original timbre, and expressive effects remain reduced. No human listening comparison with every original recording is claimed.

## Timing corrections, 2026-10-23

- Shape of You: 96 BPM, with dotted-eighth, dotted-eighth, eighth onsets (0, .75, 1.5). Replaced the earlier uneven .5, 1, .5 rhythm.
- blue: 97 quarter notes per minute, matching the [published arrangement](https://www.musicnotes.com/sheetmusic/the-theorist/blue/MN0297143). Contributor notation is 98; that one-BPM override is recorded with the source metadata. Preserved its short rest after beat 2.75.
- Dandelions: 78 on the scheduler's triplet beat basis, equivalent to the dotted-quarter 78 pulse in the [official 12/8 score](https://www.musicnotes.com/sheetmusic/ruth-b/dandelions/MN0174049), or quarter 117. Converted durations and rests together, rather than treating compound-meter eighths as straight eighths at 78.
- Snowman: 105 quarter notes per minute, as in the [published 6/8 arrangement](https://www.musicnotes.com/sheetmusic/yannick-streibert/snowman-easy/MN0266316), with ties and rests retained.
- 505: 140 quarter notes per minute. The opening organ voicing sustains for eight beats; the next begins at beat eight. Guitar synthesis replaces the organ timbre.
- Game of Thrones: corrected the former relaxed 144 interpretation to 170 quarter notes per minute, consistent with the [published piano arrangement](https://www.musicnotes.com/sheetmusic/piano-music-bros/game-of-thrones-main-theme/MN0242938). Quiz playback uses the opening 24-beat ostinato. The separate long guitar reduction remains 216 beats, about 76 seconds; it is not the complete orchestral recording.
- Playback now creates buffers long enough for each tied note and releases at the notated duration. The old unconditional 2.5-second cut-off and early fade no longer shorten long holds.

Game of Thrones opening rhythm follows [Pierre Loiselle, Guitar 1, bars 9–16](https://www.pierreloiselle.com/uploads/2/3/7/0/23701802/game_of_thrones_-_guitare_1.pdf): quarter, quarter, eighth, eighth, four minor bars then four major bars. His A-minor arrangement is transposed to C minor. Main-theme phrases follow [Easy Breezy's C-minor transcription](https://easybreezypianotutorials.com/wp-content/uploads/2021/05/game-of-thrones-piano-notes.pdf), with the closing outline from [Un Pianiste](https://unpianiste.com/wp-content/uploads/partitions/Game_of_Thrones.pdf).

## Reduction and verification method

`guitar-arrangements.json` pins song/revision/part/measure metadata, octave shifts, tempo conversion and automated-source flags. Runtime playback uses local note data, not remote notation or Spotify audio. Source restrictions are respected; blocked/restricted tabs are excluded.

The source audit independently reconstructs durations using exact rational arithmetic. It checks ties without retriggering, internal rests, metronome units and any documented bass omission. Excerpts target16scheduler beats or12seconds, whichever is shorter. Some start at a later source measure to obtain a usable phrase rather than an empty or unpitched introduction. Source windows with changing tempo are rejected.

Whole-octave shifts preserve pitch classes and intervals. Chords use distinct guitar strings and merge duplicate unisons. Homecoming omits piano bass belowMIDI48; additional wide-register upper-voice reductions explicitly record `omittedBassBelow` (MIDI52) in their source metadata. These omissions are applied to the audit too. Bends, slides, vibrato, dead/ghost-note dynamics, accents and production effects are not reproduced. Exact duplicate clip-event sequences were checked: none found.

Only registered playable arrangements can enter the server's200-question bank. Each run has ten distinct questions and four choices per question. Editorial confusers prioritize existing hand-curated links, shared artists, source tempo, attack density and chord texture; these are practical similarities, not claims of perceptual audio analysis.

## Pinned excerpt sources

- **1985**: [notation](https://www.songsterr.com/a/wsa/tab-s1834819), revision5083160, part1, measures11–14, 156BPM; contributor notation.
- **505**: [notation](https://www.songsterr.com/a/wsa/tab-s25735), revision9657303, part5, measures1–4, 140BPM; contributor notation.
- **All of Me**: [notation](https://www.songsterr.com/a/wsa/tab-s390512), revision8033331, part1, measures2–5, 120BPM; contributor notation.
- **All the Stars**: [notation](https://www.songsterr.com/a/wsa/tab-s1804741), revision2402003, part0, measures9–12, 95BPM; automated transcription.
- **Another Love**: [notation](https://www.songsterr.com/a/wsa/tab-s518274), revision512853, part0, measures1–4, 120BPM; contributor notation.
- **As It Was**: [notation](https://www.songsterr.com/a/wsa/tab-s507348), revision7557851, part0, measures17–20, 174BPM; contributor notation.
- **Atlantis**: [notation](https://www.songsterr.com/a/wsa/tab-s786985), revision3427355, part5, measures1–4, 83BPM; contributor notation.
- **Back in Black**: [notation](https://www.songsterr.com/a/wsa/tab-s1024), revision9880696, part0, measures11–14, 94BPM; contributor notation.
- **back to friends**: [notation](https://www.songsterr.com/a/wsa/tab-s3661912), revision4797777, part0, measures1–4, 95BPM; contributor notation.
- **bad guy**: [notation](https://www.songsterr.com/a/wsa/tab-s454287), revision8560079, part3, measures35–38, 135BPM; contributor notation.
- **Beautiful Things**: [notation](https://www.songsterr.com/a/wsa/tab-s602388), revision7456248, part0, measures34–36, 110BPM; contributor notation.
- **Believer**: [notation](https://www.songsterr.com/a/wsa/tab-s435652), revision8709831, part1, measures5–8, 125BPM; contributor notation.
- **Best Song Ever**: [notation](https://www.songsterr.com/a/wsa/tab-s421915), revision2937227, part0, measures7–10, 119BPM; contributor notation.
- **Little Bit Better**: [notation](https://www.songsterr.com/a/wsa/tab-s5473644), revision7156897, part4, measures9–13, 138BPM; contributor notation.
- **Billie Jean**: [notation](https://www.songsterr.com/a/wsa/tab-s10586), revision8961480, part0, measures15–19, 117BPM; contributor notation.
- **BIRDS OF A FEATHER**: [notation](https://www.songsterr.com/a/wsa/tab-s648786), revision861981, part3, measures35–38, 105BPM; contributor notation.
- **Don’t Blame Me**: [notation](https://www.songsterr.com/a/wsa/tab-s709108), revision874680, part1, measures49–52, 138BPM; automated transcription.
- **Blank Space**: [notation](https://www.songsterr.com/a/wsa/tab-s468941), revision6446897, part4, measures3–6, 96BPM; contributor notation.
- **Blinding Lights**: [notation](https://www.songsterr.com/a/wsa/tab-s469960), revision8568439, part1, measures19–23, 171BPM; contributor notation.
- **blue**: [notation](https://www.songsterr.com/a/wsa/tab-s856707), revision6818752, part2, measures1–6, 97BPM; contributor notation.
- **Bohemian Rhapsody**: [notation](https://www.songsterr.com/a/wsa/tab-s270), revision9696238, part0, measures1–4, 72BPM; contributor notation.
- **Can’t Feel My Face**: [notation](https://www.songsterr.com/a/wsa/tab-s2514584), revision9336885, part0, measures52–56, 108BPM; contributor notation.
- **Can’t Hold Us**: [notation](https://www.songsterr.com/a/wsa/tab-s2868145), revision9914205, part2, measures52–56, 146BPM; contributor notation.
- **Careless Whisper**: [notation](https://www.songsterr.com/a/wsa/tab-s483175), revision440163, part0, measures1–5, 77BPM; contributor notation.
- **Carry You Home**: [notation](https://www.songsterr.com/a/wsa/tab-s908674), revision1680205, part0, measures1–4, 108BPM; contributor notation.
- **cigarette smoke**: [notation](https://www.songsterr.com/a/wsa/tab-s7603099), revision9922972, part4, measures4–8, 84BPM; contributor notation.
- **Closer**: [notation](https://www.songsterr.com/a/wsa/tab-s432037), revision9036245, part0, measures5–8, 95BPM; contributor notation.
- **Cloud 9**: [notation](https://www.songsterr.com/a/wsa/tab-s502044), revision6043400, part0, measures1–4, 162BPM; contributor notation.
- **Co2**: [notation](https://www.songsterr.com/a/wsa/tab-s3318199), revision4354331, part4, measures1–5, 82BPM; automated transcription.
- **Counting Stars**: [notation](https://www.songsterr.com/a/wsa/tab-s453501), revision9697957, part0, measures1–4, 107BPM; contributor notation.
- **Take Me Home, Country Roads**: [notation](https://www.songsterr.com/a/wsa/tab-s71885), revision6379322, part0, measures3–7, 82BPM; contributor notation.
- **Creep**: [notation](https://www.songsterr.com/a/wsa/tab-s97), revision9676660, part0, measures8–12, 92BPM; contributor notation.
- **Cruel Summer**: [notation](https://www.songsterr.com/a/wsa/tab-s1295745), revision1728502, part0, measures4–7, 84BPM; automated transcription.
- **Dance Monkey**: [notation](https://www.songsterr.com/a/wsa/tab-s463112), revision398431, part0, measures1–4, 98BPM; contributor notation.
- **Dandelions**: [notation](https://www.songsterr.com/a/wsa/tab-s514291), revision675073, part0, measures5–8, 78BPM; contributor notation.
- **Demons**: [notation](https://www.songsterr.com/a/wsa/tab-s390162), revision9157136, part0, measures1–5, 90BPM; contributor notation.
- **Despacito**: [notation](https://www.songsterr.com/a/wsa/tab-s539819), revision556509, part0, measures5–8, 90BPM; contributor notation.
- **Devil Doesn’t Bargain**: [notation](https://www.songsterr.com/a/wsa/tab-s2294517), revision3039381, part0, measures1–6, 91BPM; automated transcription.
- **die first**: [notation](https://www.songsterr.com/a/wsa/tab-s6940750), revision9433018, part4, measures2–5, 92BPM; contributor notation.
- **Die for You**: [notation](https://www.songsterr.com/a/wsa/tab-s483843), revision441559, part0, measures1–1, 134BPM; contributor notation.
- **Do I Wanna Know?**: [notation](https://www.songsterr.com/a/wsa/tab-s383929), revision9786940, part0, measures11–15, 85BPM; contributor notation.
- **Don’t Start Now**: [notation](https://www.songsterr.com/a/wsa/tab-s474943), revision6992119, part1, measures1–5, 124BPM; contributor notation.
- **double take**: [notation](https://www.songsterr.com/a/wsa/tab-s4045208), revision5297214, part4, measures1–4, 109BPM; automated transcription.
- **Am I Dreaming**: [notation](https://www.songsterr.com/a/wsa/tab-s832665), revision1072469, part0, measures1–4, 90BPM; contributor notation.
- **drivers license**: [notation](https://www.songsterr.com/a/wsa/tab-s799324), revision1018844, part0, measures2–5, 72BPM; contributor notation.
- **Espresso**: [notation](https://www.songsterr.com/a/wsa/tab-s616285), revision6344544, part5, measures1–4, 104BPM; contributor notation.
- **Every Breath You Take**: [notation](https://www.songsterr.com/a/wsa/tab-s438), revision9349293, part0, measures9–13, 117BPM; contributor notation.
- **Faded**: [notation](https://www.songsterr.com/a/wsa/tab-s408190), revision3219218, part0, measures1–4, 160BPM; contributor notation.
- **Fairytale**: [notation](https://www.songsterr.com/a/wsa/tab-s7248188), revision9463925, part2, measures5–9, 100BPM; automated transcription.
- **Falling Faster**: [notation](https://www.songsterr.com/a/wsa/tab-s4128246), revision5405742, part1, measures1–5, 128BPM; automated transcription.
- **The Way You Felt**: [notation](https://www.songsterr.com/a/wsa/tab-s3397185), revision4457165, part4, measures4–8, 132BPM; automated transcription.
- **Fireflies**: [notation](https://www.songsterr.com/a/wsa/tab-s60391), revision6717299, part6, measures1–4, 90BPM; contributor notation.
- **From the Start**: [notation](https://www.songsterr.com/a/wsa/tab-s559900), revision9606273, part5, measures4–8, 164BPM; contributor notation.
- **Gasoline**: [notation](https://www.songsterr.com/a/wsa/tab-s441395), revision347071, part0, measures1–2, 120BPM; contributor notation.
- **Glimpse of Us**: [notation](https://www.songsterr.com/a/wsa/tab-s510775), revision8166361, part0, measures9–14, 85BPM; contributor notation.
- **golden hour**: [notation](https://www.songsterr.com/a/wsa/tab-s1237043), revision2546609, part2, measures17–22, 93BPM; contributor notation.
- **good 4 u**: [notation](https://www.songsterr.com/a/wsa/tab-s487830), revision8747472, part0, measures6–10, 169BPM; contributor notation.
- **GOSSIP**: [notation](https://www.songsterr.com/a/wsa/tab-s530949), revision9897805, part2, measures1–4, 140BPM; contributor notation.
- **Happier Than Ever**: [notation](https://www.songsterr.com/a/wsa/tab-s498927), revision9537243, part0, measures3–7, 89BPM; contributor notation.
- **Heartless**: [notation](https://www.songsterr.com/a/wsa/tab-s574007), revision643049, part0, measures10–13, 88BPM; contributor notation.
- **Heat Waves**: [notation](https://www.songsterr.com/a/wsa/tab-s524274), revision3475171, part0, measures2–6, 81BPM; contributor notation.
- **Heathens**: [notation](https://www.songsterr.com/a/wsa/tab-s408134), revision5808701, part0, measures1–4, 90BPM; contributor notation.
- **Hello**: [notation](https://www.songsterr.com/a/wsa/tab-s405410), revision574368, part0, measures1–4, 80BPM; contributor notation.
- **her**: [notation](https://www.songsterr.com/a/wsa/tab-s3232440), revision4243940, part4, measures5–8, 144BPM; contributor notation.
- **Hold On**: [notation](https://www.songsterr.com/a/wsa/tab-s2224570), revision2950997, part1, measures9–12, 120BPM; automated transcription.
- **Homecoming**: [notation](https://www.songsterr.com/a/wsa/tab-s40241), revision55101, part0, measures1–4, 122BPM; contributor notation.
- **Homicide**: [notation](https://www.songsterr.com/a/wsa/tab-s3153611), revision4141067, part1, measures13–16, 140BPM; contributor notation.
- **Line Without a Hook**: [notation](https://www.songsterr.com/a/wsa/tab-s636342), revision1257244, part0, measures51–56, 95BPM; contributor notation.
- **Hotel California**: [notation](https://www.songsterr.com/a/wsa/tab-s447), revision9219749, part0, measures17–20, 73BPM; contributor notation.
- **i hate u, i love u**: [notation](https://www.songsterr.com/a/wsa/tab-s930714), revision1230744, part2, measures1–4, 93BPM; contributor notation.
- **I Just Wanna Know**: [notation](https://www.songsterr.com/a/wsa/tab-s4051962), revision5306154, part2, measures3–6, 100BPM; automated transcription.
- **I Love You, I'm Sorry**: [notation](https://www.songsterr.com/a/wsa/tab-s737551), revision4467198, part3, measures1–6, 87BPM; contributor notation.
- **I Wanna Be Yours**: [notation](https://www.songsterr.com/a/wsa/tab-s393076), revision9541166, part0, measures6–9, 67BPM; contributor notation.
- **I Won’t Beg for You**: [notation](https://www.songsterr.com/a/wsa/tab-s2517844), revision6749431, part0, measures7–10, 155BPM; contributor notation.
- **idfc**: [notation](https://www.songsterr.com/a/wsa/tab-s4166722), revision5455998, part4, measures2–5, 144BPM; automated transcription.
- **If We Have Each Other**: [notation](https://www.songsterr.com/a/wsa/tab-s1019939), revision1380047, part0, measures2–5, 86BPM; contributor notation.
- **If You Want Love**: [notation](https://www.songsterr.com/a/wsa/tab-s4805518), revision9269401, part2, measures21–24, 69BPM; contributor notation.
- **I’ll Be Good**: [notation](https://www.songsterr.com/a/wsa/tab-s3212567), revision4218861, part0, measures1–6, 135BPM; contributor notation.
- **I’m Good (Blue)**: [notation](https://www.songsterr.com/a/wsa/tab-s5320018), revision7268384, part4, measures4–8, 128BPM; contributor notation.
- **In the End**: [notation](https://www.songsterr.com/a/wsa/tab-s385697), revision9506401, part1, measures10–13, 105BPM; contributor notation.
- **Interlude: I’m Not Angry Anymore**: [notation](https://www.songsterr.com/a/wsa/tab-s753993), revision9661439, part0, measures2–5, 113BPM; contributor notation.
- **Iris**: [notation](https://www.songsterr.com/a/wsa/tab-s297), revision9514992, part0, measures4–9, 78BPM; contributor notation.
- **Just the Way You Are**: [notation](https://www.songsterr.com/a/wsa/tab-s91323), revision2913005, part0, measures8–12, 108BPM; contributor notation.
- **Out of My League**: [notation](https://www.songsterr.com/a/wsa/tab-s523206), revision523244, part1, measures2–5, 170BPM; contributor notation.
- **less**: [notation](https://www.songsterr.com/a/wsa/tab-s5595709), revision8103916, part0, measures5–8, 82BPM; contributor notation.
- **Let Her Go**: [notation](https://www.songsterr.com/a/wsa/tab-s385181), revision9451949, part1, measures46–49, 75BPM; contributor notation.
- **Let It Be**: [notation](https://www.songsterr.com/a/wsa/tab-s79), revision9674136, part0, measures4–8, 72BPM; contributor notation.
- **Let Me Down Slowly**: [notation](https://www.songsterr.com/a/wsa/tab-s453642), revision571786, part0, measures1–4, 75BPM; contributor notation.
- **Let Me Love You**: [notation](https://www.songsterr.com/a/wsa/tab-s3222942), revision4231894, part2, measures4–8, 100BPM; automated transcription.
- **Let You Down**: [notation](https://www.songsterr.com/a/wsa/tab-s566965), revision7379910, part2, measures1–5, 72BPM; contributor notation.
- **Living Life, In the Night**: [notation](https://www.songsterr.com/a/wsa/tab-s511193), revision499079, part0, measures1–4, 143BPM; contributor notation.
- **Locked Out of Heaven**: [notation](https://www.songsterr.com/a/wsa/tab-s380607), revision6057036, part0, measures3–7, 144BPM; contributor notation.
- **Lose Yourself**: [notation](https://www.songsterr.com/a/wsa/tab-s23111), revision9909013, part0, measures58–62, 170BPM; contributor notation.
- **Love Story**: [notation](https://www.songsterr.com/a/wsa/tab-s29516), revision8722544, part2, measures33–36, 119BPM; contributor notation.
- **Love Yourself**: [notation](https://www.songsterr.com/a/wsa/tab-s572727), revision8951753, part0, measures1–4, 100BPM; contributor notation.
- **lovely**: [notation](https://www.songsterr.com/a/wsa/tab-s470314), revision413300, part0, measures1–4, 100BPM; contributor notation.
- **Lucid Dreams**: [notation](https://www.songsterr.com/a/wsa/tab-s444983), revision7967013, part3, measures1–4, 84BPM; contributor notation.
- **Me and My Guitar**: [notation](https://www.songsterr.com/a/wsa/tab-s3975655), revision5206422, part4, measures8–12, 174BPM; automated transcription.
- **Medusa**: [notation](https://www.songsterr.com/a/wsa/tab-s3449217), revision4523458, part4, measures9–13, 108BPM; automated transcription.
- **Mind Over Matter**: [notation](https://www.songsterr.com/a/wsa/tab-s698143), revision858197, part0, measures1–4, 152BPM; contributor notation.
- **Make You Mine**: [notation](https://www.songsterr.com/a/wsa/tab-s588481), revision698208, part0, measures1–4, 103BPM; contributor notation.
- **Mirror**: [notation](https://www.songsterr.com/a/wsa/tab-s213111), revision3583363, part0, measures9–12, 77BPM; automated transcription.
- **Mockingbird**: [notation](https://www.songsterr.com/a/wsa/tab-s23112), revision7327628, part0, measures5–9, 84BPM; contributor notation.
- **More Than You Know**: [notation](https://www.songsterr.com/a/wsa/tab-s665267), revision805550, part6, measures4–8, 123BPM; contributor notation.
- **Mr. Brightside**: [notation](https://www.songsterr.com/a/wsa/tab-s601), revision9437460, part1, measures1–4, 148BPM; contributor notation.
- **Mr. Loverman**: [notation](https://www.songsterr.com/a/wsa/tab-s661606), revision3932438, part2, measures6–11, 130BPM; contributor notation.
- **Mr. Sandman**: [notation](https://www.songsterr.com/a/wsa/tab-s4069288), revision5538460, part0, measures1–4, 104BPM; contributor notation.
- **My Mistake**: [notation](https://www.songsterr.com/a/wsa/tab-s4872254), revision6371901, part4, measures6–10, 90BPM; automated transcription.
- **Never Gonna Give You Up**: [notation](https://www.songsterr.com/a/wsa/tab-s37096), revision9636695, part0, measures10–14, 113BPM; contributor notation.
- **No One Wants To Die Alone**: [notation](https://www.songsterr.com/a/wsa/tab-s4879200), revision6381156, part4, measures9–12, 121BPM; automated transcription.
- **No Role Modelz**: [notation](https://www.songsterr.com/a/wsa/tab-s629874), revision1376891, part0, measures1–4, 100BPM; contributor notation.
- **Not Afraid**: [notation](https://www.songsterr.com/a/wsa/tab-s183959), revision1911464, part0, measures10–13, 86BPM; automated transcription.
- **Nothing Else Matters**: [notation](https://www.songsterr.com/a/wsa/tab-s439171), revision9882614, part0, measures24–29, 71BPM; contributor notation.
- **ocean eyes**: [notation](https://www.songsterr.com/a/wsa/tab-s471536), revision415889, part0, measures1–4, 145BPM; contributor notation.
- **Oceans (Where Feet May Fail)**: [notation](https://www.songsterr.com/a/wsa/tab-s471916), revision937452, part0, measures9–13, 140BPM; contributor notation.
- **we fell in love in october**: [notation](https://www.songsterr.com/a/wsa/tab-s476422), revision9403406, part2, measures1–4, 130BPM; contributor notation.
- **One Dance**: [notation](https://www.songsterr.com/a/wsa/tab-s1834641), revision2442340, part1, measures25–28, 104BPM; automated transcription.
- **Ordinary**: [notation](https://www.songsterr.com/a/wsa/tab-s4742221), revision6202789, part4, measures8–13, 170BPM; automated transcription.
- **when the party’s over**: [notation](https://www.songsterr.com/a/wsa/tab-s450297), revision395195, part1, measures13–18, 124BPM; contributor notation.
- **Perfect**: [notation](https://www.songsterr.com/a/wsa/tab-s435433), revision5233768, part0, measures1–4, 95BPM; contributor notation.
- **Photograph**: [notation](https://www.songsterr.com/a/wsa/tab-s401747), revision389120, part1, measures1–4, 108BPM; contributor notation.
- **Players**: [notation](https://www.songsterr.com/a/wsa/tab-s2214829), revision2938744, part0, measures1–4, 161BPM; automated transcription.
- **Remember That Night?**: [notation](https://www.songsterr.com/a/wsa/tab-s4976188), revision6508339, part4, measures5–9, 124BPM; automated transcription.
- **Remember the Name**: [notation](https://www.songsterr.com/a/wsa/tab-s2021169), revision2689429, part1, measures6–9, 91BPM; contributor notation.
- **Riptide**: [notation](https://www.songsterr.com/a/wsa/tab-s390524), revision4920435, part0, measures5–8, 102BPM; contributor notation.
- **Risk**: [notation](https://www.songsterr.com/a/wsa/tab-s7220200), revision9427255, part3, measures5–9, 113BPM; automated transcription.
- **Rolling in the Deep**: [notation](https://www.songsterr.com/a/wsa/tab-s77365), revision7175966, part4, measures19–22, 105BPM; contributor notation.
- **Run**: [notation](https://www.songsterr.com/a/wsa/tab-s1022792), revision4936054, part0, measures1–4, 117BPM; contributor notation.
- **Runaway**: [notation](https://www.songsterr.com/a/wsa/tab-s614963), revision6188379, part0, measures2–7, 85BPM; contributor notation.
- **Sailor Song**: [notation](https://www.songsterr.com/a/wsa/tab-s685717), revision4489273, part0, measures1–5, 95BPM; contributor notation.
- **Save Your Tears**: [notation](https://www.songsterr.com/a/wsa/tab-s556751), revision8917617, part0, measures2–5, 118BPM; contributor notation.
- **Say You Won’t Let Go**: [notation](https://www.songsterr.com/a/wsa/tab-s447450), revision5667857, part3, measures13–16, 95BPM; contributor notation.
- **See You Again**: [notation](https://www.songsterr.com/a/wsa/tab-s397738), revision3740398, part0, measures1–4, 80BPM; contributor notation.
- **See You Again**: [notation](https://www.songsterr.com/a/wsa/tab-s490800), revision5755203, part1, measures1–4, 160BPM; contributor notation.
- **Self Aware**: [notation](https://www.songsterr.com/a/wsa/tab-s4438767), revision8754668, part8, measures6–10, 81BPM; contributor notation.
- **Self Love (Spider-Man: Across the Spider-Verse) (Metro Boomin & Coi Leray)**: [notation](https://www.songsterr.com/a/wsa/tab-s804658), revision1079122, part0, measures5–8, 120BPM; contributor notation.
- **Señorita**: [notation](https://www.songsterr.com/a/wsa/tab-s675070), revision4646995, part3, measures1–4, 120BPM; contributor notation.
- **Seven Nation Army**: [notation](https://www.songsterr.com/a/wsa/tab-s265), revision9403609, part0, measures8–12, 124BPM; contributor notation.
- **Shake It Off**: [notation](https://www.songsterr.com/a/wsa/tab-s468698), revision850932, part1, measures4–8, 160BPM; contributor notation.
- **Shallow**: [notation](https://www.songsterr.com/a/wsa/tab-s572243), revision9809817, part6, measures51–55, 90BPM; contributor notation.
- **Shape of You**: [notation](https://www.songsterr.com/a/wsa/tab-s435294), revision334724, part0, measures1–4, 96BPM; contributor notation.
- **SICKO MODE**: [notation](https://www.songsterr.com/a/wsa/tab-s857391), revision1114979, part0, measures1–4, 155BPM; contributor notation.
- **Sinner**: [notation](https://www.songsterr.com/a/wsa/tab-s5166534), revision6755663, part4, measures9–13, 100BPM; automated transcription.
- **Smells Like Teen Spirit**: [notation](https://www.songsterr.com/a/wsa/tab-s269), revision9812167, part0, measures17–21, 117BPM; contributor notation.
- **Die With a Smile**: [notation](https://www.songsterr.com/a/wsa/tab-s702803), revision8777153, part0, measures2–7, 78BPM; contributor notation.
- **Smoke on the Water**: [notation](https://www.songsterr.com/a/wsa/tab-s329), revision9644948, part0, measures24–28, 115BPM; contributor notation.
- **Snowman**: [notation](https://www.songsterr.com/a/wsa/tab-s497416), revision9502039, part0, measures4–9, 105BPM; contributor notation.
- **Somebody That I Used to Know**: [notation](https://www.songsterr.com/a/wsa/tab-s90561), revision9198456, part5, measures1–5, 129BPM; contributor notation.
- **Someone Like You**: [notation](https://www.songsterr.com/a/wsa/tab-s85828), revision6672523, part0, measures4–8, 67BPM; contributor notation.
- **Someone You Loved**: [notation](https://www.songsterr.com/a/wsa/tab-s459384), revision9600366, part0, measures5–9, 110BPM; contributor notation.
- **Something Just Like This**: [notation](https://www.songsterr.com/a/wsa/tab-s433186), revision327234, part0, measures1–4, 103BPM; contributor notation.
- **Sorry**: [notation](https://www.songsterr.com/a/wsa/tab-s402695), revision275703, part0, measures1–4, 95BPM; contributor notation.
- **Sprinter**: [notation](https://www.songsterr.com/a/wsa/tab-s2607307), revision5522291, part0, measures1–4, 140BPM; contributor notation.
- **Stairway to Heaven**: [notation](https://www.songsterr.com/a/wsa/tab-s27), revision9854813, part0, measures16–20, 71BPM; contributor notation.
- **STAR WALKIN’**: [notation](https://www.songsterr.com/a/wsa/tab-s523638), revision565685, part1, measures8–12, 142BPM; contributor notation.
- **Starboy**: [notation](https://www.songsterr.com/a/wsa/tab-s2054041), revision2731261, part0, measures15–18, 93BPM; automated transcription.
- **Start a Riot**: [notation](https://www.songsterr.com/a/wsa/tab-s1275238), revision1702853, part0, measures11–14, 72BPM; automated transcription.
- **STAY**: [notation](https://www.songsterr.com/a/wsa/tab-s544886), revision7682773, part0, measures49–53, 170BPM; contributor notation.
- **Stick Season**: [notation](https://www.songsterr.com/a/wsa/tab-s580153), revision9860471, part0, measures2–6, 118BPM; contributor notation.
- **Story of My Life**: [notation](https://www.songsterr.com/a/wsa/tab-s1001679), revision1347571, part0, measures1–4, 120BPM; contributor notation.
- **Stressed Out**: [notation](https://www.songsterr.com/a/wsa/tab-s434154), revision8384856, part0, measures22–25, 170BPM; contributor notation.
- **Sucker for Pain**: [notation](https://www.songsterr.com/a/wsa/tab-s1117395), revision1488323, part0, measures4–7, 84BPM; automated transcription.
- **Summertime Sadness**: [notation](https://www.songsterr.com/a/wsa/tab-s379128), revision6369884, part0, measures9–12, 110BPM; contributor notation.
- **Sunflower**: [notation](https://www.songsterr.com/a/wsa/tab-s454820), revision394144, part5, measures37–40, 180BPM; contributor notation.
- **Sweater Weather**: [notation](https://www.songsterr.com/a/wsa/tab-s392323), revision4116946, part0, measures75–78, 122BPM; contributor notation.
- **Sweet Child O’ Mine**: [notation](https://www.songsterr.com/a/wsa/tab-s23), revision9839390, part0, measures25–28, 126BPM; contributor notation.
- **Take Me to Church**: [notation](https://www.songsterr.com/a/wsa/tab-s519287), revision1931516, part0, measures1–5, 64BPM; contributor notation.
- **Take on Me**: [notation](https://www.songsterr.com/a/wsa/tab-s357329), revision6220359, part2, measures37–40, 169BPM; contributor notation.
- **Tell Me**: [notation](https://www.songsterr.com/a/wsa/tab-s5640532), revision7371209, part4, measures8–12, 129BPM; automated transcription.
- **That’s So True**: [notation](https://www.songsterr.com/a/wsa/tab-s1040656), revision3418840, part0, measures61–64, 109BPM; contributor notation.
- **That’s What I Like**: [notation](https://www.songsterr.com/a/wsa/tab-s643960), revision6382921, part0, measures1–4, 134BPM; contributor notation.
- **The First Time**: [notation](https://www.songsterr.com/a/wsa/tab-s4850445), revision6404303, part0, measures1–4, 129BPM; contributor notation.
- **The Night We Met**: [notation](https://www.songsterr.com/a/wsa/tab-s518141), revision8040241, part0, measures17–23, 87BPM; contributor notation.
- **THE SHADE**: [notation](https://www.songsterr.com/a/wsa/tab-s844495), revision9838803, part4, measures9–13, 122BPM; automated transcription.
- **Thinking Out Loud**: [notation](https://www.songsterr.com/a/wsa/tab-s393812), revision6725765, part0, measures1–5, 158BPM; contributor notation.
- **Those Eyes**: [notation](https://www.songsterr.com/a/wsa/tab-s677194), revision823580, part0, measures1–6, 120BPM; automated transcription.
- **Till I Collapse**: [notation](https://www.songsterr.com/a/wsa/tab-s61275), revision4990134, part0, measures61–64, 160BPM; contributor notation.
- **Treat You Better**: [notation](https://www.songsterr.com/a/wsa/tab-s446584), revision8585356, part3, measures2–5, 83BPM; contributor notation.
- **DIE TRYING**: [notation](https://www.songsterr.com/a/wsa/tab-s1030383), revision2555829, part0, measures1–5, 110BPM; contributor notation.
- **Two Moons**: [notation](https://www.songsterr.com/a/wsa/tab-s839413), revision1083721, part0, measures1–4, 110BPM; automated transcription.
- **undressed**: [notation](https://www.songsterr.com/a/wsa/tab-s1288517), revision5459287, part0, measures5–8, 116BPM; contributor notation.
- **Unsweetened Lemonade**: [notation](https://www.songsterr.com/a/wsa/tab-s6440703), revision8427399, part0, measures3–6, 120BPM; contributor notation.
- **Uptown Funk**: [notation](https://www.songsterr.com/a/wsa/tab-s1135119), revision1518552, part0, measures1–4, 115BPM; contributor notation.
- **Viva La Vida**: [notation](https://www.songsterr.com/a/wsa/tab-s10136), revision8811167, part0, measures8–12, 138BPM; contributor notation.
- **Wake Me Up**: [notation](https://www.songsterr.com/a/wsa/tab-s386162), revision1054635, part0, measures1–4, 130BPM; contributor notation.
- **THATS WHAT I WANT**: [notation](https://www.songsterr.com/a/wsa/tab-s680335), revision5751025, part0, measures2–6, 88BPM; contributor notation.
- **Water Fountain**: [notation](https://www.songsterr.com/a/wsa/tab-s1874876), revision5315964, part0, measures11–14, 134BPM; contributor notation.
- **Watermelon Sugar**: [notation](https://www.songsterr.com/a/wsa/tab-s501720), revision7399049, part0, measures1–5, 95BPM; contributor notation.
- **What Makes You Beautiful**: [notation](https://www.songsterr.com/a/wsa/tab-s92466), revision4932779, part0, measures4–8, 123BPM; contributor notation.
- **Whats Poppin (feat. DaBaby, Tory Lanez & Lil Wayne) [Remix] - Bonus Track**: [notation](https://www.songsterr.com/a/wsa/tab-s1157105), revision1543269, part0, measures13–16, 145BPM; automated transcription.
- **When I Was Your Man**: [notation](https://www.songsterr.com/a/wsa/tab-s381965), revision221390, part0, measures1–4, 72BPM; contributor notation.
- **White Ferrari**: [notation](https://www.songsterr.com/a/wsa/tab-s3830469), revision5034931, part4, measures1–4, 109BPM; contributor notation.
- **WILDFLOWER**: [notation](https://www.songsterr.com/a/wsa/tab-s635536), revision1817710, part1, measures10–13, 148BPM; contributor notation.
- **Without Me**: [notation](https://www.songsterr.com/a/wsa/tab-s23118), revision7599456, part7, measures1–5, 112BPM; contributor notation.
- **Wonderwall**: [notation](https://www.songsterr.com/a/wsa/tab-s2), revision9711655, part0, measures9–13, 88BPM; contributor notation.
- **Yellow**: [notation](https://www.songsterr.com/a/wsa/tab-s434), revision6980663, part0, measures13–17, 87BPM; contributor notation.
- **You Belong with Me**: [notation](https://www.songsterr.com/a/wsa/tab-s60287), revision8492135, part0, measures5–8, 130BPM; contributor notation.
- **Die Young**: [notation](https://www.songsterr.com/a/wsa/tab-s368695), revision1493960, part1, measures1–4, 128BPM; contributor notation.
- **Zombie**: [notation](https://www.songsterr.com/a/wsa/tab-s431), revision9450370, part0, measures17–21, 83BPM; contributor notation.
