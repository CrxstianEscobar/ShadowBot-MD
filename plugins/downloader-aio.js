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

// *[ ❀ PLAY ]*
import fetch from 'node-fetch';
import yts from 'yt-search'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieres buscar`, m)
let res = await yts(text)
let vid = res.videos[0]

try {

let api = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${vid.url}&apikey=btzKiyoEditz`)
let json = await api.json()
let { title, description, id, thumb, source, mp3, mp4 } = json.result
let audio = {
audio: { url: mp3 }, mimetype: "audio/mp4", fileName: `${title}`,
contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 2,
mediaUrl: vid.url, sourceUrl: vid.url,
title: vid.title, body: null,
thumbnailUrl: thumb
}}}
await conn.sendMessage(m.chat, audio, { quoted: m })

await conn.sendMessage(m.chat, { video: { url: mp4 }, mimetype: 'video/mp4', fileName: `${title}.mp4`, caption: null }, { quoted: m })    
    
} catch (error) {
console.error(error)
}}

HS.command = ['play44']

export default HS