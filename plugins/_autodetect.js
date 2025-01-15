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
handler.command = /^(viso)$/i;
handler.group = true;
handler.admin = true;
export default handler;*/


import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin, usedPrefix }) => {
  // Verifica si el mensaje contiene "Aviso" o "viso", independientemente del prefijo
  if (text && (text.toLowerCase() === 'aviso' || text.toLowerCase() === 'viso')) {
    try {
      const users = participants.map((u) => conn.decodeJid(u.id));
      const q = m.quoted ? m.quoted : m || m.text || m.sender;
      const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
      const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c } }, { quoted: m, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users });
      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
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
        conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users }, { quoted: m });
      } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
        var mediax = await quoted.download?.();
        conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
      } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
        var mediax = await quoted.download?.();
        conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
      } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
        var mediax = await quoted.download?.();
        conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
      } else {
        await conn.relayMessage(m.chat, { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { mentionedJid: users, externalAdReply: { thumbnail: imagen1, sourceUrl: 'https://www.tiktok.com/bk_crxss' } } } } }, {});
      }
    }
  }
};

// Configura el comando para que se ejecute cuando el texto sea "Aviso" o "viso" (sin necesidad de prefijo extra)
handler.command = /^(aviso|viso)$/i;  // Detecta "Aviso" o ".viso"
handler.group = true;
handler.admin = true;

export default handler;