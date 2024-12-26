
const { MessageType } = require('@adiwajshing/baileys');

const handler = async (m, { conn, command, text, isAdmin }) => {
  const mentionedJid = [m.quoted ? m.quoted.sender : m.mentionedJid[0] || m.from];
  const db = global.db;
  const owner = global.owner[0];

  if (command === 'mute') {
    if (!isAdmin) throw 'Solo un administrador puede ejecutar este comando';
    if (mentionedJid[0] === owner) throw 'No puedes mutar al creador del bot';
    const user = db.users[mentionedJid[0]];
    if (user.mute) throw 'Este usuario ya ha sido mutado';
    db.users[mentionedJid[0]].mute = true;
    m.reply(`*${mentionedJid[0]} ha sido mutado*`, mentionedJid[0], MessageType.text);
  } else if (command === 'unmute') {
    if (!isAdmin) throw 'Solo un administrador puede ejecutar este comando';
    if (mentionedJid[0] === owner) throw 'No puedes desmutar al creador del bot';
    const user = db.users[mentionedJid[0]];
    if (!user.mute) throw 'Este usuario no ha sido mutado';
    db.users[mentionedJid[0]].mute = false;
    m.reply(`*${mentionedJid[0]} ha sido desmutado*`, mentionedJid[0], MessageType.text);
  }
};

handler.command = ['mt', 'unmt'];
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;