
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Por favor, proporciona el nombre de la canción o el artista para buscar.\n\nEjemplo: ${usedPrefix + command} elaina`);

  let results = await yts(text);
  let videos = results.videos.slice(0, 6);

  let mensaje = "Resultados de la búsqueda:\n\n";
  for (let video of videos) {
    mensaje += `* ${video.title} - ${video.timestamp}\n`;
  }

  m.reply(mensaje);
};

handler.help = ["yts *<consulta>*"];
handler.tags = ["search"];
handler.command = ["yts"];

export default handler;