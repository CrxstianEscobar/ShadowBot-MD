import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let edtr = `@${m.sender.split`@`[0]}`

let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;Crxstian Escobar\nNICKNAME:Bk_Criss\nORG:Criss_7\nTITLE:soft\nitem1.TEL;waid=51927238856:+51 927 238 856\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:https://github.com/CrxstianEscobar/ShadowBot-MD\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: shadow_bot@gmail.com\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;🇵🇪 Perú;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🌙 08/10/2004\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: packname, contacts: [{ vcard }] }}, { quoted: fkontak })
let caption = `*[ 🧃 ] Hola ${edtr}, ese es el contacto de mi creador*`
    await conn.reply(m.chat, caption, tag_own, { mentions: conn.parseMention(caption) })

}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|propietario|creator|creador|dueño)$/i

export default handler
