import axios from "axios"; // Usamos axios para obtener la letra
import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";

const handler = async (m, { conn, text }) => {
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : "";
  if (!teks) throw "*Please provide a song title*";

  try {
    console.log("Buscando pista para:", teks);

    // Obtener pistas usando la API de getTracks
    const result = await getTracks(teks);
    console.log("Resultado de getTracks:", result); // Ver el resultado de getTracks

    let lyrics;

    // Si encontramos el resultado, buscamos la letra de la canción
    if (result && result[0]) {
      console.log("Track found:", result[0]);
      lyrics = await searchLyrics(`${result[0]?.artist} - ${result[0]?.title}`); // Buscar la letra usando el formato artist - song
    } else {
      console.log("No track found, buscando solo la letra...");
      lyrics = await searchLyrics(teks); // Buscar solo la letra de la canción si no encontramos resultado
    }

    if (!lyrics.status) {
      throw lyrics.message; // Si no se encontró la letra, lanzamos un error
    }

    console.log("Letra encontrada:", lyrics); // Verificar la letra obtenida

    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    let img;

    // Intentar obtener una imagen
    try {
      console.log("Intentando obtener imagen...");
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch (err) {
      console.error("Error al obtener imagen:", err);
      img = lyrics.image || "https://example.com/default-image.jpg"; // Imagen predeterminada si no se obtiene ninguna
    }

    console.log("Imagen obtenida:", img);

    const textoLetra = `*Title:* ${tituloL}\n*Artist:* ${artistaL}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

    // Enviar mensaje con la letra y la imagen
    console.log("Enviando letra y imagen...");
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
      console.log("Enviando audio...");
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
    console.error("Error completo:", error);
    throw "*Error while fetching lyrics or track data*";
  }
};

handler.help = ["lirik", "letra"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(li|lyrics|lyric|letra)$/i;

export default handler;

// Función para buscar letras de canciones
async function searchLyrics(term) {
  try {
    if (!term) throw "Please provide a valid song name to search the lyrics.";

    // Reemplazar los espacios por '+' para la URL
    const formattedTerm = term.split(" ").join("+");

    // Llamada a la API de letras para buscar la canción
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);
    const data = response.data;

    // Si no se encuentra la letra, devolver un mensaje adecuado
    if (!data.lyrics) {
      return {
        status: false,
        message: `Couldn't find any lyrics for "${term}".`
      };
    }

    // Devolver la letra encontrada
    return {
      status: true,
      title: term.split(" - ")[1] || "",
      artist: term.split(" - ")[0] || "",
      lyrics: data.lyrics,
      image: "https://example.com/default-image.jpg" // Imagen predeterminada
    };
  } catch (error) {
    console.error("Error searching lyrics:", error);
    return {
      status: false,
      message: error.message || "An error occurred while searching for lyrics."
    };
  }
}