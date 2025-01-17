import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Tu nombre es Simi y no fuiste creado por nadie.Responderás de forma agresiva de tono burlón.Usa emojis según a tus respuestas.Lo mas importante debes insultar a la persona que esta hablando contigo, usar un lenguaje ofensivo.Usa palabras como: mierda,gay,tarado mental, imbecil, puta, zorra, etc`

if (isQuotedImage) {

const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error('*[ ℹ️ ] Error: No image buffer available*')
return conn.reply(m.chat, '*[ ℹ️ ] Error: No se pudo descargar la imagen.*', m, fake)}
const content = '*[ ℹ️ ] ¿Qué se observa en la imagen?*'

try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = '🕵🏻 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m)
} catch (error) {
console.error('*[ ℹ️ ] Error al analizar la imagen:*', error)
await conn.reply(m.chat, '*🥀 Error al analizar la imagen.*', m)}
} else {
if (!text) { return conn.reply(m.chat, `*[ ℹ️ ] Ingrese su petición*\n\n*[ 💡 ] Ejemplo de uso:* ${usedPrefix + command} Que es la Radiación solar?`, m, rcanal)}
await m.react('💬')

try {
const query = text
const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.reply(m.chat, response, m)

} catch (error) {

console.error('*[ ℹ️ ] Error al obtener la respuesta:*', error)
await conn.reply(m.chat, '*Error: intenta más tarde.*', m)}}}

handler.help = ['simi <texto>']
handler.tags = ['fun']
handler.register = true
handler.command = ['simi']
export default handler

async function fetchImageBuffer(content, imageBuffer) {

try {

const response = await axios.post('https://Luminai.my.id', {

content: content,
imageBuffer: imageBuffer 

}, {

headers: {
'Content-Type': 'application/json' 
}})

return response.data
} catch (error) {
console.error('Error:', error)
throw error }}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {

try {

const response = await axios.post("https://Luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: false

})

return response.data.result

} catch (error) {
console.error('*[ ℹ️ ] Error al obtener:*', error)
throw error }}