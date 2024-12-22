
let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)

  let mensajes = [
    `*${toM(a)} Vaya preparando esa sala... ☃️*\n> By Shadow Bot MD`,
    `*${toM(a)} No te me escondas que vas a donar la sala 😏*\n> By Shadow Bot MD`,
    `*${toM(a)} ¡La sala mijo yaya! 🗣️*\n> By Shadow Bot MD`,
    `*${toM(a)} ¡Le tocó donar sala al insano! 💪*\n> By Shadow Bot MD`
]

  let mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)]

  m.reply(mensajeAleatorio, null, { mentions: [a, b] })
}

handler.help = ['donarsala']
handler.tags = ['ff']
handler.command = ['donarsala', 'sala']
handler.group = true
export default handler