import fs from 'fs';

const timeout = 60000;  // Tiempo límite de 60 segundos
const poin = 500;  // Puntos que ganará el usuario si responde correctamente

const handler = async (m, { conn, usedPrefix }) => {
  conn.sortword = conn.sortword ? conn.sortword : {};
  const id = m.chat;

  // Si ya hay un juego en curso en este chat
  if (id in conn.sortword) {
    conn.reply(m.chat, '*[ ℹ️ ] Ya estás jugando a ordenar palabras en este chat.*', conn.sortword[id][0]);
    throw false;
  }

  // Leer el archivo JSON con las palabras
  const filePath = './plugins/_palabras.json';  // Ruta al archivo JSON con las palabras
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const words = JSON.parse(fileContent);

  // Seleccionar una palabra aleatoria
  const json = words[Math.floor(Math.random() * words.length)];

  // Desordenar la palabra
  const wordToShuffle = json.word;
  const shuffledWord = wordToShuffle.split('').sort(() => Math.random() - 0.5).join('');

  // Enviar la palabra desordenada al usuario
  const caption = `
ⷡ *Ordena las palabras:*
• *Palabra desordenada:* *${shuffledWord}*
• *Tiempo restante:* ${(timeout / 1000).toFixed(2)} segundos
• *Puntos:* +${poin} Exp
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
handler.command = /^(sortword)$/i;  // Comando sortword

export default handler;
