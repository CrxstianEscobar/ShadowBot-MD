import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ x ] Error: Ingresa el título de la canción.*', m);

  try {
    // Realizamos la solicitud a la API de búsqueda de canciones
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${teks}`);
    
    // Verificamos que la respuesta tenga estado 200 (OK)
    if (response.status !== 200) {
      return conn.reply(m.chat, `*[ x ] Error: La API de Genius no respondió correctamente. Estado: ${response.status}.*`, m);
    }
    
    const data = response.data;

    // Verificamos que 'data' sea un arreglo y tenga elementos
    if (!Array.isArray(data) || !data.length) {
      return conn.reply(m.chat, '*[ x ] Error: No se encontró la letra de la canción.*', m);
    }

    const lyricsUrl = data[0].url;

    // Realizamos la solicitud a la API de letras de canciones
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    
    // Verificamos que la respuesta de letras tenga estado 200 (OK)
    if (lyricsResponse.status !== 200) {
      return conn.reply(m.chat, `*[ x ] Error: La API de letras no respondió correctamente. Estado: ${lyricsResponse.status}.*`, m);
    }

    // Verificamos que la respuesta contenga las letras
    if (!lyricsResponse.data || !lyricsResponse.data.lyrics) {
      return conn.reply(m.chat, '*[ x ] Error: No se pudo obtener la letra.*', m);
    }

    const lyrics = lyricsResponse.data.lyrics;
    const textoLetra = `*${data[0].title}*\n*${data[0].artist.name}*\n\n${lyrics}`;
    await conn.reply(m.chat, textoLetra, m);

  } catch (e) {
    console.log(`Error: ${e}`); // Imprimimos el error completo para depuración

    // Verificamos si hay un error de red, de conexión o de otro tipo
    if (e.response) {
      // El error ocurrió en la respuesta de la API
      return conn.reply(m.chat, `Error en la API: ${e.response.status} - ${e.response.statusText}`, m);
    } else if (e.request) {
      // El error ocurrió antes de la respuesta (por ejemplo, si la API no está disponible)
      return conn.reply(m.chat, `Error de red: No se pudo contactar con las APIs.`, m);
    } else {
      // Otro tipo de error
      return conn.reply(m.chat, `Error: ${e.message} 😿🍨`, m);
    }
  }
};

handler.help = ["l"].map((v) => v + " <título de la canción>");
handler.tags = ["as"];
handler.command = /^(l)$/i;

export default handler;