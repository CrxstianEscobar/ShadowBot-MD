import { WAConnection, MessageType, Mimetype } from '@adiwajshing/baileys'; // Importación desde baileys

const handler = async (message, { conn, command, text, isAdmin }) => {
  const chatId = message.key.remoteJid; // ID del chat
  const senderId = message.key.participant; // ID del emisor

  // Comando para mutear a un usuario
  if (command === 'mute') {
    // Solo un administrador puede ejecutar este comando
    if (!isAdmin) {
      await conn.sendMessage(chatId, '💌 *Solo un administrador puede ejecutar este comando*', MessageType.text);
      return;
    }

    // Obtener el usuario mencionado o el ID proporcionado
    let mentionedUser = message.mentionedJid[0] || text.split(' ')[0];

    // No puedes mutear al bot ni al creador del bot
    if (mentionedUser === conn.user.jid) {
      await conn.sendMessage(chatId, '🚩 *No puedes mutar al bot*', MessageType.text);
      return;
    }
    if (mentionedUser === global.owner[0]) {
      await conn.sendMessage(chatId, '👑 *El creador del bot no puede ser mutado*', MessageType.text);
      return;
    }

    // Verifica si el usuario ya está muteado
    let userRecord = global.db.users[mentionedUser];
    if (userRecord && userRecord.muted) {
      await conn.sendMessage(chatId, '🚩 *Este usuario ya ha sido mutado*', MessageType.text);
      return;
    }

    // Si no existe un registro de usuario, crea uno
    if (!userRecord) {
      userRecord = global.db.users[mentionedUser] = {};
    }
    userRecord.muted = true;

    // Mensaje de confirmación de que el usuario ha sido muteado
    const confirmationMessage = '✨ *Este usuario ha sido muteado*';
    await conn.sendMessage(chatId, confirmationMessage, MessageType.text, { mentions: [mentionedUser] });

    // Guardar los mensajes del usuario muteado para eliminar después
    global.db.users[mentionedUser].mutedMessages = [];

  } else if (command === 'unmute') {
    // Solo un administrador puede ejecutar este comando
    if (!isAdmin) {
      await conn.sendMessage(chatId, '💌 *Solo un administrador puede ejecutar este comando*', MessageType.text);
      return;
    }

    // Obtener el usuario mencionado o el ID proporcionado
    let mentionedUser = message.mentionedJid[0] || text.split(' ')[0];

    // No puedes desmutar al bot ni al creador del bot
    if (mentionedUser === conn.user.jid) {
      await conn.sendMessage(chatId, '🚩 *No puedes desmutar al bot*', MessageType.text);
      return;
    }
    if (mentionedUser === global.owner[0]) {
      await conn.sendMessage(chatId, '👑 *El creador del bot no puede ser desmutado*', MessageType.text);
      return;
    }

    let userRecord = global.db.users[mentionedUser];

    // Verifica si el usuario está muteado
    if (!userRecord || !userRecord.muted) {
      await conn.sendMessage(chatId, '🚩 *Este usuario no está muteado*', MessageType.text);
      return;
    }

    // Desmutea al usuario
    userRecord.muted = false;

    // Mensaje de confirmación de que el usuario ha sido desmuteado
    const unmuteMessage = '✨ *Este usuario ha sido desmuteado*';
    await conn.sendMessage(chatId, unmuteMessage, MessageType.text, { mentions: [mentionedUser] });

    // Recupera los mensajes del usuario desmuteado
    const userMutedMessages = global.db.users[mentionedUser].mutedMessages || [];
    userMutedMessages.forEach(msg => conn.sendMessage(chatId, msg, MessageType.text));  // Reenvía los mensajes guardados
    global.db.users[mentionedUser].mutedMessages = [];
  }

  // Eliminar los mensajes del usuario muteado si está en la lista
  const mutedUsers = Object.keys(global.db.users).filter(userId => global.db.users[userId].muted);
  mutedUsers.forEach(userId => {
    if (userId === senderId && global.db.users[userId].muted) {
      conn.deleteMessages(chatId, [message.key.id]); // Elimina los mensajes de usuarios muteados
    }
  });
};

// Comandos disponibles
handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;

export default handler;