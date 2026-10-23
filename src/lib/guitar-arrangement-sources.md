# Guitar arrangement references

The quiz has 43 playable, synthesized guitar reductions and ten questions per run. The owner's supplied list contains 199 ordered tracks. The combined catalogue keeps 233 unique song identities, including older requests and Spotify selections. A catalogue entry does not imply a playable arrangement; only the 43 reviewed clips enter the question pool.

These are excerpts, not complete transcriptions or studio recordings. Forty-two clips use pinned human-contributor Songsterr notation, and Game of Thrones uses the score references below. Source labels exclude AI-generated entries, but contributor notation is not an official artist score or independent proof that every note matches a recording. No human listening comparison with every original recording is claimed.

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

`guitar-arrangements.json` records each source's exact song ID, revision, instrument part, measure range, octave shift and tempo conversion. The runtime reads local note data and makes no Songsterr or Spotify requests. Pinned revisions prevent upstream edits from silently changing the bank.

The source comparison independently reconstructs rational durations, dots, tuplets, ties and rests. All 42 tab-backed clips match their referenced source within the documented reduction rules. The browser check compares the actual Web Audio clock onsets and note-off times with all 43 scheduled scores. Waveform checks cover every MIDI pitch used at both 44.1 and 48 kHz. Those checks establish source fidelity, clock timing and generated pitch; they do not establish perceptual identity with the original recording.

Clips target 16 scheduler beats or 12 seconds, whichever is shorter. One whole-octave shift fits each phrase to the guitar while preserving pitch classes and intervals. Simultaneous notes retain the chord, duplicate unisons merge, and chords use distinct strings. Homecoming omits piano bass below MIDI 48. Ties extend the existing note instead of retriggering it. Leading empty measures are skipped, while internal rests remain.

Bends, slides, vibrato, dead notes, accents, ghost-note dynamics and production effects are not reproduced. The source's live Mind Over Matter arrangement is kept distinct from the owner's requested Mind Over Matter (Reprise), which remains pending. Other catalogue entries stay unavailable as questions until they have usable notation and timing checks.

## Pinned excerpt sources

- **505**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s25735), revision 9657303, part 5, measures 1–4; playback 140 BPM.
- **Another Love**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s518274), revision 512853, part 0, measures 1–4; playback 120 BPM.
- **Best Song Ever**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s421915), revision 2937227, part 0, measures 7–10; playback 119 BPM.
- **Little Bit Better**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s5473644), revision 7156897, part 4, measures 9–13; playback 138 BPM.
- **blue**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s856707), revision 6818752, part 2, measures 1–6; playback 97 BPM.
- **Take Me Home, Country Roads**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s71885), revision 6379322, part 0, measures 3–7; playback 82 BPM.
- **Dandelions**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s514291), revision 675073, part 0, measures 5–8; playback 78 BPM.
- **Am I Dreaming**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s832665), revision 1072469, part 0, measures 1–4; playback 90 BPM.
- **drivers license**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s799324), revision 1018844, part 0, measures 2–5; playback 72 BPM.
- **Fireflies**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s60391), revision 6717299, part 6, measures 1–4; playback 90 BPM.
- **Glimpse of Us**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s510775), revision 8166361, part 0, measures 9–14; playback 85 BPM.
- **good 4 u**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s487830), revision 8747472, part 0, measures 6–10; playback 169 BPM.
- **GOSSIP**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s530949), revision 9897805, part 2, measures 1–4; playback 140 BPM.
- **her**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s3232440), revision 4243940, part 4, measures 5–8; playback 144 BPM.
- **Homecoming**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s40241), revision 55101, part 0, measures 1–4; playback 122 BPM.
- **Line Without a Hook**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s636342), revision 1257244, part 0, measures 51–56; playback 95 BPM.
- **I Love You, I'm Sorry**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s737551), revision 4467198, part 3, measures 1–6; playback 87 BPM.
- **If We Have Each Other**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s1019939), revision 1380047, part 0, measures 2–5; playback 86 BPM.
- **Interlude: I’m Not Angry Anymore**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s753993), revision 9661439, part 0, measures 2–5; playback 113 BPM.
- **Out of My League**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s523206), revision 523244, part 1, measures 2–5; playback 170 BPM.
- **less**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s5595709), revision 8103916, part 0, measures 5–8; playback 82 BPM.
- **Lucid Dreams**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s444983), revision 7967013, part 3, measures 1–4; playback 84 BPM.
- **Mind Over Matter**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s698143), revision 858197, part 0, measures 1–4; playback 152 BPM.
- **Make You Mine**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s588481), revision 698208, part 0, measures 1–4; playback 103 BPM.
- **No Role Modelz**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s629874), revision 1376891, part 0, measures 1–4; playback 100 BPM.
- **Oceans (Where Feet May Fail)**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s471916), revision 937452, part 0, measures 9–13; playback 140 BPM.
- **we fell in love in october**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s476422), revision 9403406, part 2, measures 1–4; playback 130 BPM.
- **when the party’s over**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s450297), revision 395195, part 1, measures 13–18; playback 124 BPM.
- **Sailor Song**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s685717), revision 4489273, part 0, measures 1–5; playback 95 BPM.
- **Self Aware**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s4438767), revision 8754668, part 8, measures 6–10; playback 81 BPM.
- **Self Love (Spider-Man: Across the Spider-Verse) (Metro Boomin & Coi Leray)**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s804658), revision 1079122, part 0, measures 5–8; playback 120 BPM.
- **Shape of You**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s435294), revision 334724, part 0, measures 1–4; playback 96 BPM.
- **SICKO MODE**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s857391), revision 1114979, part 0, measures 1–4; playback 155 BPM.
- **Die With a Smile**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s702803), revision 8777153, part 0, measures 2–7; playback 78 BPM.
- **Snowman**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s497416), revision 9502039, part 0, measures 4–9; playback 105 BPM.
- **Stick Season**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s580153), revision 9860471, part 0, measures 2–6; playback 118 BPM.
- **Summertime Sadness**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s379128), revision 6369884, part 0, measures 9–12; playback 110 BPM.
- **The First Time**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s4850445), revision 6404303, part 0, measures 1–4; playback 129 BPM.
- **DIE TRYING**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s1030383), revision 2555829, part 0, measures 1–5; playback 110 BPM.
- **THATS WHAT I WANT**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s680335), revision 5751025, part 0, measures 2–6; playback 88 BPM.
- **White Ferrari**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s3830469), revision 5034931, part 4, measures 1–4; playback 109 BPM.
- **WILDFLOWER**: [contributor tab](https://www.songsterr.com/a/wsa/tab-s635536), revision 1817710, part 1, measures 10–13; playback 148 BPM.
