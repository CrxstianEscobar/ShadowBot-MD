/*import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
m.reply(`*[ ☕ ] Numero Serial:*\n\n▢ ${sn}`.trim())
}
handler.help = ['mysn']
handler.tags = ['rg']
handler.command = ['nserie', 'sn', 'mysn'] 
handler.register = true

export default handler*/


import { createHash } from 'crypto';

let handler = async function (m, { conn }) {
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

    // Crear mensaje con el botón
    let buttonMessage = {
        text: `*[ ℹ️ ] Número Serial:*\n\n▢ ${sn}`,
        footer: "Presiona el botón para obtener tu número de serie",
        buttons: [
            {
                buttonId: `copiar ${sn}`,
                buttonText: { displayText: "📋 Obtener Número Serial" },
                type: 1
            }
        ],
        headerType: 1
    };

    // Enviar mensaje con botón
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['mysn'];
handler.tags = ['rg'];
handler.command = ['nserie', 'sn', 'mysn'];
handler.register = true;

export default handler;