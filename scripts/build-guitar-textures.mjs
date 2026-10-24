import {readFileSync,writeFileSync} from 'node:fs';
const arrangements=JSON.parse(readFileSync(new URL('../src/lib/guitar-arrangements.json',import.meta.url),'utf8'));
const textures=Object.fromEntries(arrangements.map(a=>{const attacks=new Set(a.events.map(e=>e[0])).size;return [a.id,{bpm:a.bpm,density:attacks/a.beats,chord:a.events.length/attacks}]}));
writeFileSync(new URL('../src/lib/guitar-song-textures.json',import.meta.url),JSON.stringify(textures)+'\n');
