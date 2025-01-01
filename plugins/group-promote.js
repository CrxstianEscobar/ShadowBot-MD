import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants }) => {
    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let promoteUser = []
    for (let user of users)
        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
            await delay(1 * 1000)
        }
    m.reply('✧ Listo')

}
handler.help = ['promote @tag']
handler.tags = ['group']
handler.command = /^(promote)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


/*
let handler = async (m, { conn,usedPrefix, command, text}) => {
if(isNaN(text) && !text.match(/@/g)){

}else if(isNaN(text)) {
var number = text.split`@`[1]
}else if(!isNaN(text)) {
var number = text
}
if(!text && !m.quoted) return conn.reply(m.chat, `🚩 Menciona a una persona.`, m, rcanal)
if(number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `🚩 Menciona a una persona.`, m, rcanal)
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'promote')
await conn.reply(m.chat, `*[ ☃️ ] @⁨user Fue promovido a administrador.*`, m, rcanal)
await m.react('✅')
}}
handler.help = ['promote *@user*']
handler.tags = ['group']
handler.command = ['promote', 'promover', 'daradmin'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
*/