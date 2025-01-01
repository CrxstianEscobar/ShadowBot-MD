import similarity from 'similarity';

const handler = async (m) => {
  const id = m.chat;
  const text = m.text.toLowerCase();

  // Verificar si el mensaje es una respuesta a un juego
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys) return;

  // Verificar si el juego está activo
  if (!(id in global.tekateki)) return m.reply('No estas en juego');

  // Verificar si la respuesta es correcta
  const json = global.tekateki[id][1];
  const response = json.response.toLowerCase().trim();
  if (text === response) {
    m.reply('Respuesta correcta');
  } else if (similarity(text, response) >= 0.72) {
    m.reply('Casi Correcto, Intenta de Nuevo');
  } else {
    m.reply('Incorrecto');
  }
};

export default handler;

/*
import similarity from 'similarity';


const threshold = 0.72;
const handler = (m) => m;
handler.before = async function(m) {


  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('No estas en juego');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
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
export default handler;
*/