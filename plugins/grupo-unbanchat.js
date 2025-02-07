let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, `¡Este chat no está registrado!.`, m)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, `*Shadow* ya estába activado.`, m)
chat.isBanned = false
await conn.reply(m.chat, `Has *activado* a *Shadow*!`, m)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['unbanchat', 'ubc']
handler.rowner = true
handler.group = true

export default handler