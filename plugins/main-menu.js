import fs from 'fs'
import fetch from 'node-fetch'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
await m.react('☃️')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://telegra.ph/file/32e696946433c03588726.mp4', 'https://telegra.ph/file/5293a73eb90a920f8948b.mp4', 'https://telegra.ph/file/d5ed2537cb22b628d8ef1.mp4']

let menu = `
╭─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏʀᴍᴀᴄɪᴏɴ\` 𑁭𑁘
┊⪩ _.grupos_
┊⪩ _.owner_
┊⪩ _.comprarbot_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`sᴜʙ ʙᴏᴛ\` 𑁭𑁘
┊⪩ _.serbot --code_
┊⪩ _.serbot_
╰────────────────── –
${readMore}
╭─·˚₊· ͟͟͞͞꒰➳ \`ᴀᴊᴜsᴛᴇs\` 𑁭𑁘
┊⪩ _.enable_
┊⪩ _.disable_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴅᴇsᴄᴀʀɢᴀs\` 𑁭𑁘
┊⪩ _.play *<txt>*_
┊⪩ _.tiktok *<url>*_
┊⪩ _.tiktok2 *<url>*_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ʙᴜsᴄᴀᴅᴏʀᴇs\` 𑁭𑁘
┊⪩ _.ytsearch *<txt>*_
┊⪩ _.ttsearch *<txt>*_
┊⪩ _.spsearch *<url>*_
┊⪩ _.google *<url>*_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴄᴏɴᴠᴇʀᴛɪᴅᴏʀᴇs\` 𑁭𑁘
┊⪩ _.sticker *<img>*_
┊⪩ _.qc *<txt>*_
╰────────────────── –
${readMore}
╭─·˚₊· ͟͟͞͞꒰➳ \`ɪᴀ - sʜᴀᴅᴏᴡ\` 𑁭𑁘
┊⪩ _.ia *<txt>*_
┊⪩ _.demo *<txt>*_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ʜᴇʀʀᴀᴍɪᴇɴᴛᴀs\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ɢʀᴜᴘᴏs\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴄᴏɴᴛᴇɴɪᴅᴏ ɴsғᴡ\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴊᴜᴇɢᴏs\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –
${readMore}
╭─·˚₊· ͟͟͞͞꒰➳ \`sᴛɪᴄᴋᴇʀs\` 𑁭𑁘
┊⪩ _.sticker *<img>*_
┊⪩ _.qc *<txt>*_
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴀᴜᴅɪᴏs\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –

╭─·˚₊· ͟͟͞͞꒰➳ \`ᴇᴄᴏɴᴏᴍɪᴀ\` 𑁭𑁘
┊⪩ .
┊⪩ .
╰────────────────── –`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardingScore: 999, externalAdReply: { title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nWʜᴀsᴛᴀᴘᴘ ʙᴏᴛ ᴍᴅ', thumbnailUrl: perfil, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = false
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}