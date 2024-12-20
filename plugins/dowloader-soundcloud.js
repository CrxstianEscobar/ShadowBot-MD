import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Hace falta el título del audio de SoundCloud.*`, m, rcanal)

await m.react('🕒');
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
let json = await api.json();
let { url } = json[0];

let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
let json2 = await api2.json();

let { link: dl_url, quality, image } = json2;

let audio = await getBuffer(dl_url);

let txt = `*_SOUND CLOUD MUSIC_*\n\n`;
    txt += `▢ *Título:* ${json[0].title}\n`;
    txt += `▢ *Calidad:* ${quality}\n`;
    txt += `▢ *Url:* ${url}\n\n`;
    txt += `> *[ ℹ️ ] Se está enviando el audio, espere...*`

/*
await conn.sendMessage(m.chat, { 
  text: txt, 
  contextInfo: { 
    externalAdReply: { 
      title: json[0].title, 
      body: wm, 
      thumbnailUrl: image, 
      mediaType: 1, 
      showAdAttribution: true, 
      renderLargerThumbnail: true
    } 
  } 
}, { 
  quoted: m 
});
*/
conn.sendMessage(m.chat, {
  text: txt,
  contextInfo: {
    externalAdReply: {
      title: json[0].title,
      body: wm,
      thumbnailUrl: getBuffer(json[0].thumbnail, { width: 400, height: 200 }), mediaType: 1, // Agrega la URL de la imagen aquí
      mediaType: 1,
      showAdAttribution: true,
      renderLargerThumbnail: true
    }
  }
}, { quoted: m })

await conn.sendMessage(m.chat, { 
  audio: audio, 
  fileName: `${json[0].title}.mp3`, 
  mimetype: 'audio/mpeg' 
}, { 
  quoted: m 
})

//await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null, rcanal);
//await conn.sendMessage(m.chat, { audio: audio, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })

await m.react('✅');
} catch {
await m.react('✖️');
}}

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound', 'play']

export default handler

const getBuffer = async (url, options) => {
try {
const res = await axios({
method: 'get',
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1,
},
...options,
responseType: 'arraybuffer',
});
return res.data;
} catch (e) {
console.log(`Error : ${e}`);
}
};