const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;
 
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
const oi = `\`⏤͟͟͞͞A⃞᥎ׁׅꪱׁׁׁׅׅׅׅ꯱ᨵׁׅׅ :\` ${pesan}`;
  let teks = `૮꒰˵•ᵜ•˵꒱ა‧ \`ꭈׁׅꫀׁׁׅܻׅ݊᥎ׁׅꪱׁׁׁׁׅׅׅׅ᥎ׁׅɑׁׅ݊ꪀ ℘ᥣׁׅ֪ɑׁׅ݊ꪀtׁׁׁׅׅׅɑׁׅׅ꯱!\`\n ⚘⃝ іᥒ𝗍ᥱgrᥲᥒ𝗍ᥱs : ${participants.length}\n\n ${oi}\n\n╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄\n`;
  for (const mem of participants) {
    teks += `│ ꕤᝰ. @${mem.id.split('@')[0]}\n`;
  }
  teks += `╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚\n\n>`
  teks += ` ${botname}`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['todos <mesaje>'];
handler.tags = ['grupo'];
handler.command = /^(tagall|t|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;
