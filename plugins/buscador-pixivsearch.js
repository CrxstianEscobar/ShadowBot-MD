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

// *[ ❀ PIXIV SEARCH ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieres buscar`, m)

try {
let api = await fetch(`https://api.vreden.web.id/api/pixiv-r18?query=${text}`)
let json = await api.json()
if (!json.result) {
return conn.reply(m.chat, '❀ Sin resultados', m)
}
let res = json.result[Math.floor(Math.random() * json.result.length)]
if (!res || !res.title || !res.urls || !res.urls.regular) {
return conn.reply(m.chat, '❀ Sin resultados', m)
}
let { title, urls } = res
await conn.sendFile(m.chat, urls.regular, 'HasumiBotFreeCodes.jpg', title, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(pixivsearch)$/i

export default handler