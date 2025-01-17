import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://qu.ax/kgzBh.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*¡Hola!, te invito a unirte a los grupos oficiales de de Shadow Bot - MD para convivir con la comunidad ☕*

♡ ${group}

*─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ*

➳ *¿Enlace anulado? ¡Entre aquí!*

Canal Oficial:
ꨄ https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n

> 🌙 ${textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = /^(grupos)$/i
export default handler
