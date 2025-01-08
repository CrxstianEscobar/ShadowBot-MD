export function before(m) {
  const user = global.db.data.users[m.sender];
  if (user.afk > -1) {
    m.reply(`
  *[❗𝐈𝐍𝐅𝐎❗] Dejaste de estar inactivo ${user.afkReason ? ' Por el motivo: ' + user.afkReason : ''}*
  
  *❀ Tiempo de inactividad: ${(new Date - user.afk).toTimeString()}*
  `.trim());
    user.afk = -1;
    user.afkReason = '';
  }
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
  for (const jid of jids) {
    const user = global.db.data.users[jid];
    if (!user) {
      continue;
    }
    const afkTime = user.afk;
    if (!afkTime || afkTime < 0) {
      continue;
    }
    const reason = user.afkReason || '';
    m.reply(`*¡¡No lo Etiquetes!!*

*✧ El usuario que mencionaste esta inactivo.*      
*✧ ${reason ? 'Motivo: ' + reason : 'Motivo: _El usuario no especificó el motivo v:_'}*
*✧ Tiempo transcurrido: ${(new Date - afkTime).toTimeString()}*
  `.trim());
  }
  return true;
}