/*import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import got from "got";
import cheerio from "cheerio";
import fs from "fs";
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : "";
  if (!teks) throw `*${tradutor.texto1} ${usedPrefix + command} beret ojala*`;

const teks = text || m.quoted?.text || '';
if (!teks) return conn.reply(m.chat, '*[ ⚠️ ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

  try {
    const result = await getTracks(teks);
    let lyrics;
    if (result) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(`${teks}`);
    }
    const tituloL = result[0].title ? result[0].title : lyrics.title;
    const artistaL = result[0].artist ? result[0].artist : lyrics.artist;
    const res = await fetch(
      global.API("https://some-random-api.com", "/lyrics", {
        title: artistaL + tituloL,
      }),
    );
    const json = await res.json();
    let img;
    try {
      img = result.album.artwork;
    } catch {
      try {
        img = json.thumbnail.genius;
      } catch {
        try {
          const bochil = await googleImage(`${artistaL} ${tituloL}`);
          img = await bochil.getRandom();
        } catch {
          img = lyrics.image;
        }
      }
    }

    const previewUrl = result[0]?.preview
      .replace("http://cdn-preview-", "https://cdns-preview-")
      .replace(".deezer.com", ".dzcdn.net");

    const textoLetra = `sotil *${tituloL || ""}*\ndoyil  *${artistaL || ""}*\n\nlytuv \n${lyrics.lyrics || "Lyrics not found."}`;

const textoLetra = `No`;
    await conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: textoLetra },
      { quoted: m },
    );
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: previewUrl },
        fileName: `${artistaL || "-"} - ${tituloL || "-"}.mp3`,
        mimetype: "audio/mp4",
      },
      { quoted: m },
    );
  } catch (e) {
    console.log(`Error: ${e.message}`);
    throw `*Error 😿🍨*`;
  }
};
handler.help = ["lirik", "letra"].map((v) => v + " <Apa>");
handler.tags = ["internet"];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;
export default handler;

// Creditos: https://github.com/darlyn1234 
async function searchLyrics(term) {
  try {
    if (!term) return "🟥 Provide the name of the song to search the lyrics";
    const geniusResponse = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/genius?q=${term}`,
    );
    const geniusData = geniusResponse.data;
    if (!geniusData.length) return `🟨 Couldn't find any lyrics for "${term}"`;
    const lyricsUrl = geniusData[0].url;
    const lyricsResponse = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/lyrics?url=${lyricsUrl}&parse=false`,
    );
    const result = {
      status: true,
      creador: "Sareth",
      title: geniusData[0].title || "",
      fullTitle: geniusData[0].fullTitle || "",
      artist: geniusData[0].artist.name || "",
      artistUrl: geniusData[0].artist.url || "",
      id: geniusData[0].id || "",
      enpoint: geniusData[0].endpoint || "",
      instrumental: geniusData[0].instrumental,
      image: geniusData[0].image || "",
      url: geniusData[0].url || "",
      lyrics: lyricsResponse.data.lyrics || "",
    };
    return result;
  } catch (error) {
    console.error(error.message);
    return {
      creador: "Sareth",
      status: false,
      message: new Error(error).message,
    };
  }
}*/

import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import got from "got";
import cheerio from "cheerio";
import fs from "fs";
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const teks = text || m.quoted?.text || '';
    if (!teks) return conn.reply(m.chat, '*[ 😿 ] Error: Ingresa el título de la canción o el link del video de la canción.*', m);

    const result = await getTracks(teks);
    let lyrics;
    if (result) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(`${teks}`);
    }

    if (!lyrics || !lyrics.lyrics) {
      return conn.reply(m.chat, '*[ ⚠️ ] Error: No se encontraron letras para la canción.*', m);
    }

    const tituloL = lyrics.title;
    const artistaL = lyrics.artist;
    const previewUrl = result[0]?.preview.replace("http://cdn-preview-", "https://cdns-preview-").replace(".(link unavailable)", ".(link unavailable)");

    await conn.sendMessage(m.chat, { text: `Letra de ${tituloL} de ${artistaL}\n\n${lyrics.lyrics}` }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: previewUrl }, fileName: `${artistaL || "-"} - ${tituloL || "-"}.mp3`, mimetype: "audio/mp4" }, { quoted: m });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '*[ 😿 ] Error: Ocurrió un error al intentar obtener las letras de la canción.*', m);
  }
};

handler.help = ["lirik", "letra"].map((v) => v + " <Apa>");
handler.tags = ["internet"];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;

export default handler;

async function searchLyrics(term) {
  try {
    if (!term) return " Provide the name of the song to search the lyrics";
    const geniusResponse = await axios.get(`(link unavailable));
    const geniusData = geniusResponse.data;
    if (!geniusData.length) return ` Couldn't find any lyrics for "${term}"`;
    const lyricsUrl = geniusData[0].url;
    const lyricsResponse = await axios.get(`(link unavailable));
    const result = {
      status: true,
      creador: "Sareth",
      title: geniusData[0].title || "",
      fullTitle: geniusData[0].fullTitle || "",
      artist: geniusData[0].artist.name || "",
      artistUrl: geniusData[0].artist.url || "",
      id: geniusData[0].id || "",
      enpoint: geniusData[0].endpoint || "",
      instrumental: geniusData[0].instrumental,
      image: geniusData[0].image || "",
      url: geniusData[0].url || "",
      lyrics: lyricsResponse.data.lyrics || "",
    };
    return result;
  } catch (error) {
    console.error(error);
    return {
      creador: "Sareth",
      status: false,
      message: new Error(error).message,
    };
  }
}