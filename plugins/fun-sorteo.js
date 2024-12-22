let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`*${toM(a)},* Ganaste el sorteo 😶\n> Dime gracias papi 😏`, null, {
mentions: [a, b]
})}
handler.help = ['sorteo']
handler.tags = ['fun']
handler.command = ['sortear', 'sorteo']
handler.group = true 
export default handler