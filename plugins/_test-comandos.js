import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args }) => {
  // Validar que se envíe un enlace
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `🔔 Envíame el enlace del video de Facebook para descargarlo.`,
      m
    );
  }

  let res;
  try {
    await m.react('🚀'); // Reacción de espera
    res = await igdl(args[0]); // Descargar datos del enlace
  } catch (e) {
    // Manejo de error en caso de enlace no válido
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ El enlace no es válido o no pertenece a Facebook. Por favor verifica.`,
      m
    );
  }

  // Verificar si se obtuvieron datos
  let result = res.data;
  if (!result || result.length === 0) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se encontraron videos en el enlace proporcionado.`,
      m
    );
  }

  // Buscar video con la mejor resolución disponible
  let data;
  try {
    data =
      result.find((i) => i.resolution === '720p (HD)') ||
      result.find((i) => i.resolution === '360p (SD)');
  } catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se pudieron procesar los datos del video.`,
      m
    );
  }

  if (!data) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se encontró un video descargable en el enlace.`,
      m
    );
  }

  // Enviar el video al chat
  let video = data.url;
  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `🚀 tu video de Facebook.

\n> ⏤͟͟͞͞𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭ꗄ➺`,
        fileName: 'facebook_video.mp4',
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );
    await m.react('✅'); // Confirmar éxito
  } catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ Ocurrió un error al descargar o enviar el video.`,
      m
    );
  }
};

// Configuración del comando
handler.help = ['facebook2', 'fb2'];
handler.tags = ['descargas'];
handler.command = ['facebook2', 'fb2']; // Comandos activadores
handler.register = true; // Requiere registro
handler.limit = true; // Usa límite de comandos

export default handler;