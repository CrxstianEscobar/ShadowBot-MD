/*
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let edtr = `@${m.sender.split`@`[0]}`

let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;𝘾𝙧𝙞𝙨𝙩𝙞𝙖𝙣 𝙀𝙨𝙘𝙤𝙗𝙖𝙧\nNICKNAME:𝙐𝙨𝙭𝙧 𝘾𝙧𝙭𝙭𝙨 🥀\nORG:𝘾𝙧𝙞𝙨𝙩𝙞𝙖𝙣 𝙀𝙨𝙘𝙤𝙗𝙖𝙧\nTITLE:soft\nitem1.TEL;waid=51927238856:+51 927 238 856\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:https://github.com/CrxstianEscobar/ShadowBot-MD\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: centerglobalbots@gmail.com\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;🇵🇪 Perú;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🌙 08/10/2004\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: packname, contacts: [{ vcard }] }}, { quoted: fkontak })
let caption = `*[ ☃️ ] Hola ${edtr}, ese es el contacto de mi creador*`
    await conn.reply(m.chat, caption, tag_own, { mentions: conn.parseMention(caption) })

}
handler.help = ['owner', 'creator']
handler.tags = ['main']
handler.command = /^(owner|propietario|creator|creador|dueño)$/i

export default handler
*/

import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `✧ Developer Bot `, `No famoso`, `m46234391@gmail.com`, `🇦🇷 Argentina`, `📍 https://github.com/MauroAzcurra`, `✧ Owner Waguri Ai`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `✧ Whatsapp Bot`, `✧ No hagas spam.`, `m46234391@gmail.com`, `🇦🇷 Argentina`, `📍 https://github.com/MauroAzcurra/Waguri-Ai`, `Si hay un error habla con mi owner ☺`]
  ], fkontak)
  await m.reply(`Hola @${m.sender.split(`@`)[0]} solo habla con mi Owner por temas del bot.`)
  } 

handler.help = ['owner', 'creador']
handler.tags = ['main', 'info']
handler.command = /^(owner|creador)/i
export default handler