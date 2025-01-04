import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import got from "got";
import axios from 'axios'; // Importación de axios
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : "";
  if (!teks) throw "🟥 *Please provide a song title or reply to a message with the song title*";

  try {
    const result = await getTracks(teks);
    let lyrics;
    
    // Si se encuentra un resultado de la búsqueda, usar la información obtenida
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(`${teks}`); // Si no se encontró, buscar la letra solo con el texto
    }

    // Definir título y artista
    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    // Obtener datos de la API externa para la letra
    const res = await got("https://some-random-api.com/lyrics", {
      searchParams: { title: `${artistaL} ${tituloL}` }
    }).json();

    let img;

    // Intentar obtener la imagen de varias fuentes en caso de que alguna falle
    try {
      img = result[0]?.album?.artwork;
    } catch {
      try {
        img = res.thumbnail?.genius; // Imagen desde la API externa
      } catch {
        try {
          const bochil = await googleImage(`${artistaL} ${tituloL}`);
          img = await bochil.getRandom(); // Imagen desde Google Images
        } catch {
          img = lyrics.image; // Última opción si todo falla
        }
      }
    }

    const previewUrl = result[0]?.preview
      .replace("http://cdn-preview-", "https://cdns-preview-")
      .replace(".deezer.com", ".dzcdn.net");

    const textoLetra = `*Title:* ${tituloL || "Unknown"}\n*Artist:* ${artistaL || "Unknown"}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar imagen y letra
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m }
    );

    // Enviar audio de previsualización
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: previewUrl },
        fileName: `${artistaL || "-"} - ${tituloL || "-"} .mp3`,
        mimetype: "audio/mp4",
      },
      { quoted: m }
    );
  } catch (e) {
    console.log(`Error: ${e.message}`);
    throw "*Error while fetching lyrics or track data*";
  }
};

// Definir comandos de ayuda
handler.help = ["lirik", "letra"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;

export default handler;

// Función para buscar letras
async function searchLyrics(term) {
  try {
    if (!term) return "🟥 Please provide the name of the song to search for lyrics.";

    // Buscar letras a través de Genius API
    const geniusResponse = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/genius?q=${term}`
    );
    const geniusData = geniusResponse.data;
    if (!geniusData.length) return `🟨 Couldn't find any lyrics for "${term}"`;

    const lyricsUrl = geniusData[0].url;
    const lyricsResponse = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`
    );

    return {
      status: true,
      creator: "Sareth",
      title: geniusData[0].title || "",
      fullTitle: geniusData[0].fullTitle || "",
      artist: geniusData[0].artist.name || "",
      artistUrl: geniusData[0].artist.url || "",
      id: geniusData[0].id || "",
      endpoint: geniusData[0].endpoint || "",
      instrumental: geniusData[0].instrumental,
      image: geniusData[0].image || "",
      url: geniusData[0].url || "",
      lyrics: lyricsResponse.data.lyrics || "Lyrics not found.",
    };
  } catch (error) {
    console.error("Error searching lyrics:", error.message);
    return {
      creator: "Sareth",
      status: false,
      message: new Error(error).message,
    };
  }
}