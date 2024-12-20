import { createHash } from 'crypto'

let handler = async (m, { conn, usedPrefix, command }) => {

m.reply(`XXX 🤕`.trim())

handler.help = ['perfil']
handler.tags = ['rg']
handler.command = ['perfil', 'profile'] 
handler.register = true

export default handler