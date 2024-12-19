import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix}) {
  if (!args[0]) return m.reply(`*[ ℹ️ ] Ingresa tu numero de serie.*`)
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
  if (args[0] !== sn) return m.reply('*[ ℹ️ ] Número de serie incorrecto.*')
  user.registered = false
  m.reply(`*[ ℹ️ ] Registro eliminado.*`)
}
handler.help = ['unreg'] 
handler.tags = ['rpg']
handler.command = ['unreg'] 
handler.register = true

export default handler