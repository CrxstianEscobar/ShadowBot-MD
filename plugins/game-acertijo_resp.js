import similarity from 'similarity';
//import { conn } from './game-acertijo.js';

const threshold = 0.72;
const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;
  const conn = m.conn;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^/i.test(m.quoted.text)) return !0;
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  if (!(id in conn.tekateki)) return m.reply('No estas en juego');
  if (m.quoted.id == conn.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(conn.tekateki[id][1]));
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += conn.tekateki[id][2];
      m.reply(`Respuesta correcta\n+${conn.tekateki[id][2]} Exp`);
      clearTimeout(conn.tekateki[id][3]);
      delete conn.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply('Casi Correcto, Intenta de Nuevo');
    else m.reply('Incorrecto');
  }
  return !0;
};
export default handler;
