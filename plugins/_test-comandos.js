/*import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import * as fs from 'fs';
const handler = async (m, {conn, text, participants, isOwner, isAdmin}) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
    const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {[m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : {text: '' || c}}, {quoted: m, userJid: conn.user.id}), text || q.text, conn.user.jid, {mentions: users});
    await conn.relayMessage(m.chat, msg.message, {messageId: msg.key.id});
  } catch {

    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `${text ? text : '*Por favor pon el comando de nuevo*'}`;
    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {image: mediax, mentions: users, caption: htextos, mentions: users}, {quoted: m});
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos}, {quoted: m});
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3`}, {quoted: m});
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, {quoted: m});
    } else {
      await conn.relayMessage(m.chat, {extendedTextMessage: {text: `${masss}\n${htextos}\n`, ...{contextInfo: {mentionedJid: users, externalAdReply: {thumbnail: imagen1, sourceUrl: 'https://www.tiktok.com/bk_crxss'}}}}}, {});
    }
  }
};
handler.command = /^(hidetag2|notificar2|notify2|n2)$/i;
handler.group = true;
handler.admin = true;
export default handler;

// 💙💙💙💙

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, participants }) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id)); // Extraer los usuarios
    const quoted = m.quoted ? await m.getQuotedObj() : m; // Obtener el mensaje citado o el actual

    // Verificar si el mensaje citado tiene contenido
    const messageContent = quoted.message[quoted.mtype] || quoted.text;
    if (!messageContent) throw 'No hay contenido en el mensaje citado.';

    // Generar un mensaje con menciones a todos
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        [quoted.mtype]: {
          ...messageContent,
          contextInfo: { mentionedJid: users }, // Agregar menciones
        },
      },
      { quoted: m }
    );

    // Enviar el mensaje
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['n2 <mensaje>'];
handler.tags = ['grupo'];
handler.command = ['hidetag2', 'n2', 'notify2', 'notificar2'];
handler.group = true;
handler.admin = true;

export default handler;*/

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, participants, args }) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id)); // Extraer los usuarios
    const quoted = m.quoted ? await m.getQuotedObj() : m; // Obtener mensaje citado o actual
    const content = args.length > 0 
      ? args.join(' ') // Si se proporciona texto junto al comando, usarlo
      : quoted.text || quoted.message[quoted.mtype]; // Usar texto del mensaje citado o actual

    if (!content) throw 'No hay contenido para enviar.'; // Si no hay texto, lanzar error

    // Generar un mensaje con menciones a todos
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        extendedTextMessage: {
          text: content, // Enviar el texto capturado
          contextInfo: { mentionedJid: users }, // Agregar menciones a todos los usuarios
        },
      },
      { quoted: m } // Incluir el mensaje original como referencia
    );

    // Enviar el mensaje
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['n2 <mensaje>'];
handler.tags = ['grupo'];
handler.command = ['hidetag2', 'n2', 'notify2', 'notificar2'];
handler.group = true;
handler.admin = true;

export default handler;