const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al trivia enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷢ/i.test(m.quoted.text)) return;

  this.trivia = this.trivia ? this.trivia : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.trivia)) {
    return m.reply('*Ese trivia ya ha terminado o no está activo!*');
  }

  // Verificar si el mensaje citado corresponde al trivia actual
  if (m.quoted.id === this.trivia[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.trivia[id][1]));

    // Definir las respuestas posibles de acuerdo a las letras
    const options = ["A", "B", "C"];
    const index = options.indexOf(m.text.toUpperCase());

    // Validar que la respuesta esté dentro de las opciones permitidas
    if (index === -1) {
      return m.reply('*Opción inválida. Por favor responde con A, B o C.*');
    }

    // Determinar cuál opción corresponde a la letra seleccionada
    const respuestaSeleccionada = json.options[index];

    // Comprobar si la respuesta seleccionada (A, B o C) es correcta
    if (respuestaSeleccionada && respuestaSeleccionada.toUpperCase() === json.answer.toUpperCase()) {
      m.reply(`✅ *Respuesta correcta!*\nHas ganado +${this.trivia[id][2]} Exp.`);
      clearTimeout(this.trivia[id][3]); // Cancelar el temporizador
      delete this.trivia[id]; // Eliminar la trivia actual
    } else {
      m.reply(`❌ *Respuesta incorrecta!*\nLa respuesta correcta era: *${json.answer}*`);
      clearTimeout(this.trivia[id][3]); // Cancelar el temporizador
      delete this.trivia[id]; // Eliminar la trivia actual
    }
  }

  return true;
};

handler.exp = 0;
export default handler;