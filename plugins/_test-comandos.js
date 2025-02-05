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
*/

import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let userName = m.pushName || "Usuario" // Obtiene el nombre del usuario

    if (!mime) return m.reply('*[ ℹ️ ] Responde a una imagen o video para convertirlo en sticker.*')

    let img = await q.download?.()
    if (!img) return m.reply('*[ ℹ️ ] No se pudo descargar el archivo. Inténtalo de nuevo.*')

    let pack = `ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856`
    let author = `\n\n☕ Bᴏᴛ:\n↳ お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳${userName}`

    let stiker = false

    try {
      if (/video/g.test(mime)) {
        if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
        stiker = await sticker(img, false, global.stickpack, global.stickauth)
      } else if (/image/g.test(mime)) {
        stiker = await addExif(img, pack, author)
      }

      if (!stiker) throw new Error('Error en la conversión de sticker')
    } catch (e) {
      console.error('Error al generar sticker:', e)
      stiker = await createSticker(img, false, pack, author) // Intenta con createSticker() si addExif falla
    }

    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else {
      m.reply('*[ ❌ ] No se pudo generar el sticker.*')
    }
  } catch (e) {
    console.error('Error general:', e)
    m.reply('*[ ❌ ] Hubo un error al procesar el sticker.*')
  }
}

handler.help = ['sticker4']
handler.tags = ['sticker4']
handler.command = ['s4', 'sticker4']
handler.register = true

export default handler

async function createSticker(img, url = false, packName, authorName, quality = 'best') {
  let stickerMetadata = {
    type: 'full',
    pack: packName,
    author: authorName,
    quality
  }
  return (new Sticker(img || url, stickerMetadata)).toBuffer()
}