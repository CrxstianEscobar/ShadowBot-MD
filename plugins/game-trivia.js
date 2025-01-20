import fs from 'fs';

const triviaFile = './plugins/_trivia.json';
const timeout = 60000;  // Tiempo límite para responder en milisegundos (60 segundos)
const poin = 500;  // Puntos por cada respuesta correcta

const handler = async (m, {conn, usedPrefix}) => {
  const id = m.chat;
  
  conn.trivia = conn.trivia ? conn.trivia : {};  // Si no existe el objeto, lo crea
  if (id in conn.trivia) {
    conn.reply(m.chat, '*[ ℹ️ ] Ya estás en un juego de trivia.*', conn.trivia[id][0]);
    throw false;
  }

  // Leer las preguntas de trivia
  const fileContent = fs.readFileSync(triviaFile, 'utf8');
  const triviaQuestions = JSON.parse(fileContent);

  // Elegir una pregunta al azar
  const questionObj = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];

  const questionText = `
ⷡ *Pregunta de Trivia:*
${questionObj.question}
Opciones:
${questionObj.options.join('\n')}
`;

  const caption = `
• *Tiempo restante:* ${(timeout / 1000).toFixed(2)} segundos
• *Puntos:* +${poin} Exp
`.trim();

  // Iniciar el juego de trivia
  conn.trivia[id] = [
    await conn.reply(m.chat, questionText + caption, m), 
    questionObj, 
    poin,
    setTimeout(async () => {
      if (conn.trivia[id]) {
        await conn.reply(m.chat, `Se acabó el tiempo! La respuesta correcta era: ${questionObj.answer}) ${questionObj.options.find(opt => opt.startsWith(questionObj.answer))}`, conn.trivia[id][0]);
        delete conn.trivia[id];  // Eliminar el juego cuando se acaba el tiempo
      }
    }, timeout)
  ];
};

handler.help = ['trivia'];
handler.tags = ['game'];
handler.command = /^(trivia|quiz)$/i;

export default handler;