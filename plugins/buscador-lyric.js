// By Crxstian Escobar 🌙

/*import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ ℹ️ ]  Ingresa el título de la canción.*', m);

  try {
    // Realizamos la solicitud a la API de búsqueda de canciones
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${teks}`);

    // Verificamos que la respuesta tenga estado 200 (OK)
    if (response.status !== 200) {
      return conn.reply(m.chat, `*[ ❌ ] Error: La API de Genius no respondió correctamente. Estado: ${response.status}.*`, m);
    }

    const data = response.data;

    // Verificamos que 'data' sea un arreglo y tenga elementos
    if (!Array.isArray(data) || !data.length) {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se encontró la letra de la canción.*', m);
    }

    const lyricsUrl = data[0].url;

    // Realizamos la solicitud a la API de letras de canciones
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);

    // Verificamos que la respuesta de letras tenga estado 200 (OK)
    if (lyricsResponse.status !== 200) {
      return conn.reply(m.chat, `*[ ❌ ] Error: La API de letras no respondió correctamente. Estado: ${lyricsResponse.status}.*`, m);
    }

    // Verificamos que la respuesta contenga las letras
    if (!lyricsResponse.data || !lyricsResponse.data.lyrics) {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se pudo obtener la letra.*', m);
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
      return conn.reply(m.chat, `Error: ${e.message} *Error*`, m);
    }
  }
};

handler.help = ["letra"].map((v) => v + " <título de la canción>");
handler.tags = ["buscador"];
handler.command = /^(letra)$/i;

export default handler;*/


import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ ℹ️ ] Ingresa el título de la canción.*', m);

  try {
    // Tu Access Token de Genius
    const ACCESS_TOKEN = 'edUmUVkjQtj4ULLeYTSJ69vX3fYdD1ssNqy4BZEVJHFQ848TSOIVB8Wf0LlqIHAB'; 

    // Realizamos la solicitud a la API de búsqueda de canciones en Genius
    const response = await axios.get('https://api.genius.com/search', {
      params: {
        q: teks  // Nombre de la canción que el usuario ingresa
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`  // Usamos el Access Token para autenticar la solicitud
      }
    });

    // Verificamos que la respuesta tenga estado 200 (OK)
    if (response.status !== 200) {
      return conn.reply(m.chat, `*[ ❌ ] Error: La API de Genius no respondió correctamente. Estado: ${response.status}.*`, m);
    }

    const data = response.data.response.hits;

    // Verificamos que haya resultados en la búsqueda
    if (!Array.isArray(data) || data.length === 0) {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se encontró la letra de la canción.*', m);
    }

    // Obtenemos la URL de la letra de la canción
    const songPath = data[0].result.path;
    const lyricsUrl = `https://genius.com${songPath}`;

    // Realizamos la solicitud para obtener la letra de la canción
    const lyricsResponse = await axios.get(lyricsUrl);

    // Verificamos que la respuesta de la URL de la letra tenga contenido
    if (lyricsResponse.status !== 200) {
      return conn.reply(m.chat, `*[ ❌ ] Error: No se pudo acceder a la letra de la canción.*`, m);
    }

    // Parseamos la letra de la canción (suponiendo que tienes algún método para extraerla de la página de Genius)
    const lyrics = extractLyrics(lyricsResponse.data); // Necesitarías crear una función para extraer la letra de la página

    // Si la letra es encontrada, la mostramos
    if (lyrics) {
      const textoLetra = `*${data[0].result.title}*\n*${data[0].result.primary_artist.name}*\n\n${lyrics}`;
      await conn.reply(m.chat, textoLetra, m);
    } else {
      return conn.reply(m.chat, '*[ ❌ ] Error: No se pudo obtener la letra de la canción.*', m);
    }

  } catch (e) {
    console.log(`Error: ${e}`); // Imprimimos el error completo para depuración

    // Verificamos si hay un error de red, de conexión o de otro tipo
    if (e.response) {
      // El error ocurrió en la respuesta de la API
      return conn.reply(m.chat, `Error en la API: ${e.response.status} - ${e.response.statusText}`, m);
    } else if (e.request) {
      // El error ocurrió antes de la respuesta (por ejemplo, si la API no está disponible)
      return conn.reply(m.chat, `Error de red: No se pudo contactar con la API de Genius.`, m);
    } else {
      // Otro tipo de error
      return conn.reply(m.chat, `Error: ${e.message}`, m);
    }
  }
};

// Función para extraer la letra de la canción desde el HTML de Genius
function extractLyrics(pageHtml) {
  // Lógica para extraer la letra de la canción de la página HTML de Genius
  // Esto puede variar dependiendo de cómo está estructurado el HTML
  const regex = /"lyrics":"(.*?)"/;
  const match = pageHtml.match(regex);
  return match ? match[1] : null;  // Devuelve la letra encontrada o null si no se encontró
}

handler.help = ["letra"].map((v) => v + " <título de la canción>");
handler.tags = ["buscador"];
handler.command = /^(letra)$/i;

export default handler;