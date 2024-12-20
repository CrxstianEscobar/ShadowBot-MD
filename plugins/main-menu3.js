let handler = async (m, { isPrems, conn }) => {
let time = global.db.data.users[m.sender].lastcofre + 0 // 36000000 10 Horas //86400000 24 Horas
if (new Date - global.db.data.users[m.sender].lastcofre < 0) throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`

let img = 'https://qu.ax/CDaWO.jpg' 
    const user = global.db.data.users[m.sender];
const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
const fechaPeru = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });
console.log(fechaPeru);
//let date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'})
//let taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
let texto = `> ⓘ ¡Hola!, ${taguser}
> ¿Como está hoy?
> ${fechaPeru}
*˚₊·˚₊· ͟͟͞͞➳❥ _Shadow Bot_*
*☆═━┈◈ ╰ 1.4.0 MD ╯ ◈┈━═☆*
*│* 
*╰ ˚₊·˚₊· ͟͟͞͞➳❥ _By Cristian_*
*⊰᯽⊱┈──╌•|* ⊱✿⊰ *|•╌──┈⊰᯽⊱*
╭─·˚₊· ͟͟͞͞꒰➳ \`ᴍᴇɴᴜ - ʟᴏɢᴏs\` 𑁭𑁘
┊⪩ _${usedPrefix}logocorazon *<txt>*_
┊⪩ _${usedPrefix}logochristmas *<txt>*_
┊⪩ _${usedPrefix}logopareja *<txt>*_
┊⪩ _${usedPrefix}logoglitch *<txt>*_
┊⪩ _${usedPrefix}logosad *<txt>*_
┊⪩ _${usedPrefix}logogaming *<txt>*_
┊⪩ _${usedPrefix}logosolitario *<txt>*_
┊⪩ _${usedPrefix}logodragonball *<txt>*_
┊⪩ _${usedPrefix}logoneon *<txt>*_
┊⪩ _${usedPrefix}logogatito *<txt>*_
┊⪩ _${usedPrefix}logochicagamer *<txt>*_
┊⪩ _${usedPrefix}logoarmy *<txt>*_
┊⪩ _${usedPrefix}logonaruto *<txt>*_
┊⪩ _${usedPrefix}logofuturista *<txt>*_
┊⪩ _${usedPrefix}logonube *<txt>*_
┊⪩ _${usedPrefix}logoangel *<txt>*_
┊⪩ _${usedPrefix}logcielo *<txt>*_
┊⪩ _${usedPrefix}logograffiti3d *<txt>*_
┊⪩ _${usedPrefix}logomatrix *<txt>*_
┊⪩ _${usedPrefix}logohorror *<txt>*_
┊⪩ _${usedPrefix}logoalas *<txt>*_
┊⪩ _${usedPrefix}logopubg *<txt>*_
┊⪩ _${usedPrefix}logoguerrero *<txt>*_
┊⪩ _${usedPrefix}logopubgfem *<txt>*_
┊⪩ _${usedPrefix}logolol *<txt>*_
┊⪩ _${usedPrefix}logoamongus *<txt>*_
┊⪩ _${usedPrefix}logoportadaplayer *<txt>*_
┊⪩ _${usedPrefix}logoportadaff *<txt>*_
┊⪩ _${usedPrefix}logovideotiger *<txt>*_
┊⪩ _${usedPrefix}logovideointro *<txt>*_
┊⪩ _${usedPrefix}logovideogaming *<txt>*_
┊⪩ _${usedPrefix}sadcat *<txt>*_
┊⪩ _${usedPrefix}tweet *<comentario>*_
╰─────────────── –`
const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
global.db.data.users[m.sender].lastcofre = new Date * 1
}
handler.help = ['menu3']
handler.tags = ['main', 'logo']
handler.command = ['menulogos', 'logos', 'menu3'] 
export default handler