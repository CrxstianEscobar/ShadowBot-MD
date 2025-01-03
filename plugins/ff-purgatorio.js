let handler = async (m, { conn }) => {
// React con un emoji al mensaje
m.react('🏞️');
// Mensaje que se enviará
const message = "Mapa Purgatorio - Free Fire";
if (m.isGroup) {
// URL de la imagen
const imageUrl = 'https://i.ibb.co/ww5DJgn/file.jpg'; // Cambia esta URL por la de la imagen que deseas enviar
// Envía el mensaje
// Envía la imagen
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['purgatorio'];
handler.tags = ['ff'];
handler.command = ['purgatorio', 'mapapurgatorio'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;