import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg')

    conn.sendFile(m.chat, pp, 'perfil', '', m, { mentions: [who] })

m.reply(`*『 PERFIL DEL USUARIO 』*

*👤Nombre:*
*🌹Edad:*
*🌎Pais:*
*☁Descripción:*`.trim())
}
handler.help = ['perfil']
handler.tags = ['rg']
handler.command = ['perfil', 'profile'] 
handler.register = true

export default handler