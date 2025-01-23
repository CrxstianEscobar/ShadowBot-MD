/*import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`[ ℹ️ ] *Usted ya esta registrado.*\nPara registrarse de nuevo borre su registro con este comando.\n\n_${usedPrefix}unreg *<Numero de serie>*_`)
  if (!Reg.test(text)) return m.reply(`🤖 FORMATO INCORRECTO.\n\nUSO DEL COMANDO: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.21*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🌙 El NOMBRE NO PUEDE ESTAR VACÍO.')
  if (!age) return m.reply('🌙 LA EDAD NO PUEDE ESTAR VACÍA.')
  if (name.length >= 100) return m.reply('🥷🏻 El NOMBRE ESTA MUY LARGO.' )
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 WOW EL ABUELO QUIERE JUGAR AL BOT.')
  if (age < 5) return m.reply('🚼 EL BEBE QUIERE JUGAR JAJA. ')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
  let img = await (await fetch(`https://i.ibb.co/QjgtQnR/file.jpg`)).buffer()
  let txt = `\`𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊 - 𝙎𝙃𝘼𝘿𝙊𝙒\`\n\n`
      txt += `✧ *Nombre:* ${name}\n`
      txt += `✧ *Edad:* ${age} años\n`
      txt += `✧ *Serie:* ${sn}\n\n`
      txt += `> Escribe *${usedPrefix}profile* para ver tu perfil.`
await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
await m.react('✅')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler*/

// 👺👺👺👺👺

import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)

    if (user.registered === true) {
        return m.reply(`*[ ☕ ] Ya te encuentras registrado.*\n\n*¿Quiere registrarse nuevamente?*\n\nUse este comando para eliminar su registro.*\n${usedPrefix}unreg`)
    }

    if (!Reg.test(text)) return m.reply(`Eʟ ғᴏʀᴍᴀᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\nUsᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix + command} 𝗻𝗼𝗺𝗯𝗿𝗲.𝗲𝗱𝗮𝗱\nEᴊᴇᴍᴘʟᴏ : *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('💛 Eʟ ɴᴏʍ𝗯𝗿ᴇ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪᴏ.')
    if (!age) return m.reply('💛 Lᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ.')
    if (name.length >= 100) return m.reply('💛 El nombre es demasiado largo.')

    age = parseInt(age)
    if (age > 100) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
    if (age < 5) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `┏━━━━━━━━━━━━━━━━━━⬣
┃⋄ *🎩 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 - 𝐂𝐑𝐎𝐖𝐁𝐎𝐓*
┗━━━━━━━━━━━━━━━━━━⬣\n`
    regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
    regbot += `「💛」𝐍𝐨𝐦𝐛𝐫𝐞: ${name}\n`
    regbot += `「💛」𝐄𝐝𝐚𝐝: ${age} años\n`
    regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
    regbot += `「💝」𝐑𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚𝐬:\n> `
    regbot += `• 15 Estrellas 🌟\n> `
    regbot += `• 5 CrowCoins 🪙\n> `
    regbot += `• 245 Experiencia 💸\n> `
    regbot += `• 12 Tokens 💰\n`

    await m.react('📪')
    await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',
                body: 'Gracias por registrarte',
                thumbnailUrl: 'https://files.catbox.moe/lger9i.jpg',
                sourceUrl: 'https://whatsapp.com',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler