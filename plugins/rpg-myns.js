import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
m.reply(`
▢ *${mssg.numSn}* : ${sn} ${error.message}; message);`.trim())
}
handler.help = ['mysn']
handler.tags = ['rpg']
handler.command = ['nserie', 'sn', 'mysn'] 
handler.register = true

export default handler