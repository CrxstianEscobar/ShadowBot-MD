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

// *[ ❀ BRAT  ]*


import axios from 'axios'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ ingresa un texto`, m)
  
try {
let api = `https://api.siputzx.my.id/api/m/brat?text=${text}`
let json = await axios.get(api, { responseType: 'arraybuffer'})
let img = Buffer.from(json.data, 'binary')
await conn.sendMessage(m.chat, { sticker: img }, { quoted: m })

} catch (error) {
console.error(error)    
}}

handler.command = ['brat4']

export default handler