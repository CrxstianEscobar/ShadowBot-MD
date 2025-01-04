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

const handler = async (m) => {
  const id = m.chat;

  // Verificar que el mensaje sea una respuesta a un acertijo
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) {
    return !0;  // Si no es un mensaje de acertijo, no hace nada
  }

  this.tekateki = this.tekateki ? this.tekateki : {};

  // Verificar si hay un acertijo en juego
  if (!(id in this.tekateki)) {
    return m.reply('✐ Ese acertijo ya ha terminado!');
  }

  // Verificar si el mensaje citado corresponde al acertijo actual
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));  // Obtener el acertijo y respuesta

    // Comparar la respuesta del jugador con la correcta
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      m.reply(`✐ *Respuesta correcta!* 🎉`);  // Respuesta correcta
      clearTimeout(this.tekateki[id][3]);  // Eliminar el temporizador del acertijo
      delete this.tekateki[id];  // Eliminar el acertijo de la memoria
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`✐ Casi lo logras! ❀`);  // Respuesta similar pero incorrecta
    } else {
      m.reply('✐ Respuesta incorrecta! ❌');  // Respuesta incorrecta
    }
  }

  return !0;  // Continuar ejecución si todo está bien
};

handler.exp = 0;  // No usar puntos ni base de datos
export default handler;