import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, '*🌷 Ingresa un enlace de YouTube válido.*', m);
  }

  // Validación básica de URL de YouTube
  const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  if (!youtubeRegex.test(text)) {
    return conn.reply(m.chat, '*❌ El enlace proporcionado no es un enlace válido de YouTube.*', m);
  }

  try {
    // Enviar mensaje informando que se está procesando
    await conn.reply(m.chat, '*[ ℹ️ ] Se está enviando el video..*.', m);

    // Solicitar la API para obtener los detalles del video
    let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`);
    let json = await api.json();

    // Verificar si la API responde correctamente
    if (!json || !json.downloadUrl) {
      return conn.reply(m.chat, '❀ Hubo un error al obtener los datos del video, por favor intenta de nuevo más tarde.', m);
    }

    // Extraer la información del JSON
    let { title, author, views, uploadDate, duration, downloadUrl, quality } = json;

    // Formatear la información para mostrar
    let infoMessage = `
      - *Título:* ${title}
      - *Autor:* ${author}
      - *Visitas:* ${views}
      - *Subido:* ${uploadDate}
      - *Duración:* ${duration}
      - *Calidad:* ${quality}p
    `;

    // Enviar el video con la información
    await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: infoMessage }, { quoted: m });
    
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '*ℹ️ Ocurrió un error al intentar descargar el video, por favor intenta de nuevo más tarde.*', m);
  }
};

handler.command = ['ytmp4'];

export default handler;