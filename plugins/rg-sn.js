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
import { prepareWAMessageMedia, generateWAMessageFromContent } from "baileys";

let handler = async function (m, { conn }) {
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

    // Construye el mensaje interactivo
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: `*[ ℹ️ ] Número Serial:*\n\n▢ ${sn}` },
                    footer: { text: "Presiona el botón para copiar tu número de serie" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'cta_copy',
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📋 Copiar Número",
                                    copy_code: `${sn}`,
                                    id: `${sn}`
                                })
                            }
                        ],
                        messageParamsJson: "",
                    },
                },
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    // Envía el mensaje interactivo con botón
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['mysn'];
handler.tags = ['rg'];
handler.command = ['nserie', 'sn', 'mysn'];
handler.register = true;

export default handler;