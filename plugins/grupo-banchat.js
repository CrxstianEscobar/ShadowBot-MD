let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `*[ ℹ️ ] Se desactivó Shadow en este grupo.*`, m)

}
handler.help = ['banchat']
handler.tags = ['grupo']
handler.command = ['banchat']

handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler