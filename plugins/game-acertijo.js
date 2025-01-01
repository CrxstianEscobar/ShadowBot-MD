import fs from 'fs';


const timeout = 60000;
const poin = 500;
const handler = async (m, {conn, usedPrefix}) => {

  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, 'Estas en juego', conn.tekateki[id][0]);
    throw false;
  }
  const tekateki = 'JAA';
  /*Para agregar más preguntas vaya a la carpeta de language en el archivo json de su 
  idioma preferido, busque "acertijo" justo después del texto4 puede agregar sus preguntas*/
  
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ *${json.question}*
'hola' ${(timeout / 1000).toFixed(2)} segundos
'xd' +${poin} Exp
`.trim();
  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `?? ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i;
export default handler;