const handler = async (m, {text}) => {
  const user = global.db.data.users[m.sender];
  user.afk = + new Date;
  user.afkReason = text;
  m.reply(`*[ ℹ️ ] El usuario ${conn.getName(m.sender)} Estará inactivo (AFK), Por favor no lo etiqueten*\n\n*✧ Motivo de la inactividad:* ${text ? ': ' + text : ''}
`);
};
handler.help = ['afk [alasan]'];
handler.tags = ['main'];
handler.command = /^afk$/i;
export default handler;