/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`*[ 📂 ] Ingresa un link de mediafire.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/2v2x1p0x58qomva/WhatsApp_Messenger_2.24.21.8_beta_By_WhatsApp_LLC.apk/file`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
  let gyh = await ouh.json()
	await conn.sendFile(m.chat, gyh.data[0].link, `${gyh.data[0].nama}`, `*🪴 Nombre:* ${gyh.data[0].nama}\n*⚖️ Peso:* ${gyh.data[0].size}\n*📁 Extensión:* ${gyh.data[0].mime}`, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['mediafire *<link>*']
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i
handler.premium = false
handler.register = true
export default handler*/

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) {
            throw `*[ 📂 ] Ingresa un link de MediaFire.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/2v2x1p0x58qomva/WhatsApp_Messenger_2.24.21.8_beta_By_WhatsApp_LLC.apk/file`;
        }

        // Validación de enlace de MediaFire
        if (!/^https?:\/\/(www\.)?mediafire\.com\/file\/[a-zA-Z0-9]+\/.+$/.test(text)) {
            throw `*[ ❌ ] El enlace proporcionado no es válido. Asegúrate de que sea un link de MediaFire.*`;
        }

        await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

        const fetchWithTimeout = (url, options, timeout = 10000) => {
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Tiempo de espera agotado")), timeout))
            ]);
        };

        // Obtener los datos del archivo desde la API
        let response = await fetchWithTimeout(`https://api.agatz.xyz/api/mediafire?url=${text}`);
        if (!response.ok) throw `*[ ❌ ] Error al obtener datos. Intenta nuevamente más tarde.*`;

        let data = await response.json();
        if (!data || !data.data || data.data.length === 0) throw `*[ ❌ ] No se pudo obtener información del archivo. Verifica el enlace.*`;

        // Iteramos sobre todos los archivos
        for (let file of data.data) {
            let readableSize = formatSize(file.size); // Convertimos el tamaño a un formato más legible

            await conn.sendFile(m.chat, file.link, file.nama, `*_DESCARGAS - MEDIAFIRE_*\n\n*🪴 Nombre:* ${file.nama}\n*⚖️ Peso:* ${readableSize}\n*📁 Extensión:* ${file.mime}`, m);
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (err) {
        await m.reply(err.toString());
    }
};

handler.help = ['mediafire *<link>*'];
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;
handler.register = true;

export default handler;

// Función para convertir el tamaño a un formato más legible
function formatSize(size) {
    let num = parseFloat(size);
    if (isNaN(num)) return size; // Si no es un número, devolver el original

    if (num >= 1e9) return (num / 1e9).toFixed(2) + " GB";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + " MB";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + " KB";
    return num + " B";
}