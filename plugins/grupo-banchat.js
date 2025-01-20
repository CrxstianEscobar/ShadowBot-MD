/*let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    await conn.reply(m.chat, `*[ ℹ️ ] Se desactivó Shadow en este grupo.*`, m)
    await m.react('😿')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 
export default handler*/
let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

    if (!global.db.data.chats[m.chat].isBanned) {
        return await conn.reply(m.chat, '*[ ⚠️ ] Shadow ya estaba activo en este grupo.*', m)
    }

    global.db.data.chats[m.chat].isBanned = false
    await conn.reply(m.chat, '*[ ℹ️ ] Se activó Shadow en este grupo.*', m)
    await m.react('😼')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true 
export default handler
