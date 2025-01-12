import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*';
  
  await m.reply(`*_⏳Sᴇ ᴇsᴛᴀ ᴘʀᴏᴄᴇsᴀɴᴅᴏ Sᴜ ᴠɪᴅᴇᴏ...⏳_*`);

  try {
    // Resolución por defecto es 360p, o el valor que pase el usuario
    const qu = args[1] || '360';
    const q = qu + 'p';
    const v = args[0];  // URL del video de YouTube

    // Intentar obtener el video usando youtubedl, con fallback en caso de error
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
    const resolution = yt.video[q];  // Obtenemos la resolución solicitada

    // Si no se encuentra la resolución, lanzamos un error
    if (!resolution) throw '*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙼𝙴𝙽𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝚄𝙽𝚁𝙴𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽 𝙼𝙰𝚂 𝚂𝚄𝙿𝙴𝚁𝙸𝙾𝚁.';
    
    // Obtenemos la URL de descarga y otros detalles
    const dl_url = await resolution.download();
    const ttl = yt.title;  // Título del video
    const size = resolution.fileSizeH;  // Tamaño del archivo en formato legible

    // Preparar la descripción que se enviará junto al video
    const cap = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*\n❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${ttl}\n❏ *𝙿𝙴𝚂𝙾:* ${size}`.trim();

    // Enviar el video como documento (archivo mp4)
    await conn.sendMessage(m.chat, {
      document: { url: dl_url }, 
      caption: cap,
      mimetype: 'video/mp4',
      fileName: ttl + `.mp4`,
    }, { quoted: m });

  } catch (error) {
    try {
      // En caso de fallo, intentamos usar la API externa (lolhuman) para obtener el video
      const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${args[0]}`);
      const lolh = await lolhuman.json();
      
      // Si la respuesta es válida, enviamos el video
      if (lolh.result && lolh.result.title && lolh.result.link) {
        const n = lolh.result.title;
        const n2 = lolh.result.link;
        const n3 = lolh.result.size;
        const cap2 = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*\n❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${n}\n❏ *𝙿𝙴𝚂𝙾:* ${n3}`.trim();

        // Enviar el video desde la API
        await conn.sendMessage(m.chat, {
          document: { url: n2 }, 
          caption: cap2, 
          mimetype: 'video/mp4',
          fileName: n + `.mp4`,
        }, { quoted: m });
      } else {
        throw '*[❗] 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾 𝙽𝙾 𝙴𝚂𝚃Á 𝙴𝙽 𝙻𝙸𝙽𝙺 𝙰𝙶𝙰𝙳𝙾*';
      }
    } catch (error) {
      // En caso de otro error, informamos al usuario
      await conn.reply(m.chat, '*[❗] 𝙴𝚁𝚁𝙾𝚁 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾*', m);
    }
  }
};

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i;
export default handler;