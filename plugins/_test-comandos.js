import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, participants }) => {
  try {
    // Obtener los IDs de los participantes
    const users = participants.map((u) => conn.decodeJid(u.id));

    // Determinar si el mensaje es citado o el original
    const quoted = m.quoted || m;
    const quotedMessage = quoted.msg || quoted.text || '';
    const messageType = quoted.mtype || 'extendedTextMessage';

    // Generar el mensaje modificado
    const modifiedMessage = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        {
          [messageType]: quoted.mtype
            ? quoted.message[messageType]
            : { text: text || quotedMessage },
        },
        { quoted: m, userJid: conn.user.id }
      ),
      text || quotedMessage,
      conn.user.jid,
      { mentions: users }
    );

    // Enviar el mensaje
    await conn.relayMessage(m.chat, modifiedMessage.message, { messageId: modifiedMessage.key.id });
  } catch (error) {
    console.error('Error en el primer intento:', error);

    // Si falla el primer intento, manejar diferentes tipos de mensajes
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted || m;
    const mime = quoted?.msg?.mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const invisibleText = '\u200E'.repeat(850); // Texto invisible
    const messageText = text || '*Por favor, utiliza el comando nuevamente.*';

    try {
      if (isMedia) {
        // Descargar contenido multimedia
        const media = await quoted.download?.();

        if (mime.includes('image')) {
          await conn.sendMessage(m.chat, { image: media, caption: messageText, mentions: users }, { quoted: m });
        } else if (mime.includes('video')) {
          await conn.sendMessage(m.chat, { video: media, caption: messageText, mimetype: 'video/mp4', mentions: users }, { quoted: m });
        } else if (mime.includes('audio')) {
          await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3', mentions: users }, { quoted: m });
        } else if (mime.includes('sticker')) {
          await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: m });
        }
      } else {
        // Si no es contenido multimedia, enviar un mensaje de texto
        const finalText = `${invisibleText}\n${messageText}\n`;
        await conn.sendMessage(
          m.chat,
          {
            extendedTextMessage: {
              text: finalText,
              contextInfo: {
                mentionedJid: users,
                externalAdReply: {
                  thumbnail: null, // Puedes añadir una imagen aquí si es necesario
                  sourceUrl: 'https://www.tiktok.com/bk_crxss',
                },
              },
            },
          },
          {}
        );
      }
    } catch (mediaError) {
      console.error('Error al procesar el mensaje multimedia:', mediaError);
    }
  }
};

// Configuración del comando
handler.command = /^(n2)$/i;
handler.group = true;
handler.admin = true;

export default handler;