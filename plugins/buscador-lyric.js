/*
import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
if (!text) {
return m.reply("*[ 🌷 ] Ingresa un texto de lo que desee buscar en YouTube.*")
}

let ytres = await yts(text)
let video = ytres.videos[0]
  
if (!video) {
return m.reply("*[ ℹ️ ] Video no encontrado*")
}

let { title, thumbnail, timestamp, views, ago, url } = video

let vistas = parseInt(views).toLocaleString("es-ES") + " vistas"

let HS = `
*Duración:* ${timestamp}
*Vistas:* ${vistas}
*Subido:* ${ago}
*Enlace:* ${url}

*[ ℹ️ ] Se está enviando su audio...*`

let thumb = (await conn.getFile(thumbnail))?.data;

let JT = {
contextInfo: {
externalAdReply: {
title: title, body: "",
mediaType: 1, previewType: 0,
mediaUrl: url, sourceUrl: url,
thumbnail: thumb, renderLargerThumbnail: true,
}}}

await conn.reply(m.chat, HS, m, JT)

try {
let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
let json = await api.json()
let { download } = json.result

await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg", }, { quoted: m })
} catch (error) {
console.error(error)    
}}

handler.command = /^(playyt)$/i

export default handler*/

import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("*[ 🌷 ] Ingresa un texto de lo que desee buscar en YouTube.*");
    }

    // Reacción de espera al iniciar la búsqueda
    await conn.react(m.chat, '⏳');  // Esto muestra una reacción de "espera" (reloj de arena)

    let ytres = await yts(text);
    let video = ytres.videos[0];

    if (!video) {
        return m.reply("*[ ℹ️ ] Video no encontrado*");
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;
    let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

    let HS = `
*Duración:* ${timestamp}
*Vistas:* ${vistas}
*Subido:* ${ago}
*Enlace:* ${url}

*[ ℹ️ ] Se está enviando su audio...*`;

    let thumb = (await conn.getFile(thumbnail))?.data;

    let JT = {
        contextInfo: {
            externalAdReply: {
                title: title, body: "",
                mediaType: 1, previewType: 0,
                mediaUrl: url, sourceUrl: url,
                thumbnail: thumb, renderLargerThumbnail: true,
            }
        }
    };

    await conn.reply(m.chat, HS, m, JT);

    try {
        let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
        let json = await api.json();
        let { download } = json.result;

        await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg", }, { quoted: m });

        // Reacción de finalización al enviar el audio
        await conn.react(m.chat, '✅');  // Esto muestra una reacción de "finalizado" (check verde)

    } catch (error) {
        console.error(error);
        // Reacción de error al fallar
        await conn.react(m.chat, '❌');  // Reacción de error (cruz roja)
    }
}

handler.command = /^(playyt)$/i;

export default handler;