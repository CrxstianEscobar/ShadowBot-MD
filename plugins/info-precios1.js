import axios from 'axios'; 
import { getTracks } from '@green-code/music-track-data';
import { googleImage } from '@bochilteam/scraper';

const GENIUS_API_TOKEN = 'bU47Z8A6LKMl9kyhI1rz8PxPwR8Fnny_ODkDGGBHqhmo97Ebo9-E5mvqPd3SB1yN'; // Sustituir con tu token de Genius

const handler = async (m, { conn, text }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) {
    return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);
  }

  try {
    const result = await getTracks(teks); 
    let lyrics;
    
    // Si se encuentran resultados de getTracks, buscamos la letra con artista y título
    if (result && result[0]) {
      lyrics = await searchGeniusLyrics(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      // Si no se encuentran resultados, intentamos buscar solo con el título
      lyrics = await searchGeniusLyrics(teks);
    }

    if (!lyrics || !lyrics.lyrics) {
      return conn.reply(m.chat, "*[ ⚠️ ] No se encontró la letra para esta canción.*", m);
    }

    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      img = lyrics.image || 'https://example.com/default-image.jpg'; 
    }

    const textoLetra = `*Title:* ${tituloL}\n*Artist:* ${artistaL}\n\n*Lyrics:*\n${lyrics.lyrics}`;

    // Enviar mensaje con la letra y la imagen
    await conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });

    // Enviar mensaje con audio (si hay previsualización)
    const previewUrl = result[0]?.preview ? result[0]?.preview.replace('http://cdn-preview-', 'https://cdns-preview-').replace('.deezer.com', '.dzcdn.net') : '';
    
    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: previewUrl },
          fileName: `${artistaL} - ${tituloL}.mp3`,
          mimetype: 'audio/mp4',
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return conn.reply(m.chat, "*[ ⚠️ ] Hubo un problema al obtener la letra o los datos de la canción.*", m);
  }
};

// Función para buscar las letras de las canciones usando Genius API
async function searchGeniusLyrics(term) {
  try {
    if (!term) {
      throw 'Por favor, proporciona un nombre válido de la canción para buscar la letra.';
    }

    // Buscar la canción en Genius usando el término
    const response = await axios.get(`https://api.genius.com/search`, {
      params: { q: term },
      headers: {
        Authorization: `Bearer ${GENIUS_API_TOKEN}`, // Usamos el token de Genius
      },
    });

    const song = response.data.response.hits[0]?.result;
    if (!song) {
      console.log(`No se encontró letra para: ${term}`);  // Si no se encuentra la letra
      return null;
    }

    // Obtener la URL de la letra en Genius
    const lyricsUrl = song.url;

    // Obtener la letra directamente desde Genius
    const lyricsPage = await axios.get(lyricsUrl);
    const lyricsData = lyricsPage.data;

    // Buscar el contenido de la letra en la página de Genius
    const $ = cheerio.load(lyricsData);
    const lyrics = $('div.lyrics').text().trim();

    if (!lyrics) {
      console.log(`No se encontró letra en la página de Genius para: ${term}`);
      return null;
    }

    return {
      status: true,
      title: song.title,
      artist: song.primary_artist.name,
      lyrics: lyrics,
      image: song.song_art_image_url || 'https://example.com/default-image.jpg'
    };
  } catch (error) {
    console.error('Error buscando letra:', error);
    return null;
  }
}

handler.help = ['m', 'n'].map(v => v + ' <song title>');
handler.tags = ['internet'];
handler.command = /^(m)$/i;

export default handler;