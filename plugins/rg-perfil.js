import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';

var handler = async (m, { conn }) => {
    loadMarriages();

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { description, age } = global.db.data.users[who] || {};
    let username = conn.getName(who);

    age = registered ? (age || 'Desconocido') : 'Sin especificar';
    description = description || 'Sin Descripción';

    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

    let noprem = `
「 👤 *PERFIL DE USUARIO* 」
☁️ *Nombre:* ${username}
💠 *Edad:* ${age}
👩‍❤️‍👩 *Casad@:* No
📜 *Descripción:* ${description}
🌐 *Pais:* ${userNationality}
`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', noprem,  m, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;