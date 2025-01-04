
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text || m.quoted?.text || '';
  if (!teks) return conn.reply(m.chat, '*[ x ] Error: Ingresa el título de la canción.*', m);

  try {
    const response = await axios.get(`https://deliriussapi-oficial.vercel.app/search/genius?q=`);
    const data = response.data;
    if (!data.length) return conn.reply(m.chat, '*[ x ] Error: No se encontró la letra de la canción.*', m);

    const lyricsUrl = data[0].url;
    const lyricsResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`);
    const lyrics = lyricsResponse.data.lyrics;

    const textoLetra = `*${data[0].title}*\n*${data[0].artist.name}*\n\n${lyrics}`;
    await conn.reply(m.chat, textoLetra, m);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    throw `*Error 😿🍨*`;
  }
};

handler.help = ["let"].map((v) => v + " <título de la canción>");
handler.tags = ["as"];
handler.command = /^(let)$/i;

export default handler;
