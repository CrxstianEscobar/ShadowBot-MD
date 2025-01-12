import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  // Verificamos si no se ha proporcionado un enlace
  if (!args[0]) {
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] I𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*');
    return;
  }

  // Si tenemos un enlace de YouTube, tratamos de obtener la descarga
  try {
    console.log("Intentando procesar el video...");
    
    const qu = args[1] || '360';  // Resolución por defecto
    const q = qu + 'p';  // Formato de resolución
    const v = args[0];  // URL del video

    // Intentamos obtener el video usando youtubedl primero
    let yt = await youtubedl(v).catch(async (_) => {
      console.log("youtubedl falló, intentando con youtubedlv2...");
      return await youtubedlv2(v);
    });

    if (!yt) {
      console.log("No se encontró el video con youtubedl o youtubedlv2");
      throw "*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙴𝚂𝚃Á 𝙴𝙽 𝙻𝙸𝙽𝙺*";
    }

    // Verificamos si la resolución está disponible
    const resolution = yt.video[q];
    if (!resolution) {
      console.log("Resolución no encontrada: " + q);
      throw `*[❗] 𝙼𝙴𝙽𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝚄𝙽𝚁𝙴𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽 𝙼𝙰𝚂 𝚂𝚄𝙿𝙴𝚁𝙸𝙾𝚁: ${q}*`;
    }

    // Obtenemos la URL de descarga y el título
    const dl_url = await resolution.download();
    const ttl = yt.title;
    const size = resolution.fileSizeH;
    const cap = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*\n❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${ttl}\n❏ *𝙿𝙴𝚂𝙾:* ${size}`.trim();

    console.log("Video descargado con éxito. Enviando el video...");

    // Enviamos el video
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      caption: cap,
      mimetype: 'video/mp4',
      fileName: ttl + `.mp4`,
    }, { quoted: m });

  } catch (error) {
    console.log("Error al procesar el video:", error);

    try {
      // Si la descarga falla, intentamos usar la API de lolhuman
      const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${args[0]}`);
      const lolh = await lolhuman.json();

      if (lolh.result && lolh.result.title && lolh.result.link) {
        const n = lolh.result.title;
        const n2 = lolh.result.link;
        const n3 = lolh.result.size;
        const cap2 = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*\n❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${n}\n❏ *𝙿𝙴𝚂𝙾:* ${n3}`.trim();

        console.log("Enviando video desde lolhuman...");

        // Enviamos el video desde lolhuman
        await conn.sendMessage(m.chat, {
          document: { url: n2 },
          caption: cap2,
          mimetype: 'video/mp4',
          fileName: n + `.mp4`,
        }, { quoted: m });
      } else {
        console.log("No se pudo obtener la información desde lolhuman");
        throw '*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙴𝚂𝚃Á 𝙴𝙽 𝙻𝙸𝙽𝙺 𝙰𝙶𝙰𝙳𝙾*';
      }
    } catch (error) {
      console.log("Error al obtener video de lolhuman:", error);
      await conn.reply(m.chat, '*[❗] 𝙴𝚁𝚁𝙾𝚁 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾*', m);
    }
  }
};

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i;
export default handler;