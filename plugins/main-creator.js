/*
let handler = async (m, { conn, usedPrefix, isOwner }) => {
let txt_owner = "> _*`𝙷𝙾𝙻𝙰, 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙼𝙸 𝙲𝚁𝙴𝙰𝙳𝙾𝚁, 𝙲𝚄𝙰𝙻𝚀𝚄𝙸𝙴𝚁 𝙵𝙰𝙻𝙻𝙰 𝙾 𝚂𝙸 𝚀𝚄𝙸𝙴𝚁𝙴𝚂 𝙰𝙶𝚁𝙴𝙶𝙰𝚁 𝙴𝙻 𝙱𝙾𝚃 𝙰 𝚃𝚄 𝙶𝚁𝚄𝙿𝙾, 𝙿𝚄𝙴𝙳𝙴𝚂 𝙷𝙰𝙱𝙻𝙰𝚁𝙻𝙴`*_\n\n *Isa* : Wa.me/529831715910"
await conn.sendFile(m.chat, "https://i.ibb.co/s9N9QhG/file.jpg", 'thumbnail.jpg', txt_owner, m, null, rcanal)
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
*/


import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let edtr = `@${m.sender.split`@`[0]}`

let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;𝘾𝙧𝙞𝙨𝙩𝙞𝙖𝙣 𝙀𝙨𝙘𝙤𝙗𝙖𝙧\nNICKNAME:𝙐𝙨𝙭𝙧 𝘾𝙧𝙭𝙭𝙨 🥀\nORG:𝘾𝙧𝙞𝙨𝙩𝙞𝙖𝙣 𝙀𝙨𝙘𝙤𝙗𝙖𝙧\nTITLE:soft\nitem1.TEL;waid=51927238856:+51 927 238 856\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:https://github.com/CrxstianEscobar/ShadowBot-SX\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: centerglobalbots@gmail.com\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;🇵🇪 Perú;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🌙 08/10/2004\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: packname, contacts: [{ vcard }] }}, { quoted: fkontak })
let caption = `*_👋🏻 Hola ${edtr}, ese es el contacto de mi creador 🥀_*`
    await conn.reply(m.chat, caption, tag_own, { mentions: conn.parseMention(caption) })

}
handler.help = ['owner', 'creator']
handler.tags = ['main']
handler.command = /^(owner|propietario|creator|creador|dueño)$/i

export default handler