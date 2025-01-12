import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    // Si no se proporciona un enlace, enviar un mensaje informativo
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*');
    return;
  }

  const videoUrl = args[0];  // URL del video proporcionado
  try {
    // Intentamos obtener el video con youtubedl
    const yt = await youtubedl(videoUrl).catch(async (_) => await youtubedlv2(videoUrl));

    if (!yt) {
      throw new Error('No se pudo obtener el video');
    }

    // Usamos la resolución de 360p (si está disponible)
    const video = yt.video['360p'];  // Puedes cambiar '360p' por '720p', '1080p', etc.
    const dl_url = await video.download();  // URL de descarga
    const title = yt.title;  // Título del video

    // Enviar el video al chat
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`
    }, { quoted: m });

    console.log(`Video enviado: ${title}`);  // Mensaje de depuración

  } catch (error) {
    // Si ocurre un error, enviar mensaje de error
    console.error('Error al obtener el video:', error);
    await conn.reply(m.chat, '*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙴𝚂𝚃Á 𝙴𝙽 𝙻𝙸𝙽𝙺 𝙰𝙶𝙰𝙳𝙾*', m);
  }
};

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i;
export default handler;