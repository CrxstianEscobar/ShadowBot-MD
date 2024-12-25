let handler = async (m, { conn, command, text }) => {
if (!text) return m.reply(`*Ingresa el @ o el nombre de la persona que quieras saber si te puedes ${command.replace('how', '')}*`)
try {
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
m.reply(`ⓘ _Acabas de follar a ${text} poniendola en 4 como una perra, la hicistes garganta profunda y le reventaste la vagina mientras te gemia, posiblemente haya quedado embarazada. 🤰🏻_

_${text} ya te follaron 🔥_`, null, { mentions: [user] })
} catch (err) {
}}
handler.help = ['follar']
handler.tags = ['fun']
handler.command = /^(Follar|violar)/i

handler.register = true
export default handler