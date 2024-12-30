/* Codigo hecho por @Fabri115 y mejorado por ianalejandro */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '*[ ℹ️ ] Utiliza este comando directamente en el número principal del Bot*', m, rcanal, )
}
await conn.reply(m.chat, '*[ ℹ️ ] Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*', m, rcanal, )
m.react('❄️')

let sessionPath = './ShadowSession/'

try {

if (!existsSync(sessionPath)) {
return await conn.reply(m.chat, '*[ ℹ️ ] La carpeta está vacía*', m, rcanal, )
}
let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, '*[ ℹ️ ] La carpeta esta vacía*',  m, rcanal, )
} else {
m.react('🍭')
await conn.reply(m.chat, `*[ ℹ️ ] Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json*`,  m, rcanal, )
conn.reply(m.chat, `*[ ℹ️ ] ¡Hola! ¿logras verme?*`, m, rcanal, )

}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.reply(m.chat, '*[ ℹ️ ] Ocurrió un fallo*',  m, rcanal, )
}

}
handler.help = ['dsowner']
handler.tags = ['fix', 'owner']
handler.command = /^(delzero|dsowner|clearallsession|clearsession)$/i

handler.rowner = true

export default handler