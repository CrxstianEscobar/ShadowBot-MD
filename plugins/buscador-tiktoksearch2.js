import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `*[ ☕ ] Ingresa el texto de lo que quieres buscar*`, m)

try {
let api = await fetch(`https://api.agatz.xyz/api/tiktoksearch?message=${text}`)
let json = await api.json()
let { title, no_watermark, music } = json.data
await conn.sendFile(m.chat, no_watermark, 'HasumiBotFreeCodes.mp4', title, m)
await conn.sendFile(m.chat, music, 'HasumiBotFreeCodes.mp3', null, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(tiktoksearch2|ttsearch2)$/i

export default handler
