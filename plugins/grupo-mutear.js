import { WAConnection, MessageType } from '@adiwajshing/baileys';
import _0x19a3e4 from 'node-fetch'; // para las imágenes como en tu código original

// Crear una nueva conexión a WhatsApp
const conn = new WAConnection();

// Autenticarse y conectarse
conn.on('open', () => {
  console.log('Conexión establecida con éxito');
});

conn.connect();

const handler = async (_0x5b04ea, { conn: _0x24d45b, command: _0x38ad25, text: _0x29b0ac, isAdmin: _0x9e35ac }) => {
  if (!_0x9e35ac) {
    throw "🚩 *Solo un administrador puede ejecutar este comando*";
  }

  if (_0x38ad25 === "mute") {
    // Lógica de mute (igual que antes, pero usando Baileys)
    const _0x45f556 = global.owner[0x0][0x0] + "@s.whatsapp.net";
    if (_0x5b04ea.mentionedJid[0x0] === _0x45f556) {
      throw "🚩 *El creador del bot no puede ser mutado*";
    }

    let _0x329969 = _0x5b04ea.mentionedJid[0x0] ? _0x5b04ea.mentionedJid[0x0] : _0x5b04ea.quoted ? _0x5b04ea.quoted.sender : _0x29b0ac;
    if (_0x329969 === _0x24d45b.user.jid) {
      throw "🚩 *No puedes mutar el bot*";
    }

    // Enviar mensaje al usuario que ha sido silenciado
    const _0x3d4fa1 = {
      key: { fromMe: false, id: 'Halo' },
      message: {
        locationMessage: {
          name: "𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼",
          jpegThumbnail: await (await _0x19a3e4('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTEL:+1 (970) 900-1746\nEND:VCARD"
        }
      },
      participant: "0@s.whatsapp.net"
    };

    // Responder en el grupo
    await _0x24d45b.sendMessage(_0x5b04ea.chat, "*Tus mensajes serán eliminados*", MessageType.text, { mentions: [_0x329969] });
    global.db.data.users[_0x329969].muto = true;
  }

  if (_0x38ad25 === "unmute") {
    // Lógica de unmute (similar, pero deshaciendo el mute)
    let _0x12128f = _0x5b04ea.mentionedJid[0x0] ? _0x5b04ea.mentionedJid[0x0] : _0x5b04ea.quoted ? _0x5b04ea.quoted.sender : _0x29b0ac;
    if (_0x12128f === _0x5b04ea.sender) {
      throw "🚩 *Solo otro administrador puede desmutarte*";
    }

    let _0x498844 = global.db.data.users[_0x12128f];
    if (_0x498844.muto === false) {
      throw "🚩 *Este usuario no ha sido mutado*";
    }

    global.db.data.users[_0x12128f].muto = false;
    await _0x24d45b.sendMessage(_0x5b04ea.chat, "*Tus mensajes no serán eliminados*", MessageType.text, { mentions: [_0x12128f] });
  }
};

handler.help = ['mute *<@user>*', 'unmute *<@user>*'];
handler.tags = ['group'];
handler.command = ['mute', 'unmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;