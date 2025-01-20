import fs from 'fs';

const timeout = 60000;
const poin = 500;
const handler = async (m, { conn, usedPrefix }) => {
  conn.trivia = conn.trivia ? conn.trivia : {};
  const id = m.chat;

  // Verifica si ya hay un trivia en curso para este chat
  if (id in conn.trivia) {
    conn.reply(m.chat, '*[ ℹ️ ] Estás en un juego de trivia*', conn.trivia[id][0]);
    throw false;
  }

  const filePath = './plugins/_trivia.json'; // Asegúrate de que el archivo de preguntas de trivia esté en este path
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const trivia = JSON.parse(fileContent);

  // Elige una pregunta aleatoria
  const json = trivia[Math.floor(Math.random() * trivia.length)];
  const questionText = `
ⷢ *Pregunta de Trivia:*
${json.question}
Opciones:
A) ${json.options[0]}
B) ${json.options[1]}
C) ${json.options[2]}
  `.trim();

  const caption = `
• *Tiempo restante:* ${(timeout / 1000).toFixed(2)} segundos
• *Puntos:* +${poin} Exp
  `.trim();

  // Guarda la trivia en curso
  conn.trivia[id] = [
    await conn.reply(m.chat, questionText, m), json,
    poin,
    setTimeout(async () => {
      if (conn.trivia[id]) await conn.reply(m.chat, `Se acabó el tiempo! La respuesta era: ${json.answer}`, conn.trivia[id][0]);
      delete conn.trivia[id];
    }, timeout)
  ];
};
handler.help = ['trivia'];
handler.tags = ['game'];
handler.command = /^(trivia|pregunta)$/i;
export default handler;