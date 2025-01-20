import similarity from 'similarity';
const threshold = 0.72;  // Umbral de similitud para respuestas similares

const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al trivia enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷡ/i.test(m.quoted.text)) return;

  this.trivia = this.trivia ? this.trivia : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.trivia)) {
    return m.reply('*Ese juego de trivia ya ha terminado o no existe.*');
  }

  // Verificar si el mensaje citado corresponde al trivia actual
  if (m.quoted.id === this.trivia[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.trivia[id][1]));

    // Comprobar si la respuesta es correcta (letra A, B o C)
    const playerAnswer = m.text.toLowerCase().trim();
    if (playerAnswer === json.answer) {
      m.reply(`*Respuesta correcta!*\n+${this.trivia[id][2]} exp`);
      clearTimeout(this.trivia[id][3]);  // Detener el temporizador
      delete this.trivia[id];  // Eliminar el juego
    } 
    // Si la respuesta es similar (umbral de similitud)
    else if (similarity(playerAnswer, json.answer) >= threshold) {
      m.reply(`*Casi lo logras!*`);
    } 
    // Si la respuesta es incorrecta
    else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true;
};

handler.exp = 0;
export default handler;