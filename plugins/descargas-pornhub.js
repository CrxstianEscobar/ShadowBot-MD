/*import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let userName = m.pushName || "Arrecho 3000" // Obtiene el nombre del usuario
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/video/g.test(mime)) {
      // Jalankan kode untuk video di sini
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
      let img = await q.download?.()
      if (!img) throw m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)
      let stiker = false
      try {
        stiker = await sticker(img, false, global.stickpack, global.stickauth)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          let out = await uploadFile(img)
          stiker = await sticker(false, out, global.stickpack, global.stickauth)
        }
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else if (/image/g.test(mime)) {
      // Jalankan kode untuk gambar di sini
      let [packname, ...author] = args.join` `.split`|`
      author = (author || []).join`|`
      let img = await q.download?.()
      let stiker = false
      try {
        let pack = 'Shadow'
        let author = 'Un insano'
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, packname, author)
        }
      }
      m.reply(stiker)
    } else {
      conn.reply(m.chat, '*[ ℹ️ ] Responde a una imágen o video la cual será convertido en sticker.*', m, rcanal)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
  }
}

handler.help = ['sticker5']
handler.tags = ['sticker']
handler.command = ['s5']
handler.register = true

export default handler

async function createSticker(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: 'full',
    pack: 'shadow',
    author: 'un insano',
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}*/

import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let userName = m.pushName || "Arrecho 3000" // Obtiene el nombre del usuario
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/video/g.test(mime)) {
      // Código para videos
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')
      let img = await q.download?.()
      if (!img) throw m.reply(`*[ ℹ️ ] Responde a un Vídeo con el comando:* _${usedPrefix + command}_`)
      let stiker = false
      try {
        stiker = await sticker(img, false, global.stickpack, global.stickauth)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          let out = await uploadFile(img)
          stiker = await sticker(false, out, global.stickpack, global.stickauth)
        }
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else if (/image/g.test(mime)) {
      // Código para imágenes
      let img = await q.download?.()
      let stiker = false
      try {
        let packname = 'Shadow'
        let author = 'Un insano'
        stiker = await addExif(img, packname, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false)
        }
      }
      m.reply(stiker)
    } else {
      conn.reply(m.chat, '*[ 👹 ] Responde a una imagen o video para convertirlo en sticker.*', m, rcanal)
    }
  } catch (e) {
    console.error(e)
    m.reply('*[ ❌ ] Hubo un error al generar el sticker.*')
  }
}

handler.help = ['sticker5']
handler.tags = ['sticker']
handler.command = ['s5']
handler.register = true

export default handler

// Función corregida para crear el sticker con valores fijos
async function createSticker(img, url, quality = 'high') {
  let stickerMetadata = {
    type: 'full',
    pack: 'Shadow',
    author: 'Un insano',
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}