const handler = async (m, { conn, args }) => {
  // Verificamos si no se ha proporcionado un enlace
  if (!args[0]) {
    // Si no hay enlace, enviamos el mensaje informativo
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴*');
    return; // Terminamos la ejecución aquí, ya que no hay enlace.
  }

  // Si llega hasta aquí, significa que se ha proporcionado el enlace
  // Continuamos con el proceso normal (esto es solo un ejemplo, puedes agregar tu lógica aquí)
  await m.reply(`¡Enlace recibido! El video es: ${args[0]}`);
};

handler.command = /^ytmp4doc|ytvdoc|ytmp4.2|ytv.2$/i;
export default handler;