import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Ingrese una petición para que Gemini lo responda.*\n\n*[ 💡 ] Ejemplo:* .gemini que es es sistema solar.`, m, rcanal)
try {
await m.react(rwait)
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await m.reply(res.result)
} catch {
await m.react('❌')
await conn.reply(m.chat, `*[ ℹ️ ] Gemini no puede responder a esa pregunta.*`, m, rcanal)
}}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['gemini']

export default handler
