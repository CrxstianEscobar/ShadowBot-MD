import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, participants }) => {
  try {
    // Validar datos básicos
    if (!participants || !m.chat) {
      console.error('Faltan datos del grupo o participantes.');
      return;
    }

    // Obtener los IDs de los participantes
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted || m; // Mensaje citado o mensaje original
    const mime = quoted.msg?.mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Texto a enviar
    const messageText = text || '*Por favor, utiliza el comando nuevamente.*';

    // Procesar según el tipo de mensaje citado
    if (isMedia) {
      const media = await quoted.download?.();
      if (!media) {
        console.error('No se pudo descargar el contenido multimedia.');
        return;
      }

      const messageOptions = {
        mentions: users,
        quoted: m,
      };

      if (mime.includes('image')) {
        await conn.sendMessage(m.chat, { image: media, caption: messageText, ...messageOptions });
      } else if (mime.includes('video')) {
        await conn.sendMessage(m.chat, { video: media, caption: messageText, mimetype: 'video/mp4', ...messageOptions });
      } else if (mime.includes('audio')) {
        await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3', ...messageOptions });
      } else if (mime.includes('sticker')) {
        await conn.sendMessage(m.chat, { sticker: media, ...messageOptions });
      }
    } else {
      // Si no es un mensaje de media, enviar un mensaje de texto
      const hiddenText = '\u200E'.repeat(850); // Relleno invisible
      const finalText = `${hiddenText}\n${messageText}\n`;

      await conn.sendMessage(m.chat, {
        extendedTextMessage: {
          text: finalText,
          contextInfo: {
            mentionedJid: users,
            externalAdReply: {
              thumbnail: null, // Imagen opcional
              sourceUrl: 'https://www.tiktok.com/bk_crxss',
            },
          },
        },
      });
    }
  } catch (err) {
    console.error('Error en el comando hidetag:', err);
    await conn.sendMessage(m.chat, { text: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.' }, { quoted: m });
  }
};

handler.command = /^(n)$/i;
handler.group = true;
handler.admin = true;

export default handler;