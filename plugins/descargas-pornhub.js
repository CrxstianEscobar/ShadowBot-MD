import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    // Obtenemos el nombre del usuario
    let userName = m.pushName || 'Usuario'

    if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
      let img = await q.download?.()
      if (!img) throw m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)

      let packName = 'Shadow'
      let authorName = `by: ${userName}` // Aquí usamos el nombre del usuario

      let stiker = false
      try {
        stiker = await sticker(img, false, packName, authorName)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          let out = await uploadFile(img)
          stiker = await sticker(false, out, packName, authorName)
        }
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else if (/image/g.test(mime)) {
      let packName = args[0] || 'Shadow'
      let authorName = args[1] || `by: ${userName}` // Aquí también usamos el nombre del usuario

      let img = await q.download?.()
      let stiker = false
      try {
        let pack = 'hola'
        let author = `Used by: ${userName}` // Aquí también se coloca el nombre
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, packName, authorName)
        }
      }
      m.reply(stiker)
    } else {
      conn.reply(m.chat, '*[ ☕ ] Responde a una imagen o video para convertirlo en sticker.*', m, rcanal)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
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