/*import fs from 'fs';

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

export default handler;*/

const handlerResponse = (m) => m;

handlerResponse.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al juego de ordenar palabras
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷡ/i.test(m.quoted.text)) return;

  this.sortword = this.sortword ? this.sortword : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.sortword)) {
    return; // No hacer nada si el juego ya terminó
  }

  // Verificar si el mensaje citado corresponde al juego actual
  if (m.quoted.id === this.sortword[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.sortword[id][1]));

    // Comprobar si la respuesta es correcta
    if (m.text.toLowerCase().trim() === json.word.toLowerCase().trim()) {
      m.reply(`*Respuesta correcta!*\n+${this.sortword[id][2]} exp`);
      clearTimeout(this.sortword[id][3]);
      delete this.sortword[id];
    } 
    // Si la respuesta es incorrecta
    else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true; // Asegúrate de que esto sea verdadero para continuar la ejecución
};

handlerResponse.exp = 0;
export default handlerResponse;