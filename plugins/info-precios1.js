import axios from 'axios';

const handler = async (m, { conn, text }) => {
  const songTitle = text || m.quoted?.text || '';  // Obtener el texto de la canción
  if (!songTitle) {
    return conn.reply(m.chat, '*[ ⚠️ ] Ingresa el título de la canción para obtener la letra.*', m);
  }

  try {
    const lyricsData = await searchLyrics(songTitle); // Buscar la letra usando Lyrics.ovh
    if (lyricsData && lyricsData.lyrics) {
      const letra = `*Title:* ${lyricsData.title}\n*Artist:* ${lyricsData.artist}\n\n*Lyrics:*\n${lyricsData.lyrics}`;
      return conn.sendMessage(m.chat, { text: letra }, { quoted: m });
    } else {
      return conn.reply(m.chat, '*[ ⚠️ ] No se encontró la letra para esta canción en Lyrics.ovh. ¿Quieres buscarla en otro sitio?*', m);
    }
  } catch (error) {
    console.error('Error:', error);
    return conn.reply(m.chat, '*[ ⚠️ ] Hubo un problema al obtener la letra.*', m);
  }
};

// Función para buscar la letra de la canción
async function searchLyrics(songTitle) {
  try {
    const formattedTitle = songTitle.split(' ').join('+'); // Reemplazar espacios por "+"
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTitle}`);

    if (response.data.lyrics) {
      return {
        title: songTitle.split(' - ')[1] || songTitle,
        artist: songTitle.split(' - ')[0] || 'Desconocido',
        lyrics: response.data.lyrics,
      };
    } else {
      return null;  // Si no se encuentra la letra
    }
  } catch (error) {
    console.error('Error buscando letra:', error);
    return null;
  }
}

// Configuración del comando
handler.help = ['n', 'letrañ'].map(v => v + ' <song title>');
handler.tags = ['internet'];
handler.command = /^(n)$/i;

export default handler;