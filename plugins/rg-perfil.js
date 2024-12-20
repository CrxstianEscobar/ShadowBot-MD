import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1)
let { level, exp, registered, regTime, age } = global.db.data.users[m.sender]
let username = conn.getName(who)
let txt = `
🚩 *PERFIL DE USUARIO*
☁️ *Nombre:* ${username}
💥 *Tag:* @${who.replace(/@.+/, '')}
🌀 *Registrado:* ${registered ? '✅': '❌'}
`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${txt.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler