
let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)

  let mensajes = [
    `*${toM(a)} Vaya preparando esa sala maldita gonorrea. 🙄*`,
    `*${toM(a)} No te me escondas que esta vez vas a donar la sala 😏*`,
    `*${toM(a)} ¡La sala mijo yaya! 🗣️*`,
    `*${toM(a)} La sala cabrón, ¡Ya va a empezar! 👺*`,
    `*${toM(a)} Donde estás pendejo, ¡Esta vez te toca poner sala a vos! 🫡*`,
    `*${toM(a)} Pepara esa sala oe gil fast 🗣️*`,
    `*${toM(a)} ¡Sal del closet, la sala no se pone sola! 😹*`,
    `*${toM(a)} ¡Deja de dormir! Crea la sala gay 💤*`,
    `*${toM(a)} ¡Le tocó poner sala a este pobre diablo! 😹*`,
    `*${toM(a)} ¡Le tocó poner sala al más malo del grupo 🥱😂*`,
    `*${toM(a)} Le tocó poner sala a esta preciosa, uff mi amor 😍*`,
    `*${toM(a)} Le tocó poner sala a la más puta del grupo, por cierto cuánto cobras? 😏*`,
    `*${toM(a)} No tan rápido mijo, Esta vez tu pones la sala o te meto la vrg, elegí. 👿*`,
    `*${toM(a)} ¡Le tocó poner sala al insano! 💪*`
]

  let mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)]

  m.reply(mensajeAleatorio, null, { mentions: [a, b] })
}

handler.help = ['donarsala']
handler.tags = ['ff']
handler.command = ['donarsala', 'sala']
handler.group = true
export default handler