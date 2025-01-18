//By CrxstianEscobar 

let handler = async (m, { conn }) => {
  if (global.chiste && global.chiste.length > 0) {
    const chisteAleatorio = pickRandom(global.chiste);
    conn.reply(m.chat, `*Chiste:* ${chisteAleatorio}`, m);
  } else {
    conn.reply(m.chat, "*[ ℹ️ ] No hay chistes disponibles.*", m);
  }
};

handler.help = ['chiste'];
handler.tags = ['fun'];
handler.command = ['chiste'];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin..",
  "¿Cómo se dice pañuelo en japonés? Saka-moko",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala..",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar en el tejado de una casa. Otro gato, sorprendido, le dice: Estás loco gato, ¿por qué ladras en vez de maullar? El gatito le responde: ¿A caso no puedo aprender otro idioma?",
  "El doctor le dice al paciente: respire profundo que lo voy a auscultar. El paciente le responde: doctor, ¿de quién me va a ocultar si no le debo a nadie?",
  "Sale el doctor después de un parto y el padre de la criatura le pregunta: ¿Doctor cómo salió todo? El doctor le dice: todo salió bien, pero tuvimos que colocarle oxígeno al bebé. El padre, horrorizado, le dice: pero doctor, nosotros queríamos ponerle Gabriel..",
  "Un pez le pregunta a otro pez: ¿qué hace tu mamá? Este le contesta: Nada, ¿y la tuya qué hace? Nada también.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio",
  "El profesor le dice al estudiante después de haberle corregido la tarea: Tu trabajo me ha conmovido. El estudiante, sorprendido, le pregunta: ¿Y eso por qué profesor? El profesor con cara de burla le dice: Porque me dio mucha pena."
];

export default handler;