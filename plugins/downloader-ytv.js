import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, text, args }) => {
  if (!text) {
    return m.reply("*[ 🌷 ] Ingresa un texto de lo que quieras buscar en YouTube.*");
  }

  // Reacción de espera antes de comenzar el proceso
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  let ytres = await search(args.join(" "));
  if (ytres.length === 0) {
    return m.reply("*[ ℹ️ ] No se encontraron resultados.*");
  }

  let txt = `\`YOUTUBE - DESCARGAS\`

এ *Título:* ${ytres[0].title}
এ *Duración:* ${ytres[0].timestamp}
এ *Publicado:* ${ytres[0].ago}
এ *Canal:* ${ytres[0].author.name || 'Desconocido'}
এ *Url:* https://youtu.be/${ytres[0].videoId}

> *[ ℹ️ ] Enviando video, aguarda un momento...*`;

  await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', txt, m);

  try {
    let apiResponse = await fetch(`https://api.vreden.web.id/api/ytplaymp4?query=${ytres[0].url}&apikey=0a2cc90e`);
    let json = await apiResponse.json();

    if (json.result && json.result.download && json.result.download.url) {
      let { title, url: mp4 } = json.result.download;

      await conn.sendMessage(m.chat, { video: { url: mp4 }, caption: `*Shadow Bot:*  ${text}`, mimetype: 'video/mp4', fileName: `Sumi Sakurazawa - ${title}.mp4` }, { quoted: m });

      // Reacción de éxito al finalizar
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } else {
      throw new Error('La API no devolvió los datos esperados.');
    }
  } catch (error) {
    console.error(error);
    m.reply("*[ ℹ️ ] Ocurrió un error al intentar descargar el video.*");

    // Reacción de error
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = /^(play2)$/i;

export default handler;

async function search(query, options = {}) {
  let searchResults = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return searchResults.videos;
}