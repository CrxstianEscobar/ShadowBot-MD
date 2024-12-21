let handler = async (m, { conn }) => {
// React con un emoji al mensaje
m.react('💫');
// Mensaje que se enviará
const message = "Test 20";
if (m.isGroup) {
// URL de la imagen
const imageUrl = 'https://qu.ax/kgzBh.jpg'; // Cambia esta URL por la de la imagen que deseas enviar
// Envía el mensaje
// Envía la imagen
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['ts'];
handler.tags = ['group'];
handler.group = true;
handler.command = ['ts1', 'ts'];
export default handler;