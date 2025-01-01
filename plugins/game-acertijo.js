import fs from 'fs';
import similarity from 'similarity';

const timeout = 60000;
const poin = 500;
const threshold = 0.72;

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

handler.before = async function(m) {
  

  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('No estas en juego');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = this.tekateki[id][1];
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tekateki[id][2];
      m.reply(`Respuesta correcta\n+${this.tekateki[id][2]} Exp`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply('Casi Correcto, Intenta de Nuevo');
    else m.reply('Incorrecto');
  }
  return !0;
};


handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i;
export default handler;

/*
handler.before = async function(m) {
  

  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('No estas en juego');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = this.tekateki[id][1];
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tekateki[id][2];
      m.reply(`Respuesta correcta\n+ Exp`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply('Casi Correcto, Intenta de Nuevo');
    else m.reply('Incorrecto');
  }
  return !0;
};
*/