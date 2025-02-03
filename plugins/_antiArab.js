let handler = async(m, { conn, usedPrefix, command }) => {

let vid = 'link del vídeo';
let txt = 'Penis For all';

conn.sendMessage(m.chat, { video: vid }, caption: txt }, { quoted: m });
};

handler.command = ['test', 'prueba'];

export default handler;