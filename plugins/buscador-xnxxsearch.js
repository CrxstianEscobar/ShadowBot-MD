import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`• *Ejemplo :* ${usedPrefix + command} stepmoms`)
  let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`)
  let res = await response.json()

  if (res.status !== 200) throw m.reply(`API Error: ${res.creator}`)

  let resultText = ''
  for (let i = 0; i < res.data.result.length; i++) {
    let result = res.data.result[i]
    let hasil = `• Titulo: *${result.title}*\n• Info: *${result.info}*\n• Link: *${result.link}*\n`
    resultText += hasil + '\n'
  }

  let name = m.sender
  let fkonn = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '6285863907468@s.whatsapp.net' } : {})
    },
    message: {
      contactMessage: {
        displayName: await conn.getName(name),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }

  await conn.reply(m.chat, '*[ ℹ️ ] Espere un momento...*', fkonn)

  conn.sendMessage(m.chat, {
    text: resultText,
    contextInfo: {
      externalAdReply: {
        title: `Xnxx Videos`,
        body: wm,
        thumbnailUrl: "https://pomf2.lain.la/f/kro5qrjk.jpg",
        sourceUrl: "https://xxnx.com",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.command = ['xnxxsearch', 'xnxxs']
handler.help = ['xnxxsearch *<consulta>*']
handler.tags = ['nsfw','search']
handler.premium = false

export default handler