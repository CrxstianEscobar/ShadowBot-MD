import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*[ 🌷 ] Ingresa un texto de lo que desee buscar en YouTube.*");
  }

  // Reacción de espera antes de comenzar el proceso
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("*[ ℹ️ ] Video no encontrado*");
  }

  let { title, thumbnail, timestamp, views, ago, url } = video;

  let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

  let HS = `\`YOUTUBE - DESCARGAS\`

ᜊ *Duración:* ${timestamp}
ᜊ *Vistas:* ${vistas}
ᜊ *Subido:* ${ago}
ᜊ *Enlace:* ${url}

> *[ ℹ️ ] Se está enviando su audio, aguarde un momento...*`;

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

    await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg" }, { quoted: m });

    // Reacción de éxito después de enviar el audio
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    m.reply("*[ ℹ️ ] Ocurrió un error al intentar obtener el audio del video.*");

    // Reacción de error si ocurre un problema
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = /^(yta)$/i;

export default handler;