/*let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '🎌 *¡Este chat no está registrado!*', m)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '[🌠] *El bot no está baneado en este chat*', m)
chat.isBanned = false
await conn.reply(m.chat, `ya fué desbaneado en este chat*`, m)
}
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = ['unbanchat','desbanearchat','desbanchat']
//handler.mods = true
handler.botAdmin = false
handler.group = false

export default handler*/

let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = false
conn.reply(m.chat, `*[ ℹ️ ] Se activó Shadow en este grupo.*`, m)

}
handler.help = ['unbanchat']
handler.tags = ['grupo']
handler.command = ['unbanchat']

handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler