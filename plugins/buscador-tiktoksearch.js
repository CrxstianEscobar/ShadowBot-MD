/*import yts from "yt-search";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Por favor, proporciona el nombre de la canción o el artista para buscar.\n\nEjemplo: ${usedPrefix + command} elaina`);

  let results = await yts(text);
  let videos = results.videos.slice(0, 6);

  let mensaje = "Resultados de la búsqueda:\n\n";
  for (let video of videos) {
    mensaje += `* ${video.title} - ${video.timestamp}\n`;
  }

  m.reply(mensaje);
};

handler.help = ["yts *<consulta>*"];
handler.tags = ["search"];
handler.command = ["yts"];

export default handler;*/

/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ TIKTOK SEARCH ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieres buscar`, m)

try {
let api = await fetch(`https://api.agatz.xyz/api/tiktoksearch?message=${text}`)
let json = await api.json()
let { title, no_watermark, music } = json.data
await conn.sendFile(m.chat, no_watermark, 'HasumiBotFreeCodes.mp4', title, m)
await conn.sendFile(m.chat, music, 'HasumiBotFreeCodes.mp3', null, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(tiktoksearch)$/i

export default handler