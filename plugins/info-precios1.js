import axios from 'axios';

const handler = async (m, { conn, text }) => {
  // Extraemos el título de la canción desde el texto
  const teks = text || m.quoted?.text || '';
  if (!teks) {
    return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);
  }

  try {
    // Buscar la letra de la canción
    const lyrics = await searchLyricsOVH(teks);

    if (!lyrics || !lyrics.lyrics) {
      return conn.reply(m.chat, "*[ ⚠️ ] No se encontró la letra para esta canción.*", m);
    }

    // Enviar la letra al chat
    const textoLetra = `*Title:* ${lyrics.title}\n*Artist:* ${lyrics.artist}\n\n*Lyrics:*\n${lyrics.lyrics}`;

    await conn.sendMessage(m.chat, { text: textoLetra }, { quoted: m });

  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return conn.reply(m.chat, "*[ ⚠️ ] Hubo un problema al obtener la letra o los datos de la canción.*", m);
  }
};

// Función que busca la letra de la canción usando Lyrics.ovh
async function searchLyricsOVH(term) {
  try {
    if (!term) {
      throw 'Por favor, proporciona un nombre válido de la canción para buscar la letra.';
    }

    // Reemplazamos los espacios con "+" para la URL
    const formattedTerm = term.split(' ').join('+');
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);

    // Si la API responde con un error, lo manejamos
    if (response.data.error) {
      console.log(`No se encontró letra para: ${term}`);
      return null;
    }

    // Devolvemos la información de la letra
    return {
      status: true,
      title: term.split(' - ')[1] || term, // Si no tiene el formato artista - canción, solo el nombre
      artist: term.split(' - ')[0] || 'Desconocido', // Si no tiene el formato, poner 'Desconocido'
      lyrics: response.data.lyrics,
    };
  } catch (error) {
    console.error('Error buscando letra:', error);
    return null;
  }
}

// Configuración del comando
handler.help = ['m', 'm'].map(v => v + ' <song title>');
handler.tags = ['internet'];
handler.command = /^(m)$/i;

export default handler;