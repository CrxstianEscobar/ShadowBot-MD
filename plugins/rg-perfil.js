import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
m.reply(`*[ ℹ️ ] Numero Serial:*\n\n▢ ${sn}`.trim())
}
handler.help = ['perfil']
handler.tags = ['rg']
handler.command = ['perfil', 'profile'] 
handler.register = true

export default handler