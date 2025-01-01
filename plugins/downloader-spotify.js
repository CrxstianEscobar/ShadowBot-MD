import _ from "lodash"

let handler = async (m, { conn, command, usedPrefix, args }) => {
  const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || ""
  if (typeof text !== 'string' || !text.trim()) return m.reply(`✦ Ingresa una consulta\n*Ejemplo:* .${command} Joji Ew`)

  await m.reply('✦ Espere un momento...')
  
let d2 = await fetch(`https://rest.cifumo.biz.id/api/downloader/spotify-search?q=${text}`)
  let ds = await d2.json()
const dps = await fetch(`https://rest.cifumo.biz.id/api/downloader/spotify-dl?url=${ds.data[0].url}`)
  const dp = await dps.json()

  const { title = "No encontrado", type = "No encontrado", artis = "No encontrado", durasi = "No encontrado", download, image } = dp.data

  const captvid = ` *✦Título:* ${title}
 *✧Popularidad:* ${ds.data[0].popularity}
 *✦Tipo:* ${type}
 *✧Artista:* ${artis}
 *✦link:* ${text}
 `

  const spthumb = (await conn.getFile(image))?.data

  const infoReply = {
    contextInfo: {
      externalAdReply: {
        body: `✧ En unos momentos se entrega su audio`,
        mediaType: 1,
        mediaUrl: text,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: text,
        thumbnail: spthumb,
        title: `S P O T I F Y - A U D I O`
      }
    }
  }

  await conn.reply(m.chat, captvid, m, infoReply)
  infoReply.contextInfo.externalAdReply.body = `Audio descargado con éxito`
  
    await conn.sendMessage(m.chat, {
      audio: { url: download },
      caption: captvid,
      mimetype: "audio/mpeg",
      contextInfo: infoReply.contextInfo
    }, { quoted: m })
}

handler.help = ["spotifyplay *<consulta>*"]
handler.tags = ["downloader"]
handler.command = /^(spotifyplay|splay)$/i
handler.limit = true
export default handler