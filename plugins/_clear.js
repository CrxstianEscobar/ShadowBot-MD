/*import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/video/g.test(mime)) {
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
      let img = await q.download?.()
      let stiker = false
      try {
        let pack = `ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856`
        let author = `\n\n☕ Bᴏᴛ:\n↳ お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳ ${username}`
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, pack, author)
        }
      }
      m.reply(stiker)
    } else {
      conn.reply(m.chat, '*[ ℹ️ ] Responde a una imágen o video la cual será convertido en sticker.*', m)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
  }
}

handler.help = ['sticker3']
handler.tags = ['sticker3']
handler.command = ['s3', 'sticker3']
handler.register = true

export default handler

async function createSticker(img, url, packName, authorName, quality = 'best') {
  let stickerMetadata = {
    type: 'full',
    pack: packName,
    author: authorName,
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}



import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let userName = m.pushName || "Usuario" // Obtiene el nombre del usuario

    if (/video/g.test(mime)) {
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
      let img = await q.download?.()
      let stiker = false
      try {

        let pack = `ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856`
        let author = `\n\n☕ Bᴏᴛ:\n↳ お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳${userName}`
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, pack, author)
        }
      }
      m.reply(stiker)
    } else {
      conn.reply(m.chat, '*[ ℹ️ ] Responde a una imágen o video la cual será convertido en sticker.*', m)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error')
  }
}

handler.help = ['sticker3']
handler.tags = ['sticker3']
handler.command = ['s3', 'sticker3']
handler.register = true

export default handler

async function createSticker(img, url, packName, authorName, quality = 'best') {
  let stickerMetadata = {
    type: 'full',
    pack: 'pack',
    author: 'author',
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
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let userName = m.pushName || "Usuario" // Obtiene el nombre del usuario

    // Pack y autor usados en cualquier conversión
    let pack = `ꨴ 🤍꣺ꤪ꤬꤯ꨬꨶ ̷̸̲̼̈́ Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡\n↳@heavenly_team\n\n👹 Iɴғᴏ:\n↳Wa.me/51927238856`
    let author = `\n\n☕ Bᴏᴛ:\n↳ お 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 - 𝑴𝑫\n\n🍨 Usᴜᴀʀɪᴏ:\n↳${userName}`

    let stiker = false
    let img = await q.download?.()
    
    if (!img) {
      return m.reply(`*[ ℹ️ ] Responde a una imagen o video con el comando:* _${usedPrefix + command}_`)
    }

    if (/video/g.test(mime)) {
      if ((q.msg || q).seconds > 10) return m.reply('*[ ℹ️ ] Máximo 10 segundos.*')

      try {
        stiker = await sticker(img, false, pack, author)
      } catch (e) {
        console.error(e)
      }

      if (!stiker) {
        let out = await uploadFile(img)
        stiker = await sticker(false, out, pack, author)
      }
    } else if (/image/g.test(mime)) {
      try {
        stiker = await addExif(img, pack, author)
      } catch (e) {
        console.error(e)
      }

      if (!stiker) {
        stiker = await createSticker(img, false, pack, author)
      }
    } else {
      return conn.reply(m.chat, '*[ ℹ️ ] Responde a una imagen o video para convertirlo en sticker.*', m)
    }

    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else {
      conn.reply(m.chat, '*[ ℹ️ ] No se pudo generar el sticker.*', m)
    }
  } catch (e) {
    console.error(e)
    m.reply('Error al generar el sticker.')
  }
}

handler.help = ['sticker3']
handler.tags = ['sticker3']
handler.command = ['s3', 'sticker3']
handler.register = true

export default handler

// Función corregida: Ahora usa packName y authorName correctamente
async function createSticker(img, url, packName, authorName, quality = 'best') {
  let stickerMetadata = {
    type: 'full',
    pack: packName,  // Ahora usa el texto personalizado correctamente
    author: authorName,  // Ahora usa el texto personalizado correctamente
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}