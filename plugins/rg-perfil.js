import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/QjgtQnR/file.jpg')
  let username = conn.getName(who)
  let sn = createHash('md5').update(who).digest('hex')
  let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  let img = await (await fetch(`${pp}`)).buffer()
  let txt = ` –  *PERFIL - USER*\n\n`
      txt += `◦ *Nombre* : ${name}\n`
      txt += `◦ *Edad* : ${age} años`\n`
      txt += `◦ *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
      txt += `◦ *Nacionalidad* : ${userNationality}\n`
      txt += `◦ *Link* : wa.me/${who.split`@`[0]}\n`
      txt += `◦ *Registrado* : ${registered ? 'Si': 'No'}`
  let mentionedJid = [who]
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fake)
}
handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler