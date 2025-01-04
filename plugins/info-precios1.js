import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import fs from "fs";

const handler = async (m, { conn, text }) => {
  // Asegúrate de que 'teks' se extrae correctamente
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ 👩🏼 ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    // Obtenemos el resultado de getTracks
    const result = await getTracks(teks);
    console.log("Resultado de getTracks:", result); // Asegúrate de que el resultado contiene los datos necesarios

    let lyrics;

    // Si obtenemos resultados de getTracks
    if (result && result[0]) {
      // Buscamos la letra usando el nombre del artista y el título
      lyrics = await searchLyrics(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      // Si no encontramos resultados de getTracks, buscamos la letra solo con el texto ingresado
      lyrics = await searchLyrics(teks);
    }

    // Asignamos el título y el artista
    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    // Intentamos obtener la imagen del álbum, si no existe, buscamos una alternativa
    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      img = lyrics.image || "https://example.com/default-image.jpg"; // Imagen predeterminada si no se obtiene ninguna
    }

    // Preparamos el texto de la letra
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
    throw "*Error while fetching lyrics or track data*";
  }
};

handler.help = ["ka", "ke"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(ka)$/i;

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