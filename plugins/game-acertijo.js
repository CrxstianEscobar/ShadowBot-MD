import fs from 'fs';


const timeout = 60000;
const poin = 500;
const handler = async (m, {conn, usedPrefix}) => {

  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, '*[ ℹ️ ] Estas En Juego*' , conn.tekateki[id][0]);
    throw false;
  }
  /*const tekateki = tradutor.texto4;
  Para agregar más preguntas vaya a la carpeta de language en el archivo json de su 
  idioma preferido, busque "acertijo" justo después del texto4 puede agregar sus preguntas*/

const filePath = './plugins/_acertijo.json';
const fileContent = fs.readFileSync(filePath, 'utf8');
const tekateki = JSON.parse(fileContent);
  
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ *${json.question}*
${tradutor.texto2[0]} ${(timeout / 1000).toFixed(2)} segundos
${tradutor.texto2[1]} +${poin} Exp
`.trim();
  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `${tradutor.texto3} ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i;
export default handler;


/*
import fs from 'fs';

const timeout = 60000;
const poin = 500;

const handler = async (m, { conn, usedPrefix }) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, 'Estas en juego', conn.tekateki[id][0]);
    throw false;
  }

  const tekateki = [
    {
      question: '¿Cuál es el animal más rápido del mundo?',
      response: 'León'
    },
    {
      question: '¿Cuál es el planeta más grande del sistema solar?',
      response: 'Júpiter'
    },
    // Agrega más preguntas aquí
  ];

  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = ` ⷮ *${json.question}* Tiempo restante: ${(timeout / 1000).toFixed(2)} segundos. Puntos por respuesta correcta: +${poin} Exp `.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo! La respuesta era: ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)
  ];
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i;

export default handler;
*/