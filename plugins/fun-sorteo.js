let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)

  let mensajes = [
    `*${toM(a)} ¡Felicidades! Eres el ganador del sorteo.*\n*¡Disfruta de tu premio 🥳!*`,
    `*${toM(a)} `,
    `*${toM(a)} `,
    `*${toM(a)} `,
    `*${toM(a)} `,
    `*${toM(a)} `,
    `*${toM(a)} `
]

  let mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)]

  m.reply(mensajeAleatorio, null, { mentions: [a, b] })
}

handler.help = ['donarsala']
handler.tags = ['ff']
handler.command = ['donarsala', 'sala']
handler.group = true
export default handler