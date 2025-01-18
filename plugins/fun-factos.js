let handler = async (m, { conn }) => {
  if (global.chiste && global.chiste.length > 0) {
    const chisteAleatorio = pickRandom(global.chiste); 
    conn.reply(m.chat, `*Chiste:* ${chisteAleatorio}`, m);
  } else {
    conn.reply(m.chat, "*[ ℹ️ ] No hay factos disponibles.*", m);
  }
};
handler.help = ['facto'];
handler.tags = ['fun'];
handler.command = ['facto']; 

// Función para seleccion aleatoria
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
