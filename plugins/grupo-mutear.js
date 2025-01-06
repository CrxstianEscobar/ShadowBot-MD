import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
  // Comando para mutear a un usuario
  if (command === 'mute') {
    if (!isAdmin) throw '💌 Solo un administrador puede ejecutar este comando';

    const userToMute = message.mentionedJid[0] || text;

    if (userToMute === conn.user.jid) {
      throw '🚩 No puedes mutar al bot';
    }

    let userData = global.db.users[userToMute];

    if (userData && userData.isMuted) {
      throw '🚩 Este usuario ya está muteado';
    }

    // Mutear al usuario
    global.db.users[userToMute] = { isMuted: true };
    await conn.reply(message.chat, '💥 El usuario ha sido muteado', null, { mentions: [userToMute] });
  }

  // Comando para desmutear a un usuario
  if (command === 'unmute') {
    if (!isAdmin) throw '💌 Solo un administrador puede ejecutar este comando';

    const userToUnmute = message.mentionedJid[0] || text;

    if (userToUnmute === conn.user.jid) {
      throw '🚩 No puedes desmutear al bot';
    }

    let userData = global.db.users[userToUnmute];

    if (!userData || !userData.isMuted) {
      throw '🚩 Este usuario no está muteado';
    }

    // Desmutear al usuario
    global.db.users[userToUnmute].isMuted = false;
    await conn.reply(message.chat, '💥 El usuario ha sido desmuteado', null, { mentions: [userToUnmute] });
  }
};

// Lógica para eliminar mensajes de usuarios muteados
const messageHandler = async (message, { conn }) => {
  const user = message.sender;

  // Verifica si el usuario está muteado
  let userData = global.db.users[user];

  if (userData && userData.isMuted) {
    // Elimina el mensaje del usuario muteado
    await conn.deleteMessage(message.chat, message.key);
    await conn.reply(message.chat, '*Tus mensajes serán eliminados*', null, { mentions: [user] });
  }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;
handler.messageHandler = messageHandler; // Añade el manejador de mensajes

export default handler;