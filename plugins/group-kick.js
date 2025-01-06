let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    let kickte = `*[ ℹ️ ] Menciona al usuario que deseas eliminar.*`

    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)})

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owr = m.chat.split`-`[0]

    // Verificamos si el usuario a eliminar es el creador del grupo
    let groupMetadata = await conn.groupMetadata(m.chat)
    let owner = groupMetadata.owner

    if (user === owner) {
        return m.reply(`*[ ℹ️ ] No puedes eliminar al creador del grupo.*`)
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    m.reply(`*Usuario eliminado.*`)
}

handler.help = ['kick *@user*']
handler.tags = ['gc']
handler.command = ['kick', 'expulsar', 'ban'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler