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

    // Intentamos obtener la letra de la canción con Lyrics.ovh
    if (result && result[0]) {
      lyrics = await searchLyricsOVH(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      lyrics = await searchLyricsOVH(teks);
    }

    // Si no se encuentra la letra
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

    // Enviar el mensaje con la letra y la imagen
    await conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });

  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return conn.reply(m.chat, "*[ ⚠️ ] Hubo un problema al obtener la letra o los datos de la canción.*", m);
  }
};

// Función para buscar las letras de las canciones usando Lyrics.ovh
async function searchLyricsOVH(term) {
  try {
    if (!term) {
      throw 'Por favor, proporciona un nombre válido de la canción para buscar la letra.';
    }

    // Reemplazamos los espacios con "+" para la URL
    const formattedTerm = term.split(' ').join('+');
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);

    if (response.data.error) {
      console.log(`No se encontró letra para: ${term}`);
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

handler.help = ['m', 'h'].map(v => v + ' <song title>');
handler.tags = ['internet'];
handler.command = /^(m)$/i;

export default handler;