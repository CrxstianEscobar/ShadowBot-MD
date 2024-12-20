import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/kgzBh.jpg')
let { level, exp, registered, regTime, age } = global.db.data.users[m.sender]
let username = conn.getName(who)
let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

let txt = `

ˏˋ°──── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ────°ˊˎ

╭─⪩ 𓆩 𝐏𝐄𝐑𝐅𝐈𝐋 - 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𓆪
│ ୨୧ *Nᴏᴍʙʀᴇ:* ${username}
│ ୨୧ *Tᴀɢ:* @${who.replace(/@.+/, '')}
│ ୨୧ *Eᴅᴀᴅ*: ${age} años
│ ୨୧ *Gᴇɴᴇʀᴏ:* Hetero
│ ୨୧ *Rᴇɢ:* ${registered ? 'Si': 'No'}
│ ୨୧ *Pᴀɪs:* ${userNationality}
╰───────────────────⪩
ˏˋ°•*⁀➷ *. :  ｡ * ﾟ  * .: ｡   * . :  ｡   *
╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│ დ *Nᴠʟ:* ${level}
│ დ *Exᴘ:* ${exp}
│ დ *Cᴏɪɴs:* 15
╰───────────────────⪩
   ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊ ♡ °̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ °̩̥˚̩̩̥͙°̩̥ ♡ ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊
> *Sʜᴀᴅᴏᴡ Bᴏᴛ MD* ♡
`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${txt.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler