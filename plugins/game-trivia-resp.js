import similarity from 'similarity';
const threshold = 0.72;

const handler = (m) => m;

handler.before = async function (m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al acertijo enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷢ/i.test(m.quoted.text)) return;

  this.trivia = this.trivia ? this.trivia : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.trivia)) {
    // Enviar mensaje solo una vez si el juego ya terminó
    if (!m._replied) {
      m.reply('*Ese trivia ya ha terminado!*');
      m._replied = true; // Marcar que ya se ha enviado el mensaje de fin
    }
    return;
  }

  // Verificar si el mensaje citado corresponde al trivia actual
  if (m.quoted.id === this.trivia[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.trivia[id][1]));

    // Comprobar si la respuesta es correcta
    if (m.text.toLowerCase() === json.answer.toLowerCase().trim()) {
      m.reply(`*Respuesta correcta!*\n+${this.trivia[id][2]} exp`);
      clearTimeout(this.trivia[id][3]);
      delete this.trivia[id];
    }
    // Si la respuesta es similar (umbral de similitud)
    else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) {
      m.reply(`*Casi lo logras!*`);
    }
    // Si la respuesta es incorrecta
    else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true; // Asegúrate de que esto sea verdadero para continuar la ejecución
};

handler.exp = 0;
export default handler;