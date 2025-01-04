/*import similarity from 'similarity';
const threshold = 0.72;
const handler = (m) => m;
handler.before = async function(m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('✐ Ese acertijo ya ha terminado!');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].coin += this.tekateki[id][2];
      m.reply(`✐ *Respuesta correcta!*\n❀ +${this.tekateki[id][2]} money`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`✐ Casi lo logras!`);
    else m.reply('✐ Respuesta incorrecta!');
  }
  return !0;
};
handler.exp = 0;
export default handler;*/

import similarity from 'similarity';
const threshold = 0.72;

// Usaremos un objeto en memoria para almacenar los puntos de los usuarios
let userPoints = {};  // { userId: puntos }

const handler = (m) => m;

handler.before = async function (m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('✐ Ese acertijo ya ha terminado!');
  
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
    
    // Comprobamos si la respuesta del usuario es correcta
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      
      // Si el usuario no tiene puntos aún, inicializamos a 0
      if (!userPoints[m.sender]) userPoints[m.sender] = 0;
      
      // Sumamos los puntos al usuario
      userPoints[m.sender] += this.tekateki[id][2];
      
      m.reply(`✐ *Respuesta correcta!*\n❀ +${this.tekateki[id][2]} puntos. Total: ${userPoints[m.sender]} puntos`);
      
      // Limpiamos el juego
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`✐ Casi lo logras!`);
    } else {
      m.reply('✐ Respuesta incorrecta!');
    }
  }
  return !0;
};

handler.exp = 0;
export default handler;