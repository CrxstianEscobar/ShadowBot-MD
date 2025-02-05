/*import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let userName = m.pushName || "Usuario" // Obtiene el nombre del usuario

    if (/video/g.test(mime)) {
      // Jalankan kode untuk video di sini
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
      let img = await q.download?.()
      if (!img) throw m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)

      let packName = 'Shadow'
      let authorName = 'by ${userName}'

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
      // Jalankan kode untuk gambar di sini
      /*let [packname, ...author] = args.join` `.split`|`
      author = (author || []).join`|`*/
      let packName = args[0] || 'Shadow'
      let authorName = args[1] || 'by ${userName}'
      let img = await q.download?.()
      let stiker = false
      try {
        let pack = 'hola'
        let author = 'vv ${userName}'
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
      conn.reply(m.chat, '*[ 😏 ] Responde a una imágen o video la cual será convertido en sticker.*', m, rcanal)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
  }
}

handler.help = ['st']
handler.tags = ['sticker']

handler.command = ['st']
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
}*/


let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    let userName = await conn.getName(m.sender) || 'Usuario' // Obtiene el nombre del usuario

    if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
      let img = await q.download?.()
      if (!img) throw m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)

      let packName = 'Shadow'
      let authorName = `by: ${userName}` // Ahora aparece el nombre del usuario

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
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else if (/image/g.test(mime)) {
      let packName = args[0] || 'Shadow'
      let authorName = args[1] || `by: ${userName}` // Aquí también

      let img = await q.download?.()
      let stiker = false
      try {
        let pack = 'SHADOW'
        let author = `Used by: ${userName}` // Cambia el nombre en la metadata del sticker
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, packName, authorName)
        }
      }
      conn.sendMessage(m.chat, { text: `Aquí tienes tu sticker, ${userName}!` })
    } else {
      conn.reply(m.chat, '*[ 😏 ] Responde a una imagen o video para convertirlo en sticker.*', m)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
  }
}