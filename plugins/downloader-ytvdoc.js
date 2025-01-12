import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    // Si no se proporciona un enlace, enviar un mensaje informativo
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*');
    return;
  }

  try {
    const v = args[0];  // URL del video
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));

    // Tomamos el primer video disponible de la resolución más baja
    const video = yt.video['360p'];

    // Obtenemos la URL de descarga
    const dl_url = await video.download();
    const ttl = yt.title;
    
    // Enviamos el video
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      mimetype: 'video/mp4',
      fileName: ttl + '.mp4'
    }, { quoted: m });

  } catch (error) {
    // Si hay un error, enviamos un mensaje de error
    await conn.reply(m.chat, '*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙴𝚂𝚃Á 𝙴𝙽 𝙻𝙸𝙽𝙺 𝙰𝙶𝙰𝙳𝙾*', m);
  }
};

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i;
export default handler;