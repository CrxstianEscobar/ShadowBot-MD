/* ౨ৎ ˖ ࣪⊹ 𝐁𝐲 𝐉𝐭𝐱𝐬 𐙚˚.ᡣ𐭩

❀ Canal Principal ≽^•˕• ྀི≼
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

❀ Canal Rikka Takanashi Bot
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

❀ Canal StarlightsTeam
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

❀ HasumiBot FreeCodes 
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *𓍯𓂃𓏧♡  PINTEREST - SEARCH*
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para buscar en pinterest`, m)
  
try {
let api = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${text}`)
let json = api.data
let data = json.data[Math.floor(Math.random() * json.data.length)]

let { pin, created_at, images_url, grid_title } = data
let HS = `- *Titulo :* ${grid_title}
- *Creado :* ${created_at}
- *link :* ${pin}`
await conn.sendMessage(m.chat, { image: { url: images_url }, caption: HS }, { quoted: m })
//await conn.sendMessage(m.chat, { image: images_url, caption: HS, footer: '', buttons: [ { buttonId: `.pinterest ${text}`, buttonText: { displayText: 'Siguiente' } }, ], viewOnce: true, headerType: 4 }, { quoted: m })
    
} catch (error) {
console.error(error)
}}

HS.command = ['pinterest4', 'pinterestsearch4']

export default HS