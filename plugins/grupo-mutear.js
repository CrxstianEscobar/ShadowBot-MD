import { WAConnection, MessageType, Mimetype } from '@adiwajshing/baileys'; // Importación desde whiskeysockets

const handler = async (message, { conn, command, text, isAdmin }) => {
  const chatId = message.key.remoteJid; // ID del chat
  const senderId = message.key.participant; // ID del emisor

  if (command === 'mute') {
    // Solo un administrador puede ejecutar este comando
    if (!isAdmin) throw '💌 *Solo un administrador puede ejecutar este comando*';

    // Obtener el usuario mencionado o el ID proporcionado
    let mentionedUser = message.mentionedJid[0] || text.split(' ')[0];

    // No puedes mutear al bot ni al creador del bot
    if (mentionedUser === conn.user.jid) throw '🚩 *No puedes mutar al bot*';
    if (mentionedUser === global.owner[0]) throw '👑 *El creador del bot no puede ser mutado*';

    // Verifica si el usuario ya está muteado
    let userRecord = global.db.users[mentionedUser];
    if (userRecord && userRecord.muted) {
      throw '🚩 *Este usuario ya ha sido mutado*';
    }

    // Si no existe un registro de usuario, crea uno
    if (!userRecord) {
      userRecord = global.db.users[mentionedUser] = {};
    }
    userRecord.muted = true;

    // Mensaje de confirmación con vCard y foto de perfil
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTEL;waid=19709001746:+1 (970) 900-1746\nEND:VCARD';
    const thumbnail = await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer();
    const replyMessage = {
      key: { participant: '0@s.whatsapp.net', fromMe: false, id: message.key.id },
      message: {
        locationMessage: {
          name: 'Muted',
          jpegThumbnail: thumbnail,
          vcard: vcard,
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // Envía un mensaje de confirmación
    conn.sendMessage(chatId, '✨ *Este usuario ha sido muteado*', MessageType.text, { mentions: [mentionedUser] });

    // Guarda los mensajes enviados por el usuario muteado (si es necesario eliminarlos después)
    global.db.users[mentionedUser].mutedMessages = [];

  } else if (command === 'unmute') {
    // Solo un administrador puede ejecutar este comando
    if (!isAdmin) throw '💌 *Solo un administrador puede ejecutar este comando*';

    // Obtener el usuario mencionado o el ID proporcionado
    let mentionedUser = message.mentionedJid[0] || text.split(' ')[0];

    // No puedes desmutar al bot ni al creador del bot
    if (mentionedUser === conn.user.jid) throw '🚩 *No puedes desmutar al bot*';
    if (mentionedUser === global.owner[0]) throw '👑 *El creador del bot no puede ser desmutado*';

    let userRecord = global.db.users[mentionedUser];

    // Verifica si el usuario está muteado
    if (!userRecord || !userRecord.muted) {
      throw '🚩 *Este usuario no está muteado*';
    }

    // Desmutea al usuario
    userRecord.muted = false;

    // Mensaje de confirmación con vCard y foto de perfil
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTEL;waid=19709001746:+1 (970) 900-1746\nEND:VCARD';
    const thumbnail = await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer();
    const replyMessage = {
      key: { participant: '0@s.whatsapp.net', fromMe: false, id: message.key.id },
      message: {
        locationMessage: {
          name: 'Unmuted',
          jpegThumbnail: thumbnail,
          vcard: vcard,
        }
      },
      participant: '0@s.whatsapp.net'
    };

    // Envía un mensaje de confirmación
    conn.sendMessage(chatId, '✨ *Este usuario ha sido desmuteado*', MessageType.text, { mentions: [mentionedUser] });

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