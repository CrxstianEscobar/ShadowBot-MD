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

// *[ ❀ FACEBOOK DL ]*
import fetch from 'node-fetch'

let handler = async (m, { text, conn, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de facebook`, m)


try {
let apisearch = await fetch(`https://api.agatz.xyz/api/facebook?url=${text}`)
let json = await apisearch.json()
let { sd, hd, title, thumbnail } = json.data
await conn.sendFile(m.chat, thumbnail, 'HasumiBotFreeCodes.jpg', null, m)
await conn.sendFile(m.chat, sd || hd, 'HasumiBotFreeCodes.mp4', title, m)
} catch (error) {
console.log(error)
}}

handler.command = /^(facebook22)$/i

export default handler