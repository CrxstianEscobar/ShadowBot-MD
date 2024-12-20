let handler = async (m, { isPrems, conn }) => {
let time = global.db.data.users[m.sender].lastcofre + 0 // 36000000 10 Horas //86400000 24 Horas
if (new Date - global.db.data.users[m.sender].lastcofre < 0) throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`

let img = 'https://i.ibb.co/QjgtQnR/file.jpg' 
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
┊⪩ _.logocorazon *<txt>*_
┊⪩ _.logochristmas *<txt>*_
┊⪩ _.logopareja *<txt>*_
┊⪩ _.logoglitch *<txt>*_
┊⪩ _.logosad *<txt>*_
┊⪩ _.logogaming *<txt>*_
┊⪩ _.logosolitario *<txt>*_
┊⪩ _.logodragonball *<txt>*_
┊⪩ _.logoneon *<txt>*_
┊⪩ _.logogatito *<txt>*_
┊⪩ _.logochicagamer *<txt>*_
┊⪩ _.logoarmy *<txt>*_
┊⪩ _.logonaruto *<txt>*_
┊⪩ _.logofuturista *<txt>*_
┊⪩ _.logonube *<txt>*_
┊⪩ _.logoangel *<txt>*_
┊⪩ _.logcielo *<txt>*_
┊⪩ _.logograffiti3d *<txt>*_
┊⪩ _.logomatrix *<txt>*_
┊⪩ _.logohorror *<txt>*_
┊⪩ _.logoalas *<txt>*_
┊⪩ _.logopubg *<txt>*_
┊⪩ _.logoguerrero *<txt>*_
┊⪩ _.logopubgfem *<txt>*_
┊⪩ _.logolol *<txt>*_
┊⪩ _.logoamongus *<txt>*_
┊⪩ _.logoportadaplayer *<txt>*_
┊⪩ _.logoportadaff *<txt>*_
┊⪩ _.logovideotiger *<txt>*_
┊⪩ _.logovideointro *<txt>*_
┊⪩ _.logovideogaming *<txt>*_
┊⪩ _.sadcat *<txt>*_
┊⪩ _.tweet *<comentario>*_
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