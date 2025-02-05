/* 

❀ By JTxs

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ POR N HUB DL ]*
import fetch from 'node-fetch'

let HS = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '❀ ingresa un link de pornhub', m)
//si borras creditos eri gei 👀
try {
let api = await fetch(`https://www.dark-yasiya-api.site/download/phub?url=${text}`)
let json = await api.json()
let { video_title, video_uploader } = json.result
let { download_url, resolution, } = json.result.format[1]
await conn.sendMessage(m.chat, { video: { url: download_url }, caption: video_title }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['pornhubdl4']

export default HS
//Dejen creditos 👀 [ By Jtxs ] https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
