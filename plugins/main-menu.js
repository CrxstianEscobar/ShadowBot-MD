import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
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
> ⓘ ${ucapan()} ${taguser}
> Perú - Lima

*˚₊·˚₊· ͟͟͞͞➳❥  Sʜʌᴅᴏ͟ᴡ Ɓᴏᴛ ᭃ*
*╭╌┈╼◈ ╰ 1.4.0 ╯◈╾┈╌★*
*│*
*╰ ˚₊·˚₊· ͟͟͞͞➳❥  Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡*

*☕ Creador:* Cristian Escobar
*🪀 Numero:* +51927238856
*⏰ Tiempo:*
*🆙 Versión:* 1.0.0
*👸🏻 Colab:* @la_mari1343
${readMore}
ㅤ    乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

╭─·˚₊· ͟͟͞͞꒰ \`ᴍᴇɴᴜ́s\`
┊⪩ .menuaudios
┊⪩ .menunsfw
┊⪩ .menulogos
┊⪩ .menuff
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ɪɴғᴏ\`
┊⪩ .grupos
┊⪩ .owner
┊⪩ .ping
┊⪩ .comprarbot
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ \`sᴜʙ ʙᴏᴛ\`
┊⪩ .serbot --code
┊⪩ .serbot
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴀᴊᴜsᴛᴇs\`
┊⪩ .enable
┊⪩ .disable
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ғʀᴇᴇ ғɪʀᴇ\`
┊⪩ .v4fem
┊⪩ .v4masc
┊⪩ .v4mixto
┊⪩ .v6fem
┊⪩ .v6masc
┊⪩ .v6mixto
┊⪩ .feminterna4
┊⪩ .mascinterna4
┊⪩ .mixtointerna4
┊⪩ .feminterna6
┊⪩ .mascinterna6
┊⪩ .mixtointerna6
┊⪩ .donarsala
┊⪩ .bermuda
┊⪩ .kalahari
┊⪩ .purgatorio
┊⪩ .nexterra
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴅᴇsᴄᴀʀɢᴀs\`
┊⪩ .play *<txt>*
┊⪩ .aplay *<txt>*
┊⪩ .apk *<txt>*
┊⪩ .pinterest *<txt>*
┊⪩ .tiktok *<url>*
┊⪩ .tiktok2 *<url>*
┊⪩ .tiktokrandom
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ʙᴜsᴄᴀᴅᴏʀᴇs\`
┊⪩ .ytsearch *<txt>*
┊⪩ .ttsearch *<txt>*
┊⪩ .spsearch *<txt>*
┊⪩ .githubsearch *txt>*
┊⪩ .letra *<txt>*
┊⪩ .wikipedia *<txt>*
┊⪩ .mercadolibre *<txt>*
┊⪩ .playstore *<txt>*
┊⪩ .google *<url>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴄᴏɴᴠᴇʀᴛɪᴅᴏʀᴇs\`
┊⪩ .tourl *<img>*
┊⪩ .sticker *<img>*
┊⪩ .togifaud *<vid>*
┊⪩ .toimg *<sticker>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ɪᴀ - sʜᴀᴅᴏᴡ\`
┊⪩ _.ia *<txt>*_
┊⪩ _.demo *<txt>*_
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ \`ʜᴇʀʀᴀᴍɪᴇɴᴛᴀs\` 𑁭𑁘
┊⪩ .inspect *<link>*
┊⪩ .clima *<txt>*
┊⪩ .readmore *<txt>*
┊⪩ .hd *<img>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴇғᴇᴄᴛᴏs - ᴀᴜᴅ\`
┊ⓘ Responde a un Audio
┊⪩ .bass
┊⪩ .blown
┊⪩ .deep
┊⪩ .earrape
┊⪩ .fast
┊⪩ .smooth
┊⪩ .tupai
┊⪩ .nightcore
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ɢʀᴜᴘᴏs\`
┊⪩ .add *<numero>*
┊⪩ .grupo abrir / cerrar
┊⪩ .grouptime <*tiempo>*
┊⪩ .promote *<tag>*
┊⪩ .demote *<tag>*
┊⪩ .kick *<tag>*
┊⪩ .fantasmas *<opcion>*
┊⪩ .notify *<txt>*
┊⪩ .setwelcome *<txt>*
┊⪩ .todos *<txt>*
┊⪩ .linkgroup
┊⪩ .sorteo
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ɴsғᴡ\`
┊⪩ .
┊⪩ .
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴊᴜᴇɢᴏs\`
┊⪩ .pregunta *<txt>*
┊⪩ .simi *<txt>*
┊⪩ .acertijo
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`sᴛɪᴄᴋᴇʀs\`
┊⪩ .sticker *<img>*
┊⪩ .qc *<txt>*
┊⪩ .dado
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴀᴜᴅɪᴏs\`
┊⪩ .
┊⪩ .
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ᴇᴄᴏɴᴏᴍɪᴀ\`
┊⪩ .
┊⪩ .
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰ \`ʀᴇɢɪsᴛʀᴏ\`
┊⪩ .perfil
┊⪩ .sn
┊⪩ .reg
┊⪩ .unreg
╰──────────── ·`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardingScore: 999, externalAdReply: { title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nPʀᴏsᴘᴇʀᴏ Aɴ̃ᴏ Nᴜᴇᴠᴏ 💫', thumbnailUrl: perfil, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })

} catch (e) {
await m.reply(`*[ ℹ️ ] Ocurrió un error al enviar el menú.*\n\n${e}`)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = false
export default handler

function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "Linda Noche 🌙"
    if (time >= 5) {
        res = "Buena Madrugada 🌄"
    }
    if (time > 10) {
        res = "Buen Día ☀️"
    }
    if (time >= 12) {
        res = "Hermosa Tarde 🌅"
    }
    if (time >= 19) {
        res = "Linda Noche 🌙"
    }
    return res
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}