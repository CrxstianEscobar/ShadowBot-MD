const handler = async (m, {conn, usedPrefix, text}) => {

  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `Hola\n\n*┯┷*\n*┠≽ .daradmin @tag*\n*┠≽ .darpoder 🙂\n*┷┯*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, '👍🏼', m);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    conn.reply(m.chat, `@${conn.tagUser(user)} Fast kbro ya eres admin ☃️`, m);
  }
};
handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map((v) => 'promote ' + v);
handler.tags = ['group'];
handler.command = /^(promote|daradmin|darpoder)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;


/*var handler = async (m, { conn,usedPrefix, command, text }) => {

if (isNaN(text) && !text.match(/@/g)){

} else if (isNaN(text)) {
var number = text.split`@`[1]
} else if (!isNaN(text)) {
var number = text
}

if (!text && !m.quoted) return conn.reply(m.chat, `🍻 *Responda a un participante del grupo para asignarle admin.*`, m, rcanal)
if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `✨️ *Debe de responder o mensionar a una persona para usar este comando.*`, m, fake)

try {
if (text) {
var user = number + '@s.whatsapp.net'
} else if (m.quoted.sender) {
var user = m.quoted.sender
} else if (m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'promote')
conn.reply(m.chat, `✅ *Fue agregado como admin del grupo con exito.*`, m, fake)
}

}
handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']

handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler*/

/*let handler = async (m, { conn,usedPrefix, command, text}) => {
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