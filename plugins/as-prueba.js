
/*import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ x ] Error: Ingresa el título de la canción.*', m);

  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${teks}`);
    const data = response.data;
    if (!data.length) return conn.reply(m.chat, '*[ x ] Error: No se encontró la letra de la canción.*', m);

    const lyricsUrl = data[0].url;
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    const lyrics = lyricsResponse.data.lyrics;

    const textoLetra = `*${data[0].title}*\n*${data[0].artist.name}*\n\n${lyrics}`;
    await conn.reply(m.chat, textoLetra, m);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    throw `*Error 😿🍨*`;
  }
};

handler.help = ["let"].map((v) => v + " <título de la canción>");
handler.tags = ["as"];
handler.command = /^(let)$/i;

export default handler;*/
/*¡Claro, Cristian Escobar! Aquí tienes una versión mejorada de tu código, con algunas validaciones adicionales y mejoras en el manejo de errores:

```javascript*/
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ x ] Error: Ingresa el título de la canción.*', m);

  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${teks}`);
    const data = response.data;

    // Verificamos que 'data' sea un arreglo y tenga elementos
    if (!Array.isArray(data) || !data.length) {
      return conn.reply(m.chat, '*[ x ] Error: No se encontró la letra de la canción.*', m);
    }

    const lyricsUrl = data[0].url;

    // Verificamos que la URL de letras sea válida
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    
    // Verificamos que la respuesta contenga letras
    if (!lyricsResponse.data || !lyricsResponse.data.lyrics) {
      return conn.reply(m.chat, '*[ x ] Error: No se pudo obtener la letra.*', m);
    }

    const lyrics = lyricsResponse.data.lyrics;
    const textoLetra = `*${data[0].title}*\n*${data[0].artist.name}*\n\n${lyrics}`;
    await conn.reply(m.chat, textoLetra, m);
  } catch (e) {
    console.log(`Error: ${e}`); // Imprimimos el error completo para depuración
    return conn.reply(m.chat, `Error: ${e.message} 😿🍨`, m);
  }
};

handler.help = ["let"].map((v) => v + " <título de la canción>");
handler.tags = ["as"];
handler.command = /^(let)$/i;

export default handler;