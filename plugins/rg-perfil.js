import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';

var handler = async (m, { conn }) => {
try {
    loadMarriages();

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let pp = 'https://i.ibb.co/QjgtQnR/file.jpg';
    let name = conn.getName(who);
    age = registered ? (age || 'Desconocido') : 'Sin especificar';

    let texto = `
「 👤 *PERFIL DE USUARIO* 」
☁️ *Nombre:* ${name}
💠 *Edad:* ${age}
`

    conn.sendFile(m.chat, pp, 'perfil.jpg', texto,  m, { mentions: [who] });
} catch (error) {
  console.error(error);
  m.reply(`Ocurrió un error al obtener el perfil del usuario: ${error.stack`);
}
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;