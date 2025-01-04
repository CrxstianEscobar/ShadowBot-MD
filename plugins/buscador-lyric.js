import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ 🤖 ] Ingresa el título de la canción.*', m);

  try {
    // Reemplaza este token con el tuyo
    const ACCESS_TOKEN = '_NtAE3KTS3t7KThl1PPmNt5UJ3BPWF_ssSoteHszAgMfmZHJWZFlY4Vyz58cM'; 

    // Solicitar a la API de Genius para obtener la canción
    const response = await axios.get('https://api.genius.com/search', {
      params: { q: teks },  // Búsqueda por título de la canción
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });

    // Verificar si la búsqueda ha devuelto resultados
    const data = response.data.response.hits;
    if (!Array.isArray(data) || data.length === 0) {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se encontró la letra de la canción.*', m);
    }

    // Obtener el path de la canción desde los resultados de la búsqueda
    const songPath = data[0].result.path;
    const lyricsUrl = `https://genius.com${songPath}`;  // Crear la URL de la página de la letra

    // Obtener la página de la letra con axios
    const lyricsPage = await axios.get(lyricsUrl);
    const $ = cheerio.load(lyricsPage.data); // Cargar el HTML con cheerio

    // Extraer la letra de la canción del HTML
    const lyrics = $('.lyrics').text();  // Buscamos el contenedor con la clase 'lyrics'

    // Si no se encontró la letra
    if (!lyrics) {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se pudo obtener la letra de la canción.*', m);
    }

    // Crear el mensaje con la letra de la canción
    const textoLetra = `*${data[0].result.title}*\n*${data[0].result.primary_artist.name}*\n\n${lyrics}`;
    await conn.reply(m.chat, textoLetra, m);

  } catch (e) {
    console.log(`Error: ${e}`);  // Log de errores

    // Gestionar diferentes tipos de errores
    if (e.response) {
      return conn.reply(m.chat, `Error en la API: ${e.response.status} - ${e.response.statusText}`, m);
    } else if (e.request) {
      return conn.reply(m.chat, `Error de red: No se pudo contactar con la API de Genius.`, m);
    } else {
      return conn.reply(m.chat, `Error: ${e.message}`, m);
    }
  }
};

handler.help = ["letra"].map((v) => v + " <título de la canción>");
handler.tags = ["buscador"];
handler.command = /^(letra)$/i;

export default handler;