import axios from 'axios';
import cheerio from 'cheerio';  // Para parsear la página de Genius
import { getTracks } from "@green-code/music-track-data"; // Si quieres obtener la canción por nombre
import { googleImage } from "@bochilteam/scraper"; // Para obtener la imagen
import fs from "fs";

// Función para obtener la letra de Genius
async function obtenerLetraDeGenius(term) {
  try {
    const url = `https://api.genius.com/search?q=${term}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${bU47Z8A6LKMl9kyhI1rz8PxPwR8Fnny_ODkDGGBHqhmo97Ebo9-E5mvqPd3SB1yN}`,  // Reemplaza con tu API key de Genius
      }
    });

    // Obtener la canción principal de los resultados
    const song = response.data.response.hits[0].result;
    const lyricsUrl = song.url;

    // Obtener el HTML de la página de Genius con la letra
    const lyricsResponse = await axios.get(lyricsUrl);
    const $ = cheerio.load(lyricsResponse.data);

    // Buscar la letra en la página
    const lyrics = $('.lyrics').text().trim();

    // Si la letra no está disponible en el HTML, manejar el error
    if (!lyrics) {
      return { error: true, message: "No se pudo extraer la letra." };
    }

    return {
      title: song.title,
      artist: song.primary_artist.name,
      lyrics: lyrics
    };
  } catch (error) {
    console.error(error.message);
    return { error: true, message: "Ocurrió un error al obtener la letra." };
  }
}

// Función para enviar la letra al chat
async function enviarLetraAlChat(m, { conn, text }) {
  const teks = text || m.quoted?.text || ''; 
  if (!teks) {
    return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);
  }

  // Obtener el resultado de la letra de Genius
  const letra = await obtenerLetraDeGenius(teks);

  // Verificar si la letra se obtuvo correctamente
  if (letra.error) {
    return conn.reply(m.chat, `*❌ Error:* ${letra.message}`, m);
  }

  const textoLetra = `*Title:* ${letra.title}\n*Artist:* ${letra.artist}\n\n*Lyrics:*\n${letra.lyrics || "No se pudo encontrar la letra."}`;

  // Obtener imagen de la canción
  let img;
  try {
    img = await googleImage(`${letra.artist} ${letra.title}`).getRandom();
  } catch (err) {
    img = "https://example.com/default-image.jpg";  // Imagen predeterminada si no se obtiene ninguna
  }

  // Enviar mensaje con la letra y la imagen
  await conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });

  // Intentar enviar audio si está disponible
  const result = await getTracks(teks);  // Si quieres usar la API para obtener la canción
  const previewUrl = result[0]?.preview
    ? result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
    : "";

  if (previewUrl) {
    await conn.sendMessage(m.chat, {
      audio: { url: previewUrl },
      fileName: `${letra.artist} - ${letra.title}.mp3`,
      mimetype: "audio/mp4",
    }, { quoted: m });
  }
}

// Agregar el comando de la función a tu bot
handler.help = ["x", "letra"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(x)$/i;

export default handler;