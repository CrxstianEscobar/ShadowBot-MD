let handler = async (m, { conn, command, text }) => {
if (!text) return m.reply(`*[ ℹ️ ] Etiqueta a un usuario para ${command.replace('how', '')}*`)
try {
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
m.reply(`ⓘ _Acabas de follar a ${text} poniendola en 4 como una perra, la hicistes garganta profunda y le reventaste la vagina mientras te gemia, posiblemente haya quedado embarazada. 🤰🏻_

_${text} ya te follaron 🔥_`, null, { mentions: [user] })
} catch (err) {
}}
handler.help = ['follar']
handler.tags = ['fun']
handler.command = /^(follar|kchar|reventar|penetrar|coger)/i

handler.register = true
export default handler