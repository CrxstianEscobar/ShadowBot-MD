import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🧑‍💻 Ingrese el enlace de YouTube de la canción que desea descargar.`, m, { quoted: m });

    await m.react('🕒');
    try {
        // Formar la URL con el enlace de YouTube
        const url = `https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(text)}`;

        // Realizar la solicitud a la API
        let response = await fetch(url);
        let json = await response.json();

        if (json.status !== 'success') throw new Error('No se pudo obtener la información de la canción');

        let { link: dl_url, title, thumbnail } = json.result;

        // Descargar el archivo de audio
        let audio = await getBuffer(dl_url);

        // Preparar el mensaje de texto
        let txt = `*\`- Y O U T U B E - M U S I C -\`*\n\n`;
        txt += `        ✩  *Título* : ${title}\n`;
        txt += `        ✩  *Url* : ${text}\n\n`;
        txt += `> 🚩 *Descarga completada*`;

        // Enviar la imagen en miniatura y el mensaje
        await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m, null, { quoted: m });

        // Enviar el archivo de audio
        await conn.sendMessage(m.chat, { audio: audio, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

        // Reactuar con un emoji de éxito
        await m.react('✅');
    } catch (error) {
        console.error(error);
        // Enviar el sticker de error
        const stickerUrl = 'https://files.catbox.moe/yaup2f.webp';
        await conn.sendMessage(m.chat, { sticker: { url: stickerUrl } }, { quoted: m });
        await m.react('✖️');
    }
};

handler.help = ['playx *<enlace de YouTube>*'];
handler.tags = ['downloader'];
handler.command = ['playx']; // Mantiene el mismo comando

export default handler;

// Función auxiliar para obtener el buffer del archivo de audio
const getBuffer = async (url, options) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1,
            },
            ...options,
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
        throw new Error('No se pudo descargar el audio');
    }
};