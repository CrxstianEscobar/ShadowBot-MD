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

// *𓍯𓂃𓏧♡  FACEBOOK DL*

import cheerio from 'cheerio'
import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `*Ingresa un enlace de facebook*`, m, rcanal)

try {
let data = await fbdl(text)
let { sd, hd } = data 
await conn.sendFile(m.chat, sd || hd, 'Shadow.mp4', null, m)
} catch (error) {
console.error(error)
}}

HS.command = ['facebook2', 'fbdl2', 'fb2']

export default HS

async function fbdl(url) {
try {
const op = { method: "POST", body: new URLSearchParams({ URLz: url })},
response = await fetch("https://fdown.net/download.php", op),
html = await response.text(),
$ = cheerio.load(html)
return { sd: $("#sdlink").attr("href"), hd: $("#hdlink").attr("href") }
} catch (error) {
return console.error("Error:", error.message), null
}}