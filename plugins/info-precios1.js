// Mejorado por Cristian Escobar 

import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import axios from "axios";

const handler = async (m, { conn, text }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ 🍸 ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    const result = await getTracks(teks);
    let lyrics;

    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} - ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(teks);
    }

    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    let img;
    try {
      img = result[0]?.album?.artwork || (await googleImage(`${artistaL} ${tituloL}`)).getRandom();
    } catch {
      img = lyrics.image || "https://example.com/default-image.jpg";
    }

    const textoLetra = `*Title:* ${tituloL}\n*Artist:* ${artistaL}\n\n*Lyrics:*\n${lyrics.lyrics || "Lyrics not found."}`;

    await conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });

    const previewUrl = result[0]?.preview
      ? result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".deezer.com", ".dzcdn.net")
      : "";

    if (previewUrl) {
      await conn.sendMessage(
        m.chat,
        { audio: { url: previewUrl }, fileName: `${artistaL} - ${tituloL}.mp3`, mimetype: "audio/mp4" },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw "*Error while fetching lyrics or track data*";
  }
};

handler.help = ["lirik", "letra"].map((v) => v + " <song title>");
handler.tags = ["internet"];
handler.command = /^(li|lyrics|lyric|letra)$/i;

export default handler;

async function searchLyrics(term) {
  try {
    if (!term) throw "Please provide a valid song name to search the lyrics.";

    const formattedTerm = term.split(" ").join("+");

    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedTerm}`);
    const data = response.data;

    if (!data.lyrics) {
      return { status: false, message: `Couldn't find any lyrics for "${term}".` };
    }

    return {
      status: true,
      title: term.split(" - ")[1] || "",
      artist: term.split(" - ")[0] || "",
      lyrics: data.lyrics,
      image: "https://example.com/default-image.jpg"
    };
  } catch (error) {
    console.error("Error searching lyrics:", error);
    return { status: false, message: error.message || "An error occurred while searching for lyrics." };
  }
}