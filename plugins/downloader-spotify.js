import _ from 'lodash';
import fetch from 'node-fetch';

let handler = async (m, { conn, command, usedPrefix, args }) => {
  const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || "";

  if (typeof text !== 'string' || !text.trim()) return m.reply(`✦ Ingresa una consulta\n*Ejemplo:* .${command} Joji Ew`);

  if (!text.includes("spotify")) return m.reply(`✦ La consulta debe ser un enlace de Spotify`);

  await m.reply('✦ Espere un momento...');

  try {
    const dps = await fetch(`(link unavailable));
    const dp = await dps.json();

    const { title = "No encontrado", type = "No encontrado", artis = "No encontrado", durasi = "No encontrado", download, image } = dp.data;

    const captvid = ` *✦Título:* ${title} *✧Duración:* ${durasi} *✦Tipo:* ${type} *✧Artista:* ${artis} *✦link:* ${text} `;

    const spthumb = (await conn.getFile(image))?.data;

    const infoReply = {
      contextInfo: {
        externalAdReply: {
          body: `✧ En unos momentos se entrega su audio`,
          mediaType: 1,
          mediaUrl: text,
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: text,
          thumbnail: spthumb,
          title: `S P O T I F Y - A U D I O`
        }
      }
    };

    await conn.reply(m.chat, captvid, m, infoReply);

    infoReply.contextInfo.externalAdReply.body = `Audio descargado con éxito`;

    await conn.sendMessage(m.chat, { audio: { url: download }, caption: captvid, mimetype: "audio/mpeg", contextInfo: infoReply.contextInfo }, { quoted: m });
  } catch (error) {
    console.error(error);
    await m.reply(`✦ Ocurrió un error al descargar el audio`);
  }
};

handler.help = ["spotifydl *<link>*"];
handler.tags = ["downloader"];
handler.command = /^(spotifydl)$/i;
handler.limit = true;

export default handler;