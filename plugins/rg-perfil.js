/*import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg')
let { level, exp, registered, regTime, age } = global.db.data.users[m.sender]
let username = conn.getName(who)
let api = await /axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);

    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

let txt = `°─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───°


│ ୨୧ *Nᴏᴍʙʀᴇ:* xd
│ ୨୧ *Eᴅᴀᴅ*: 
│ ୨୧ *Gᴇɴᴇʀᴏ:*
│ ୨୧ *Pᴀɪs:*
╰─⪩
ˏˋ°•*⁀➷ *. :  ｡ * ﾟ  * .: ｡

│ დ *Nᴠʟ:* 
│ დ *Exᴘ:* 
│ დ *Cᴏɪɴs:* 15
╰─⪩`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${txt.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler;*/

// 🫵🏻🫵🏻🫵🏻🫵🏻🫵🏻🫵🏻

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg')
let { premium, level, cookies, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender]
let username = conn.getName(who)

let noprem = `
🚩 *PERFIL DE USUARIO*
${userNationality}
☁️ *Nombre:* ${username}
💥 *Tag:* @${who.replace(/@.+/, '')}
🌀 *Registrado:* ${registered ? '✅': '❌'}

👑 *RECURSOS*
🍪 *Cookies:* ${cookies}
💥 *Nivel:* ${level}
💫 *Experiencia:* ${exp}
✨️ *Rango:* ${role}

💖 *Premium:* ${premium ? '✅': '❌'}
`.trim()
let prem = `╭─⪩ 𓆩 𝐏𝐄𝐑𝐅𝐈𝐋 - 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𓆪
│⧼👤⧽ *ᴜsᴜᴀʀɪᴏ:* 「${username}」
│⧼💌⧽ *ʀᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *ʀᴏʟ:* Vip 👑
╰─⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼🍪⧽ *ᴄᴏᴏᴋɪᴇs:* ${cookies}
│⧼🔰⧽ *ɴɪᴠᴇʟ:* ${level}
│⧼💫⧽ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp}
│⧼⚜️⧽ *ʀᴀɴɢᴏ:* ${role}
╰─⪩ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸*`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
