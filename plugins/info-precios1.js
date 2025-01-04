import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ 🌷 ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    // Primero obtenemos los detalles de la canción
    const result = await getTracks(teks);
    if (!result || !result[0]) {
      return conn.reply(m.chat, '*❌ No se encontró información para la canción solicitada.*', m);
    }

    // Obtenemos los datos de la canción
    const artist = result[0]?.artist || '';
    const title = result[0]?.title || '';

    // Intentamos obtener la letra
    let lyrics;
    lyrics = await searchLyrics(`${artist} - ${title}`);

    if (!lyrics || !lyrics.lyrics) {
      lyrics = { lyrics: "Letra no encontrada." }; // Si no se encuentra la letra, indicamos que no se ha encontrado.
    }

    // Intentamos obtener la imagen de la canción
    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artist} ${title}`)).getRandom();
    } catch {
      img = "https://example.com/default-image.jpg"; // Imagen por defecto si no se encuentra ninguna
    }

    // Creamos el texto con la letra y otros detalles
    const textoLetra = `*Title:* ${title}\n*Artist:* ${artist}\n\n*Lyrics:*\n${lyrics.lyrics}`;

    // Enviamos el mensaje con la letra y la imagen
    await conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });

    // Si existe un preview de audio, lo enviamos
    const previewUrl = result[0]?.preview
      ? result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
      : "";

    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        { audio: { url: previewUrl }, fileName: `${artist} - ${title}.mp3`, mimetype: "audio/mp4" },
        { quoted: m }
      );
    }

  } catch (e) {
    console.error(`Error: ${e.message}`);
    return conn.reply(m.chat, '*❌ Error al obtener la letra o los datos de la canción.*', m);
  }
};

handler.help = ["litx", "letx"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(litx)$/i;

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
      console.log(`No se encontró la letra para "${term}"`);
      return { lyrics: "Letra no encontrada." };
    }

    // Devolver la letra encontrada
    return { lyrics: data.lyrics };
  } catch (error) {
    console.error("Error buscando letra:", error);
    return { lyrics: "Error al buscar la letra." };
  }
}