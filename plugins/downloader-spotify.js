import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 'ℹ️ *Ingresa un link de Instagram*')
  }
  try {
    await m.react('⏳️')
    conn.reply(m.chat, `🍧 *Enviando El Video...*`)
    let res = await igdl(args[0])
    let data = res.data
    for (let media of data) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '🎞️ *Tu video de instagram.*')
    }
  } catch {
    await m.react('❌')
    conn.reply(m.chat, '⚙️ Ocurrió un error.')
  }
}

handler.command = ['instagram2', 'ig2']
handler.tags = ['descargas']
handler.help = ['instagram2', 'ig2']
handler.group = true
handler.register = true

export default handler