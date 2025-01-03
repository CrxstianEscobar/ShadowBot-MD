let handler = async (m, { conn }) => {
// React con un emoji al mensaje
m.react('🏜️');
// Mensaje que se enviará
const message = "Mapa Kalahari - Free Fire";
if (m.isGroup) {
// URL de la imagen
const imageUrl = 'https://i.ibb.co/0CqZP0j/file.jpg'; // Cambia esta URL por la de la imagen que deseas enviar
// Envía el mensaje
// Envía la imagen
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['kalahari'];
handler.tags = ['ff'];
handler.command = ['kalahari', 'mapakalahari'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;