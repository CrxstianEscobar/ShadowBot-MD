const handlerResponse = (m) => m;

handlerResponse.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al juego de ordenar palabras
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷡ/i.test(m.quoted.text)) return;

  this.sortword = this.sortword ? this.sortword : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.sortword)) {
    return m.reply('*Ese juego ya ha terminado!*');
  }

  // Verificar si el mensaje citado corresponde al juego actual
  if (m.quoted.id === this.sortword[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.sortword[id][1]));

    // Comprobar si la respuesta es correcta
    if (m.text.toLowerCase().trim() === json.word.toLowerCase().trim()) {
      m.reply(`*Respuesta correcta!*\n+${this.sortword[id][2]} exp`);
      clearTimeout(this.sortword[id][3]);
      delete this.sortword[id];
    } 
    // Si la respuesta es incorrecta
    else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true; // Asegúrate de que esto sea verdadero para continuar la ejecución
};

handlerResponse.exp = 0;
export default handlerResponse;