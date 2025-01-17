/*import PhoneNumber from 'awesome-phonenumber'
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
export default handler*/


import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/P4nbf7g/file.jpg')
  let { exp, limit, name, registered, regTime, age, level } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  let img = await (await fetch(`${pp}`)).buffer()
  let txt = ` –  *P E R F I L  -  U S E R*\n\n`
      txt += `┌  ✩  *Nombre* : ${name}\n`
      txt += `│  ✩  *Edad* : ${registered ? `${age} años` : '×'}\n`
      txt += `│  ✩  *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
      txt += `│  ✩  *Nacionalidad* : ${userNationality}\n`
      txt += `│  ✩  *Link* : wa.me/${who.split`@`[0]}\n`
      txt += `│  ✩  *Estrellas* : ${limit}\n`
      txt += `│  ✩  *Nivel* : ${level}\n`
      txt += `│  ✩  *XP* : Total ${exp} (${user.exp - min}/${xp})\n`
      txt += `│  ✩  *Premium* : ${prem ? 'Si' : 'No'}\n`
      txt += `└  ✩  *Registrado* : ${registered ? 'Si': 'No'}`
  let mentionedJid = [who]
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}
handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatDate(n, locale = 'es-US') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatHour(n, locale = 'en-US') {
  let d = new Date(n)
  return d.toLocaleString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}