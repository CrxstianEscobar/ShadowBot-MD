let handler = async (m, { command, text }) => m.reply(`
*⁉️ 𝐏𝐑𝐄𝐆𝐔𝐍𝐓𝐀𝐒 ⁉️*
  
*Pregunta:* ${text}
*Respuesta:* ${['Si','Tal vez sí','Posiblemente','Probablemente no','No','Imposible'].getRandom()}
`.trim(), null, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})
handler.help = ['pregunta *<texto>*']
handler.tags = ['fun']
handler.command = /^pregunta|preguntas|apakah$/i
export default handler