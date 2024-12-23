/*
const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
*/

const handler = async (m, {conn}) => {
  conn.reply(m.chat, global.ComprarBot.replace('@user', `@${m.sender.username || m.sender.jid.split('@')[0]}`), m);
};

};
handler.command = /^(preciosbot|precios|comprarbot|comprar)$/i;
export default handler;

global.ComprarBot = `
Hola @user te presento al bot mas lindo de Whatsapp.
*Mi creador:* wa.me//51927238856
Consulta con el para adquirir el Bot.

·˚ ༘₊· ͟͟͞͞꒰𝐌𝐄𝐓𝐎𝐃𝐎𝐒 𝐃𝐄 𝐏𝐀𝐆𝐎 🛍
_- Mercado pago_
_- Yape_
_- Pay pal_
_- Diamantes_

·˚ ༘₊· ͟͟͞͞꒰𝐏𝐑𝐄𝐂𝐈𝐎𝐒 💸
╰➳ \`sʜᴀᴅᴏᴡ - ʙᴏᴛ\`
╭──• \`ᴘᴇsᴏs ᴀʀɢ\` 🇦🇷
╎ᜊ _1 Bot - 1500_
╎ᜊ _3 Bot - 2500_
╎ᜊ _6 Bot - 4000_
╰──•
╭──• \`sᴏʟᴇs ᴘᴇ\` 🇵🇪
╎ᜊ _1 Bot - 5_
╎ᜊ _3 Bot - 8_
╎ᜊ _6 Bot - 14_
╰──•
╭──• \`ᴅᴏʟᴀʀᴇs\` 🇺🇸
╎ᜊ _1 Bot - 1_
╎ᜊ _3 Bot - 3_
╎ᜊ _6 Bot - 6_
╰──•
╭──• \`ᴅɪᴀᴍᴀɴᴛᴇs\` 💎
╎ᜊ _1 Bot - 100_
╎ᜊ _3 Bot - 300_
╎ᜊ _6 Bot - 500_
╰──•`;
