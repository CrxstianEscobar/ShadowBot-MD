/*

- Youtube Downloader By KenisawaDev 

*/

import FormData from 'form-data';
import axios from 'axios';
import cheerio from 'cheerio';

const extractVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`✧ Ejemplo: ${usedPrefix + command} https://youtube.com/watch?v=_r7impapnQY`);
const videoID = extractVideoID(text);
if (!videoID) throw m.reply('✧ Ingresa un link válido de YouTube.');
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
let ytdata = await ytdl(text);
console.log(ytdata);
//await conn.sendFile(m.chat, ytdata.video[0].downloadLink, `${ytdata.title}.mp4`, `*✧ Info:* ${ytdata.duration}`, m)
await conn.sendMessage(m.chat, { document: { url: ytdata.video[0].downloadLink }, caption: `\`✦ Pedido terminado: ${ytdata.duration}\``, mimetype: 'video/mp4', fileName: `${ytdata.title}` + `.mp4`}, {quoted: m })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
//await conn.sendFile(m.chat, ytdata.audio[0].downloadLink, `${ytdata.title}.mp3`, `*✧ Info:* ${ytdata.duration}`, m)
} catch (error) {
console.error(`Error: ${error.message}`);
await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
//throw m.reply(`Failed to process request: ${error.message || error}`);
}
};
handler.help = ['ytmp4 *<link>*','ytvdoc *<link>*'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4|ytvdoc|ytmp4doc)$/i;

 export default handler

async function ytdl(query) {
 const form = new FormData();
 form.append('query', query);

 try {
 const response = await axios.post('https://yttomp4.pro/', form, {
 headers: {
 ...form.getHeaders()
 }
 });

 const $ = cheerio.load(response.data);

 const results = {
 success: true,
 title: $('.vtitle').text().trim(),
 duration: $('.res_left p').text().replace('Duracion: ', '').trim(),
 image: $('.ac img').attr('src'),
 video: [],
 audio: [],
 other: []
 };
 
 $('.tab-item-data').each((index, tab) => {
 const tabTitle = $(tab).attr('id');
 $(tab).find('tbody tr').each((i, element) => {
 const fileType = $(element).find('td').eq(0).text().trim();
 const fileSize = $(element).find('td').eq(1).text().trim();
 const downloadLink = $(element).find('a.dbtn').attr('href');

 if (tabTitle === 'tab-item-1') {
 results.video.push({
 fileType,
 fileSize,
 downloadLink
 });
 } else if (tabTitle === 'tab-item-2') {
 results.audio.push({
 fileType,
 fileSize,
 downloadLink
 });
 } else if (tabTitle === 'tab-item-3') {
 results.other.push({
 fileType,
 fileSize,
 downloadLink
 });
 }
 });
 });
 
 return results;
 } catch (error) {
 return { success: false, message: error.message };
 console.log('Error:' + error);
 }
}