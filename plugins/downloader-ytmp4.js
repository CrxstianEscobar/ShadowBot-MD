import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  // Validación para asegurarse de que se ingresa un enlace de YouTube
  if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube válido', m);

  // Reacción de espera antes de procesar la solicitud
  await conn.react(m.chat, '⏳'); // Reacción de "esperando"

  try {
    let api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`);
    let json = await api.json();

    // Desestructuración de los datos del video
    let { title, views, likes, description, author } = json.metadata;

    // Crear el mensaje con la información del video
    let HS = `- *Título:* ${title}
- *Descripción:* ${description}
- *Visitas:* ${views}
- *Likes:* ${likes}
- *Autor:* ${author}
- *Tamaño:* ${json.downloads.size}
    `;

    // Enviar el archivo de video
    await conn.sendFile(m.chat, json.downloads.url, 'HasumiBotFreeCodes.mp4', HS, m);

    // Eliminar la reacción de espera y agregar una reacción de éxito
    await conn.react(m.chat, '✅'); // Reacción de éxito
  } catch (error) {
    // Manejo de errores de la API o de la solicitud
    console.error('Error al obtener el video:', error);
    await conn.reply(m.chat, '❀ Ocurrió un error al intentar obtener el video. Intenta nuevamente.', m);

    // Eliminar la reacción de espera y agregar una reacción de error
    await conn.react(m.chat, '❌'); // Reacción de error
  }
};

handler.command = /^(ytmp4)$/i;

export default handler;