/* HTML WEB By WillZek 
- Free Codes Titan
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// [🕵️] 𝗛𝗧𝗠𝗟 𝗪𝗘𝗕

import fetch from 'node-fetch';

let handler = async(m, { conn, args, usedPrefix, command }) => {

if (!args[0]) return m.reply('*[ ☕ ] Ingresa un link de alguna web que deseas sacar html*');
m.react('🕑');

let api = `https://delirius-apiofc.vercel.app/tools/htmlextract?url=${args[0]}`;
let titan = await fetch(api);
let json = await titan.json();
let data = json.html;

let xd = 'https://files.catbox.moe/trd8vu.jpg';
let html = `*[ 👨🏻‍💻 ] HTML EXTRAÍDO DE LA WEB:*\n${data}*`

m.react('✅');
conn.sendMessage(m.chat, { image: { url: xd }, caption: html }, { quoted: m});
};

handler.command = ['htmlweb', 'hweb'];

export default handler;