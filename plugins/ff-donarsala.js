
let toM = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => (link unavailable))
  let a = ps.getRandom()
  let b
  do b = ps.getRandom()
  while (b === a)

  let mensajes = [
    `*${toM(a)},* Oh beba vaya preparando esa sala... ☃️\n> By Shadow Bot MD`,
    `*${toM(a)},* ¡Prepárate para la batalla! 🎮\n> By Shadow Bot MD`,
    `*${toM(a)},* ¡Es hora de jugar! 🎲\n> By Shadow Bot MD`,
    `*${toM(a)},* ¡Vamos a ver quién es el mejor! 💪\n> By Shadow Bot MD`
]

  let mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)]

  m.reply(mensajeAleatorio, null, { mentions: [a, b] })
}

handler.help = ['donarsala']
handler.tags = ['ff']
handler.command = ['donarsala', 'sala']
handler.group = true
export default handler