import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, text }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  // Tu Genius API Access Token
  const accessToken = "bU47Z8A6LKMl9kyhI1rz8PxPwR8Fnny_ODkDGGBHqhmo97Ebo9-E5mvqPd3SB1yN"; // Aquí pon tu token

  try {
    // Obtener información de la canción usando la API de Tracks
    const result = await getTracks(teks);
    let lyrics;

    // Si obtenemos resultados de `getTracks`
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} - ${result[0]?.title}`); // Formato artist - song
    } else {
      // Si no se encuentra nada, buscamos la letra solo con el texto ingresado
      lyrics = await searchLyrics(teks);
    }

    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    let img;
    try {
      // Intentamos obtener la imagen de varias fuentes
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      img = lyrics.image || "https://example.com/default-image.jpg"; // Imagen predeterminada si no se obtiene ninguna
    }

    const textoLetra = `*Title:* ${tituloL}\n*Artist:* ${artistaL}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar mensaje con la letra y la imagen
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m }
    );

    // Enviar mensaje con audio (si hay previsualización)
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
    console.error(`Error: ${error.message}`);
    return conn.reply(m.chat, "*❌ Error while fetching lyrics or track data*", m);
  }
};

handler.help = ["gen", "geni"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(geni)$/i;

export default handler;

// Función para buscar letras de canciones usando la API de Genius
async function searchLyrics(term) {
  try {
    if (!term) throw "Please provide a valid song name to search the lyrics.";

    // Reemplazar los espacios por '+' para la URL
    const formattedTerm = term.split(" ").join("+");

    // Llamada a la API de Genius para obtener la letra
    const response = await axios.get(`https://api.genius.com/search?q=${formattedTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Usamos el Access Token aquí
      },
    });

    const data = response.data.response.hits;
    
    // Si no encontramos ninguna canción
    if (!data || data.length === 0) {
      return {
        status: false,
        message: `Couldn't find any lyrics for "${term}".`,
      };
    }

    // Obtener la primera coincidencia de la búsqueda
    const song = data[0].result;
    
    const lyricsUrl = song.url; // URL para obtener la letra completa
    const lyricsResponse = await axios.get(lyricsUrl);
    
    // Usamos cheerio para extraer la letra del HTML de la página de Genius
    const $ = cheerio.load(lyricsResponse.data);
    const lyrics = $(".lyrics").text().trim();

    // Si no encontramos la letra, intentar otro selector
    if (!lyrics) {
      const lyricsAlt = $(".SongPage__Body__Lyrics-sc-1dqxkp5-7").text().trim();
      if (lyricsAlt) {
        return {
          status: true,
          title: song.title || "",
          artist: song.primary_artist.name || "",
          lyrics: lyricsAlt || "Lyrics not found.",
          image: song.song_art_image_url || "https://example.com/default-image.jpg", // Imagen de la canción
        };
      }
    }

    // Si no encontramos la letra en ningún selector
    if (!lyrics) {
      return {
        status: false,
        message: "Lyrics not found.",
      };
    }

    return {
      status: true,
      title: song.title || "",
      artist: song.primary_artist.name || "",
      lyrics: lyrics || "Lyrics not found.",
      image: song.song_art_image_url || "https://example.com/default-image.jpg", // Imagen de la canción
    };
  } catch (error) {
    console.error("Error searching lyrics:", error);
    return {
      status: false,
      message: error.message || "An error occurred while searching for lyrics.",
    };
  }
}