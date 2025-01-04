import { getTracks } from "@green-code/music-track-data";
import { googleImage } from "@bochilteam/scraper";
import got from "got";
import axios from 'axios'; // Agregado para usar axios
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : "";
  if (!teks) throw "🟥 *Please provide a song title or reply to a message with the song title*";

  try {
    const result = await getTracks(teks);
    let lyrics;
    
    if (result && result[0]) {
      lyrics = await searchLyrics(`${result[0]?.artist} ${result[0]?.title}`);
    } else {
      lyrics = await searchLyrics(`${teks}`);
    }

    // Definir título y artista
    const tituloL = result[0]?.title || lyrics.title;
    const artistaL = result[0]?.artist || lyrics.artist;

    // Obtener datos de la API externa para la letra
    const res = await got("https://some-random-api.com/lyrics", {
      searchParams: { title: `${artistaL} ${tituloL}` }
    }).json();

    let img;

    try {
      img = result[0]?.album?.artwork;
    } catch {
      try {
        img = res.thumbnail?.genius; // Imagen desde la API externa
      } catch {
        try {
          const bo