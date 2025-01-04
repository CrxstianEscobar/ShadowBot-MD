import axios from 'axios'; 
import { getTracks } from '@green-code/music-track-data';
import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) {
    return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);
  }

  try {
    const result = await getTracks(teks);
    let lyrics;

    // Buscar la letra con la API de Lyrics.ovh
    if (result && result[0]) {
      lyrics = await searchLyricsOVH(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      // Si no se encuentran resultados, intentamos buscar solo con el título
      lyrics = await searchLyricsOVH(teks);
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

// Función para buscar las letras de las canciones usando la API Lyrics.ovh
async function searchLyricsOVH(term) {
  try {
    if (!term) {
      throw 'Por favor, proporciona un nombre válido de la canción para buscar la letra.';
    }

    // Buscar la canción en Lyrics.ovh
    const formattedTerm = term.split(' ').join('+'); // Reemplazamos los espacios con "+" para la URL
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);

    if (response.data.error) {
      console.log(`No se encontró letra para: ${term}`);  // Si no se encuentra la letra
      return null;
    }

    return {
      status: true,
      title: term.split(' - ')[1] || '',
      artist: term.split(' - ')[0] || '',
      lyrics: response.data.lyrics,
      image: 'https://example.com/default-image.jpg' // Imagen predeterminada
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