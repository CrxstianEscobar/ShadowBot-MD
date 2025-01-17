let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('mensaje de bienvenida configurado con éxito\n@user (Mención)\n@subject (Nombre del grupo)\n@desc (Descripción)')
  } else throw m.reply(`¿Y el texto?\n\nEjemplo:\n${usedPrefix + command} ¡Hola, @user!\nBienvenido al grupo @subject\n\n@desc`)
}
handler.help = ['setwelcome <txt>']
handler.tags = ['group']
handler.command = /^(setwelcome|setw)$/i
handler.group = true
handler.admin = true

export default handler
