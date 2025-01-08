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

// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`)
let json = await api.json()
let { title, views, likes, description, author } = json.metadata
let HS = `- *Titulo :* ${title}
- *Descripcion :* ${description}
- *Visitas :* ${views}
- *Likes :* ${likes}
- *Autor :* ${author}
- *Tamaño :* ${json.downloads.size}
`
await conn.sendFile(m.chat, json.downloads.url, 'HasumiBotFreeCodes.mp4', HS, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp4)$/i

export default handler