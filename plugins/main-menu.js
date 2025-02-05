import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
await m.react('🍃')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

const fechaPeru = new Date().toLocaleString("es-PE", { timeZone: "America/Lima", day: '2-digit', month: '2-digit', year: 'numeric' });
console.log(fechaPeru);

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://files.catbox.moe/7ha109.mp4', 'https://files.catbox.moe/7ha109.mp4']

let menu = `
🌷 ¡Hᴏʟᴀ! ¿Cᴏ́ᴍᴏ Esᴛᴀs Hᴏʏ?
${taguser} Sᴏʏ Sʜᴀᴅᴏᴡ
${ucapan()}

*˚₊·˚₊· ͟͟͞͞➳❥  Sʜʌᴅᴏ͟ᴡ Ɓᴏᴛ ᭃ*
*╭╌┈╼◈ ╰ 1.4.0 ╯◈╾┈╌★*
*│*
*╰ ˚₊·˚₊· ͟͟͞͞➳❥  Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡*
 
*☕ Creador:* Cristian Escobar
*🪀 Numero:* +51927238856
*⏰ Tiempo:* 18:34:59
*📆 Fecha:* ${fechaPeru}
*🆙 Versión:* 1.0.0
*👸🏻 Colab:* @la_mari1343

ㅤ ㅤ   乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴍᴇɴᴜ ʟɪsᴛ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .menuaudios
┊⪩ .menunsfw
┊⪩ .menulogos
┊⪩ .menuff
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ɪɴғᴏ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .grupos
┊⪩ .owner
┊⪩ .ping
┊⪩ .uptime
┊⪩ .horario
┊⪩ .comprar
┊⪩ .precios
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴊᴀᴅɪ-ʙᴏᴛ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .serbot --code
┊⪩ .serbot
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`sᴇᴛᴛɪɴɢs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .enable
┊⪩ .disable
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ғʀᴇᴇ ғɪʀᴇ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
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

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴅᴏᴡɴʟᴏᴀᴅ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .play *<txt>*
┊⪩ .play2 *<txt>*
┊⪩ .aplay *<txt>*
┊⪩ .yta <txt>
┊⪩ .apk *<txt>*
┊⪩ .pinterest *<txt>*
┊⪩ .tiktok *<url>*
┊⪩ .tiktok2 *<url>*
┊⪩ .tiktokhd *<url>*
┊⪩ .instagram *<url>*
┊⪩ .instagram2 *<url>*
┊⪩ .facebook *<url>*
┊⪩ .mediafire *<url>*
┊⪩ .mega *<url>*
┊⪩ .xnxxdl *<url>*
┊⪩ .xvideosdl *<url>*
┊⪩ .tiktokrandom
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`sᴇᴀʀᴄʜ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .ytsearch *<txt>*
┊⪩ .ttsearch *<txt>*
┊⪩ .ttsearch2 *<txt>*
┊⪩ .spsearch *<txt>*
┊⪩ .scsearch *<txt>*
┊⪩ .githubsearch *<txt>*
┊⪩ .xnxxsearch *<txt>*
┊⪩ .xvsearch *<txt>*
┊⪩ .letra *<txt>*
┊⪩ .wikipedia *<txt>*
┊⪩ .mercadolibre *<txt>*
┊⪩ .playstore *<txt>*
┊⪩ .google *<url>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴄᴏɴᴠᴇʀᴛᴇʀ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .tourl *<img>*
┊⪩ .sticker *<img>*
┊⪩ .togifaud *<vid>*
┊⪩ .tomp3 *<vid>*
┊⪩ .toimg *<sticker>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴛᴏᴏʟs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .inspect *<link>*
┊⪩ .clima *<txt>*
┊⪩ .readmore *<txt>*
┊⪩ .hd *<img>*
┊⪩ .lyra *<txt>*
┊⪩ .demo *<txt>*
┊⪩ .imgg2 *<txt>*
┊⪩ .dnidox *<numdni>*
┊⪩ .whatmusic *<aud>*
┊⪩ .whatmusic *<vid>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴇғғᴇᴄᴛs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
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

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ɢʀᴏᴜᴘs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .add *<numero>*
┊⪩ .grupo abrir / cerrar
┊⪩ .grouptime *<tiempo>*
┊⪩ .promote *<tag>*
┊⪩ .demote *<tag>*
┊⪩ .kick *<tag>*
┊⪩ .fantasmas *<opción>*
┊⪩ .notify *<txt>*
┊⪩ .setwelcome *<txt>*
┊⪩ .todos *<txt>*
┊⪩ .linkgroup
┊⪩ .sorteo
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ғᴜɴ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .gay *<tag>*
┊⪩ .lesbiana *<tag>*
┊⪩ .pajero *<tag>*
┊⪩ .pajera *<tag>*
┊⪩ .puto *<tag>*
┊⪩ .puta *<tag>*
┊⪩ .manco *<tag>*
┊⪩ .manca *<tag>*
┊⪩ .rata *<tag>*
┊⪩ .prostituto *<tag>*
┊⪩ .prostituta *<tag>*
┊⪩ .doxxing *<tag>*
┊⪩ .doxear *<tag>*
┊⪩ .jalamela *<tag>*
┊⪩ .simi *<txt>*
┊⪩ .piropo
┊⪩ .chiste
┊⪩ .facto
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ɢᴀᴍᴇs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .pregunta *<txt>*
┊⪩ .ttt *<txt>*
┊⪩ .ppt *<opción>*
┊⪩ .ordenarpalabra
┊⪩ .trivia
┊⪩ .ahorcado
┊⪩ .delttt
┊⪩ .acertijo
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ɢᴀᴄʜᴀ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .rollwaifu
┊⪩ .claim *<rw>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ɴsғᴡ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .violar *<tag>*
┊⪩ .follar *<tag>*
┊⪩ .anal *<tag>*
┊⪩ .penetrar *<tag>*
┊⪩ .mamada *<tag>*
┊⪩ .suckboobs *<tag>*
┊⪩ .sexo *<tag>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`sᴛɪᴄᴋᴇʀs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .sticker *<img>*
┊⪩ .qc *<txt>*
┊⪩ .dado
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ʟᴏɢᴏs\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .logocorazon *<txt>*
┊⪩ .logochristmas *<txt>*
┊⪩ .logopareja *<txt>*
┊⪩ .logoglitch *<txt>*
┊⪩ .logosad *<txt>*
┊⪩ .logogaming *<txt>*
┊⪩ .logosolitario *<txt>*
┊⪩ .logodragonball *<txt>*
┊⪩ .logoneon *<txt>*
┊⪩ .logogatito *<txt>*
┊⪩ .logochicagamer *<txt>*
┊⪩ .logoarmy *<txt>*
┊⪩ .logonaruto *<txt>*
┊⪩ .logofuturista *<txt>*
┊⪩ .logonube *<txt>*
┊⪩ .logoangel *<txt>*
┊⪩ .logcielo *<txt>*
┊⪩ .logograffiti3d *<txt>*
┊⪩ .logomatrix *<txt>*
┊⪩ .logohorror *<txt>*
┊⪩ .logoalas *<txt>*
┊⪩ .logopubg *<txt>*
┊⪩ .logoguerrero *<txt>*
┊⪩ .logopubgfem *<txt>*
┊⪩ .logolol *<txt>*
┊⪩ .logoamongus *<txt>*
┊⪩ .logoportadaplayer *<txt>*
┊⪩ .logoportadaff *<txt>*
┊⪩ .logovideotiger *<txt>*
┊⪩ .logovideointro *<txt>*
┊⪩ .logovideogaming *<txt>*
┊⪩ .sadcat *<txt>*
┊⪩ .tweet *<comentario>*
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ʀᴘɢ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .undefined 
┊⪩ .undefined 
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ʀᴇɢ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .perfil
┊⪩ .sn
┊⪩ .reg
┊⪩ .unreg
╰──────────── ·

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`ᴏᴡɴᴇʀ\` 」* ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪
┊⪩ .clearsession
┊⪩ .cleartmp
┊⪩ .dsowner
┊⪩ .getsession
┊⪩ .restart
┊⪩ .salir
┊⪩ .savefile
┊⪩ .update
┊⪩ .autoadmin
╰──────────── ·`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardingScore: 999, externalAdReply: { title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nSɪᴍᴘʟᴇ Bᴏᴛ Wʜᴀᴛsᴀᴘᴘ 💫', thumbnailUrl: perfil, mediaType: 1, renderLargerThumbnail: false,
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
    let res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌉"
    if (time >= 5) {
        res = "Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️"
    }
    if (time > 10) {
        res = "Bᴜᴇɴ Dɪ́ᴀ 🏞️"
    }
    if (time >= 12) {
        res = "Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆"
    }
    if (time >= 19) {
        res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃"
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