import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import got from "got";
import fs from "fs";
import fetch from 'node-fetch'; // Si usas node-fetch en lugar de fetch nativo

const handler = async (m, { conn, text, usedPrefix, command }) => {
 
  const teks = text || (m.quoted && m.quoted.text) || "";

  if (!teks) {
    throw `*ok .li beret ojala*`;
  }

  try {
    const result = await getTracks(teks);
    let lyrics;
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(teks);
    }

    const tituloL = result && result[0]?.title ? result[0].title : lyrics.title || "Título desconocido";
    const artistaL = result && result[0]?.artist ? result[0].artist : lyrics.artist || "Artista desconocido";
    let img;

    // Intentar obtener la imagen de varias fuentes
    try {
      img = result?.[0]?.album?.artwork || json?.thumbnail?.genius || await googleImage(`${artistaL} ${tituloL}`).then(bochil => bochil.getRandom()) || lyrics.image || "default-image.jpg";
    } catch {
      img = "default-image.jpg"; // Imagen por defecto si no se encuentra ninguna
    }

    const previewUrl = result?.[0]?.preview
      ? result[0].preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
      : "";

    const textoLetra = `j *${tituloL}*\nk *${artistaL}*\n\nv\n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar mensaje con imagen y letra
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m },
    );

    // Enviar mensaje con audio de previsualización
    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: previewUrl },
          fileName: `${artistaL} - ${tituloL}.mp3`,
          mimetype: "audio/mp4",
        },
        { quoted: m },
      );
    }

  } catch (e) {
    console.log(`Error: ${e.message}`);
    throw `err*`;
  }
};

// Definir los comandos que ejecutarán este handler
handler.help = ["li", "le"].map((v) => v + " <Apa>");
handler.tags = ["internet"];
handler.command = /^(li)$/i;

export default handler;

/* Función para obtener las letras de Genius usando una API intermedia */
async function searchLyrics(term) {
  try {
    if (!term) return { lyrics: "🟥 Provide the name of the song to search the lyrics" };

    // Realizar búsqueda en la API de Genius a través de un servidor intermedio
    const geniusResponse = await got.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=${term}`).json();
    if (!geniusResponse.length) {
      return { lyrics: `🟨 Couldn't find any lyrics for "${term}"` };
    }

    const lyricsUrl = geniusResponse[0]?.url;
    const lyricsResponse = await got.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`).json();

    return {
      status: true,
      creador: "Sareth",
      title: geniusResponse[0]?.title || "No title",
      artist: geniusResponse[0]?.artist?.name || "Unknown artist",
      lyrics: lyricsResponse?.data?.lyrics || "Lyrics not found",
      image: geniusResponse[0]?.image || "default-image.jpg",
    };
  } catch (error) {
    console.error("Error en searchLyrics:", error);
    return {
      status: false,
      message: error.message,
    };
  }
}