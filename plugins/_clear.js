import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    // Obtener el nombre del usuario limpiando caracteres no permitidos
    let userName = (m.pushName || 'Usuario').replace(/[^a-zA-Z0-9\s]/g, '')

    // Definir valores de pack y autor
    let packName = args[0] || 'ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856'
    let authorName = args[1] || `\n\n☕ Bᴏᴛ:\n↳ お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳${userName}`

    if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')

      let img = await q.download()
      if (!img) return m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)

      let stiker = false
      try {
        console.log('Intentando crear sticker desde video...')
        stiker = await sticker(img, false, packName, authorName)
      } catch (e) {
        console.error('Error en sticker():', e)
      }

      if (!stiker) {
        console.log('Intentando subir archivo para sticker...')
        let out = await uploadFile(img)
        stiker = await sticker(false, out, packName, authorName)
      }

      if (stiker) {
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      } else {
        m.reply('*[ ❌ ] Error al generar sticker.*')
      }
      
    } else if (/image/g.test(mime)) {
      let img = await q.download()
      if (!img) return m.reply(`*[ ℹ️ ] Responde a una Imagen con el comando:* _${usedPrefix + command}_`)

      let stiker = false
      try {
        console.log('Intentando agregar Exif a imagen...')
        stiker = await addExif(img, packName, authorName)
      } catch (e) {
        console.error('Error en addExif():', e)
      }

      if (!stiker) {
        console.log('addExif falló, intentando createSticker...')
        stiker = await createSticker(img, false, packName, authorName)
      }

      if (stiker) {
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      } else {
        m.reply('*[ ❌ ] Error al generar sticker.*')
      }

    } else {
      conn.reply(m.chat, '*[ ☕ ] Responde a una imagen o video para convertirlo en sticker.*', m)
    }
  } catch (e) {
    console.error('Error general:', e)
    m.reply('*[ ❌ ] Error interno, intenta nuevamente.*')
  }
}

handler.help = ['st']
handler.tags = ['sticker']
handler.command = ['st', 's2', 'sticker2']
handler.register = true

export default handler

async function createSticker(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: 'full',
    pack: packName,
    author: authorName,
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}