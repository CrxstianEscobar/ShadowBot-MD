// CREATED BY CRISTIAN ESCOBAR

import fs from 'fs';

const timeout = 60000;
const poin = 500;

const handler = async (m, { conn, usedPrefix }) => {
  conn.sortword = conn.sortword ? conn.sortword : {};
  const id = m.chat;

  if (id in conn.sortword) {
    conn.reply(m.chat, '*[ 🌷 ] Ya estás jugando a ordenar palabras en este chat.*', conn.sortword[id][0]);
    throw false;
  }

  const filePath = './src/game/sortword.json';
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const words = JSON.parse(fileContent);

  const json = words[Math.floor(Math.random() * words.length)];

  const wordToShuffle = json.word;
  const shuffledWord = wordToShuffle.split('').sort(() => Math.random() - 0.5).join('');

  const caption = `
ⷡ *ORDENA LA PALABRA:*
\`${shuffledWord}\`

> *Tiempo restante:* ${(timeout / 1000).toFixed(2)} segundos
> *Puntos:* +${poin} Exp
`.trim();

  conn.sortword[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.sortword[id]) await conn.reply(m.chat, `Se acabó el tiempo! La palabra correcta era: *${json.word}*`, conn.sortword[id][0]);
      delete conn.sortword[id];
    }, timeout)
  ];
};

handler.help = ['sortword'];
handler.tags = ['game'];
handler.command = /^(sortword|ordenarpalabra)$/i;

export default handler;
