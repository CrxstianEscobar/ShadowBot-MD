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

const filePath = './plugins/_acertijo.json';
const fileContent = fs.readFileSync(filePath, 'utf8');
const tekateki = JSON.parse(fileContent);

  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');

  const caption = `
ⷮ *${json.question}* 
Tiempo restante: ${(timeout / 1000).toFixed(2)} segundos
Puntos: +${poin} Exp
`.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo! La respuesta era: ${json.response}`, conn.tekateki[id][0]);
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
const poin = 10;
const handler = async (m, {conn, usedPrefix}) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, '✐ Todavía hay acertijos sin responder en este chat', conn.tekateki[id][0]);
    throw false;
  }
  const tekateki = JSON.parse(fs.readFileSync(`./plugins/acertijo.json`));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ✐ *ACERTIJOS*
🜸 *${json.question}*

✿ *Tiempo:* 60 Segundos
✿ *Premio:* +500 money`.trim();
  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `✐ Se acabó el tiempo!\n🜸 *Respuesta:* ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['fun'];
handler.command = ['acertijo', 'acert', 'adivinanza', 'tekateki'];
export default handler;