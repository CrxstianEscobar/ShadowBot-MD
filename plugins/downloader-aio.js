import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Obtener el texto de la canción o el mensaje citado
  const teks = text || m.quoted?.text || '';
  
  if (!teks) {
    return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);
  }

  try {
    // Obtener la información de la canción con getTracks
    const result = await getTracks(teks);
    let lyrics;

    // Si se obtiene resultado de getTracks, buscamos la letra usando el artista y el título
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      // Si no hay resultados, busca la letra solo con el texto de la canción
      lyrics = await searchLyrics(teks);
    }

    // Asignar título y artista a partir de los resultados
    const tituloL = result && result[0] ? result[0].title : lyrics.title;
    const artistaL = result && result[0] ? result[0].artist : lyrics.artist;

    // Buscar imagen de la canción
    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      img = lyrics.image || "https://example.com/default-image.jpg"; // Imagen predeterminada
    }

    // Generar el texto con la letra
    const textoLetra = `Title: *${tituloL}*\nArtist:  *${artistaL}*\n\nLetra \n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar el mensaje con la letra y la imagen
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m }
    );

    // Enviar el mensaje con la previsualización de audio (si hay)
    const previewUrl = result[0]?.preview
      ? result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
      : "";

    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: previewUrl },
          fileName: `${artistaL || "-"} - ${tituloL || "-"}.mp3`,
          mimetype: "audio/mp4",
        },
        { quoted: m }
      );
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
    return conn.reply(m.chat, `*❌ Error: No se pudo obtener la letra o los datos de la canción.*`, m);
  }
};

handler.help = ["lim", "lewm"].map((v) => v + " <song title>");
handler.tags = ["downloader"];
handler.command = /^(lim|lem)$/i;

export default handler;

// Función para buscar letras de canciones
async function searchLyrics(term) {
  try {
    if (!term) return "🟥 Provide the name of the song to search the lyrics";

    // Realizar la búsqueda de letras usando una API externa
    const geniusResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${term}`);
    const geniusData = geniusResponse.data;

    if (!geniusData.length) {
      return {
        status: false,
        message: `🟨 Couldn't find any lyrics for "${term}"`
      };
    }

    const lyricsUrl = geniusData[0].url;
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    const result = {
      status: true,
      creador: "Sareth",
      title: geniusData[0].title || "",
      fullTitle: geniusData[0].fullTitle || "",
      artist: geniusData[0].artist.name || "",
      artistUrl: geniusData[0].artist.url || "",
      id: geniusData[0].id || "",
      enpoint: geniusData[0].endpoint || "",
      instrumental: geniusData[0].instrumental,
      image: geniusData[0].image || "",
      url: geniusData[0].url || "",
      lyrics: lyricsResponse.data.lyrics || "",
    };

    return result;
  } catch (error) {
    console.error(error.message);
    return {
      status: false,
      message: error.message || "An error occurred while searching for lyrics."
    };
  }
}