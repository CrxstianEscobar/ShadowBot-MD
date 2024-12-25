let handler = async (m, { conn, command, text }) => {
if (!text) throw `*Ingrese el @ o el nombre de la persona que quieras saber si te puedes ${command.replace('how', '')}*`
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
conn.reply(m.chat, `ⓘ _Acabas de follar a ${text} poniendola en 4 como una perra, la hiciste mamar tu vrg haciendola garganta profunda, le reventaste la vagina mientras te gemia, y posiblemente haya quedado embarazada. 🥵_

> Que rico papi, dale más duro eso bb que rico, meteme bien duro, hazme tu puta!..

_${text} ya estás contenta como te dejaron la vagina y boca llena de leche? 🦊_`, null, { mentions: [user] })
}

handler.command = /^(Follar|coger|violar|kchar)/i
handler.fail = null
export default handler