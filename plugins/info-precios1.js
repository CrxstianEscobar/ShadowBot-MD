import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    // Primero obtenemos los detalles de la canción
    const result = await getTracks(teks);
    console.log(result);  // Verifica los datos que devuelve getTracks

    // Si no se obtienen resultados, se muestra un mensaje de error
    if (!result || !result[0]) {
      throw new Error(`*❌ No se encontró información para "${teks}"*`);
    }

    let lyrics;
    const artist = result[0]?.artist || "";
    const title = result[0]?.title || "";

    // Buscamos la letra con los detalles obtenidos
    lyrics = await searchLyrics(`${artist} - ${title}`);

    // Si no encontramos la letra, se muestra un mensaje de error
    if (!lyrics.status) {
      throw new Error(`*❌ No se encontró la letra para "${teks}"*`);
    }

    // Obtenemos la imagen asociada a la canción
    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artist} ${title}`)).getRandom();
    } catch {
      img = lyrics.image || "https://example.com/default-image.jpg";
    }

    // Creamos el texto con la letra y otros detalles
    const textoLetra = `*Title:* ${title}\n*Artist:* ${artist}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

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
    throw `*❌ Error al obtener la letra o los datos de la canción*`;
  }
};

handler.help = ["lexx", "lex"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(lex)$/i;

export default handler;

// Función para buscar letras de canciones
async function searchLyrics(term) {
  try {
    if (!term) throw "Please provide a valid song name to search the lyrics.";

    const formattedTerm = term.split(" ").join("+");
    console.log(`Buscando letra para: ${term}`);

    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);
    const data = response.data;

    // Verifica si la letra fue encontrada
    if (!data.lyrics) {
      console.log(`No se encontró la letra para "${term}"`);
      return { status: false, message: `Couldn't find any lyrics for "${term}".` };
    }

    // Devuelve la letra encontrada
    console.log(`Letra encontrada para "${term}"`);
    return {
      status: true,
      title: term.split(" - ")[1] || "",
      artist: term.split(" - ")[0] || "",
      lyrics: data.lyrics,
      image: "https://example.com/default-image.jpg"
    };
  } catch (error) {
    console.error("Error buscando letra:", error);
    return { status: false, message: error.message || "An error occurred while searching for lyrics." };
  }
}