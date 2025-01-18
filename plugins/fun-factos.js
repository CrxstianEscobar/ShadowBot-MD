let handler = async (m, { conn }) => {
  if (global.factos && global.factos.length > 0) {
    const factoAleatorio = pickRandom(global.factos); 
    conn.reply(m.chat, `*Facts:* ${factoAleatorio}`, m);
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

global.factos = [
    "Eres la razón por la que hay instrucciones en los champús.",
    "Si fueras un libro, serías el que nadie quiere leer.",
    "Tu vida es como un programa de televisión que nadie ve.",
    "Eres como un error tipográfico: solo estás ahí para arruinarlo todo.",
    "Si fueras un producto, serías el que está en oferta porque no se vende.",
    "Eres un recordatorio de lo que no se debe hacer en la vida.",
    "Tu existencia es tan relevante como un archivo en la papelera de reciclaje.",
    "Si fueras un plato, serías uno que nadie quiere probar.",
    "Eres la razón por la que los hombres tienen miedo de comprometerse.",
    "Tu personalidad es como un antivirus: nadie lo quiere instalar.",
    "Eres la prueba de que la selección natural puede fallar.",
    "Si fueras un color, serías el gris: aburrido y sin vida.",
    "Tu vida es como una mala película: nadie quiere ver el final.",
    "Eres como un mal chiste: siempre haces que la gente se sienta incómoda.",
    "Si fueras un animal, serías la mascota que nadie quiere adoptar.",
    "Tu sentido del humor es como un mal Wi-Fi: no tiene conexión.",
    "Eres como una planta marchita: solo ocupas espacio.",
    "Si fueras un virus informático, serías uno que causa más problemas que soluciones.",
    "Tu imagen es la razón por la que los espejos están cubiertos.",
    "Eres el ejemplo perfecto de cómo no vivir la vida.",
    "Si fueras un día de la semana, serías un lunes: todos te odian.",
    "Eres la razón por la que las personas no creen en el amor verdadero.",
    "Tu vida es un meme, pero nadie se ríe.",
    "Si fueras una aplicación, serías una que nadie quiere descargar.",
    "Eres como una sombra: siempre estás ahí, pero no eres bienvenido.",
    "Tu cerebro es como un disco duro lleno: no puede almacenar más.",
    "Eres como un tren descarrilado: solo causan caos.",
    "Si fueras un clima, serías una tormenta: oscuro y destructivo.",
    "Eres como una cadena de mensajes: nadie te quiere, pero todos te reciben.",
    "Tu vida es como un rompecabezas con piezas que nunca encajan.",
    "Si fueras una película, serías una secuela que nadie pidió."
];

export default handler;
