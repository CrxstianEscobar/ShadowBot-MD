import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    // Obtenemos los datos de la canción
    const result = await getTracks(teks);
    let lyrics;
    
    // Si encontramos resultados, buscamos la letra usando los datos del artista y título
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      // Si no se encuentra nada, buscamos la letra con el término proporcionado por el usuario
      lyrics = await searchLyrics(teks);
    }

    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    let img;
    try {
      // Intentamos obtener la imagen de la canción
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      // Si no conseguimos la imagen, usamos una predeterminada
      img = lyrics.image || "https://example.com/default-image.jpg";
    }

    // Preparamos el texto para mostrar la letra
    const textoLetra = `*Title:* ${tituloL}\n*Artist:* ${artistaL}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar mensaje con la letra y la imagen
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m }
    );

    // Enviar mensaje con el audio de la previsualización, si existe
    const previewUrl = result[0]?.preview
      ? result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
      : "";

    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: previewUrl },
          fileName: `${artistaL} - ${tituloL}.mp3`,
          mimetype: "audio/mp4",
        },
        { quoted: m }
      );
    }

  } catch (error) {
    console.error("Error:", error.message);
    return conn.reply(m.chat, "*❌ Error al obtener la letra o datos de la canción.*", m);
  }
};

// Función para buscar las letras usando una API externa (en este caso la API de Genius)
async function searchLyrics(term) {
  try {
    if (!term) throw "🟥 Provide the name of the song to search the lyrics.";
    
    console.log("Searching lyrics for:", term); // Depuración

    // Reemplazamos los espacios con '+' para adecuar el término a la URL de la API
    const formattedTerm = term.split(" ").join("+");

    // Realizamos la solicitud a la API de Genius para buscar la canción
    const geniusResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${formattedTerm}`);
    const geniusData = geniusResponse.data;

    if (!geniusData.length) {
      console.log(`No lyrics found for "${term}"`); // Depuración
      return {
        status: false,
        message: `🟨 Couldn't find any lyrics for "${term}"`
      };
    }

    // Si encontramos resultados, obtenemos la URL de las letras
    const lyricsUrl = geniusData[0].url;
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    
    // Construimos el objeto con los resultados
    const result = {
      status: true,
      title: geniusData[0].title || "",
      artist: geniusData[0].artist.name || "",
      lyrics: lyricsResponse.data.lyrics || "Lyrics not found.",
      image: geniusData[0].image || "https://example.com/default-image.jpg",
    };

    console.log("Found lyrics:", result.lyrics); // Depuración
    return result;
  } catch (error) {
    console.error("Error searching lyrics:", error);
    return {
      status: false,
      message: error.message || "An error occurred while searching for lyrics."
    };
  }
}

handler.help = ["ligh", "lig"].map((v) => v + " <song title>");
handler.tags = ["info"];
handler.command = /^(ligh)$/i;

export default handler;