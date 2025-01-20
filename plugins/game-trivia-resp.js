const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al trivia enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷢ/i.test(m.quoted.text)) return;

  this.trivia = this.trivia ? this.trivia : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.trivia)) {
    return m.reply('*Ese trivia ya ha terminado!*');
  }

  // Verificar si el mensaje citado corresponde al trivia actual
  if (m.quoted.id === this.trivia[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.trivia[id][1]));

    // Comparar la respuesta con las opciones usando la letra (A, B, C)
    const respuestaCorrecta = json.options[["A", "B", "C"].indexOf(m.text.toUpperCase())];

    // Comprobar si la respuesta seleccionada (A, B, o C) es correcta
    if (respuestaCorrecta && m.text.toUpperCase() === json.answer[0].toUpperCase()) {
      m.reply(`*Respuesta correcta!*\n+${this.trivia[id][2]} exp`);
      clearTimeout(this.trivia[id][3]);
      delete this.trivia[id];
    } else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true;
};

handler.exp = 0;
export default handler;