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
      // Si no se encuentra en Lyrics.ovh, busca en Genius
      const geniusData = await searchGenius(songTitle); 
      if (geniusData) {
        const letraGenius = `*Title:* ${geniusData.title}\n*Artist:* ${geniusData.artist}\n\n*Lyrics:*\n${geniusData.lyrics}`;
        return conn.sendMessage(m.chat, { text: letraGenius }, { quoted: m });
      } else {
        return conn.reply(m.chat, '*[ ⚠️ ] No se encontró la letra para esta canción en Lyrics.ovh ni en Genius. ¿Quieres buscarla en otro sitio?*', m);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return conn.reply(m.chat, '*[ ⚠️ ] Hubo un problema al obtener la letra.*', m);
  }
};

// Función para buscar la letra en Lyrics.ovh
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

// Función para buscar la letra en Genius
async function searchGenius(songTitle) {
  try {
    const API_KEY = 'bU47Z8A6LKMl9kyhI1rz8PxPwR8Fnny_ODkDGGBHqhmo97Ebo9-E5mvqPd3SB1yN';  // Usa tu API Key de Genius
    const formattedTitle = songTitle.split(' ').join('+');  // Reemplazar espacios por "+"
    
    const searchResponse = await axios.get(`https://api.genius.com/search?q=${formattedTitle}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    const song = searchResponse.data.response.hits[0]?.result; // Obtener el primer resultado
    if (song) {
      const lyricsResponse = await axios.get(song.url);
      const lyricsPage = lyricsResponse.data;

      // Extraer la letra de la página de Genius
      const lyrics = extractLyricsFromGeniusPage(lyricsPage);
      return {
        title: song.title,
        artist: song.primary_artist.name,
        lyrics: lyrics,
      };
    } else {
      return null; // Si no se encuentra en Genius
    }
  } catch (error) {
    console.error('Error buscando en Genius:', error);
    return null;
  }
}

// Función para extraer la letra desde la página de Genius
function extractLyricsFromGeniusPage(pageData) {
  const regex = /"lyrics":\s*"([^"]+)"/g;  // Expresión regular para extraer la letra
  const match = regex.exec(pageData);
  return match ? match[1].replace(/\\n/g, '\n') : 'No se pudo extraer la letra';
}

// Configuración del comando
handler.help = ['m', 'lm'].map(v => v + ' <song title>');
handler.tags = ['internet'];
handler.command = /^(m)$/i;

export default handler;