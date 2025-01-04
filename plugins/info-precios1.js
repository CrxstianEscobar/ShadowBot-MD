import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";

const handler = async (m, { conn, text }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ 💫 ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

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

handler.help = ["kx", "k"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(k)$/i;

export default handler;

// Función para buscar letras de canciones usando la API Lyrics.ovh
async function searchLyrics(term) {
  try {
    if (!term) throw "Please provide a valid song name to search the lyrics.";

    // Reemplazar los espacios por '+' para la URL
    const formattedTerm = term.split(" ").join("+");

    // Llamada a la API de Lyrics.ovh para obtener la letra
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);
    
    if (response.data.error) {
      return {
        status: false,
        message: `Couldn't find any lyrics for "${term}".`,
      };
    }

    // Si encontramos la letra, devolverla
    return {
      status: true,
      title: term.split(" - ")[1] || "",
      artist: term.split(" - ")[0] || "",
      lyrics: response.data.lyrics || "Lyrics not found.",
      image: "https://example.com/default-image.jpg", // Imagen predeterminada
    };
  } catch (error) {
    console.error("Error searching lyrics:", error);
    return {
      status: false,
      message: error.message || "An error occurred while searching for lyrics.",
    };
  }
}