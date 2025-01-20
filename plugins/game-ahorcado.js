const palabras = [
  "gato", "perro", "pájaro", "elefante", "tigre", "ballena", "mariposa", "tortuga",
  "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino", "delfín",
  "serpiente", "hámster", "mosquito", "abeja", "economía", "electrónica", "facebook",
  "WhatsApp", "Instagram", "tiktok", "presidente", "bot", "películas", "astronauta", 
  "electricidad", "hipopótamo"
];

const intentosMaximos = 6;
const juegosActivos = new Map(); // Mapa para manejar los juegos activos

// Función para seleccionar una palabra aleatoria
function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

// Función para ocultar la palabra
function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra
    .split("")
    .map((letra) => (letrasAdivinadas.includes(letra) ? letra : "_"))
    .join(" ");
}

// Función para mostrar el dibujo del ahorcado
function mostrarAhorcado(intentos) {
  const dibujo = [
    " ____",
    " |  |",
    intentos < 6 ? " |  O" : " |",
    intentos < 5 ? " | /" + (intentos < 4 ? "\\" : "") : " |",
    intentos < 3 ? " | /" + (intentos < 2 ? " \\" : "") : " |",
    " |",
    "_|_"
  ];
  return dibujo.slice(0, 7 - intentos).join("\n");
}

// Función para verificar si el juego ha terminado
function verificarEstado(jugador, mensaje, palabra, letrasAdivinadas, intentos) {
  if (intentos === 0) {
    juegosActivos.delete(jugador);
    return `❌ ¡Perdiste! La palabra correcta era: *${palabra}*\n\n${mostrarAhorcado(intentos)}`;
  } else if (!mensaje.includes("_")) {
    juegosActivos.delete(jugador);
    return `🎉 ¡Felicidades! Adivinaste la palabra: *${palabra}*.\n\n${mostrarAhorcado(intentos)}`;
  } else {
    return `${mostrarAhorcado(intentos)}\n\nPalabra: ${mensaje}\nIntentos restantes: ${intentos}`;
  }
}

// Handler principal para iniciar el juego
let handler = async (m, { conn }) => {
  if (juegosActivos.has(m.sender)) {
    return conn.reply(m.chat, "⚠️ Ya tienes un juego en curso. Termina ese primero.", m);
  }

  const palabra = elegirPalabraAleatoria();
  const letrasAdivinadas = [];
  const intentos = intentosMaximos;
  const mensaje = ocultarPalabra(palabra, letrasAdivinadas);

  juegosActivos.set(m.sender, { palabra, letrasAdivinadas, intentos });

  const textoInicial = `🎮 *Juego del Ahorcado*\n\nAdivina la palabra:\n${mensaje}\n\nIntentos restantes: ${intentos}\n\nEnvía una letra para empezar.`;
  conn.reply(m.chat, textoInicial, m);
};

// Handler para manejar las jugadas
handler.before = async (m, { conn }) => {
  const juego = juegosActivos.get(m.sender);
  if (!juego) return;

  const { palabra, letrasAdivinadas, intentos } = juego;

  if (m.text.length === 1 && m.text.match(/[a-zA-Zñ]/i)) {
    const letra = m.text.toLowerCase();
    if (!letrasAdivinadas.includes(letra)) {
      letrasAdivinadas.push(letra);
      if (!palabra.includes(letra)) {
        juego.intentos--;
      }
    }

    const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    const resultado = verificarEstado(m.sender, mensaje, palabra, letrasAdivinadas, juego.intentos);

    if (resultado.includes("❌") || resultado.includes("🎉")) {
      conn.reply(m.chat, resultado, m);
    } else {
      juegosActivos.set(m.sender, juego);
      conn.reply(m.chat, resultado, m);
    }
  } else {
    conn.reply(m.chat, "⚠️ Por favor, envía solo una letra a la vez.", m);
  }
};

// Configuración del comando
handler.help = ["ahorcado"];
handler.tags = ["game"];
handler.command = ["ahorcado"];
handler.register = true;

export default handler;