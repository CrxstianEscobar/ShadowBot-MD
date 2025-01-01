import axios from 'axios'
import fs from 'fs'
import os from 'os'
import ffmpeg from 'fluent-ffmpeg'
import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw m.reply(`✧ Ejemplo: ${usedPrefix}${command} Waguri Edit`);

 await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})

    let results = await yts(text);
    let tes = results.videos[0]

  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1] || '480';

  const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(tes.url)}&reso=480`;

  try {
    const response = await axios.get(apiUrl);
    const { url: videoStreamUrl, filename } = response.data;

    if (!videoStreamUrl) throw m.reply('No hay respuesta de la api.');

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${filename}`;

    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      url: videoStreamUrl,
      method: 'GET',
      responseType: 'stream'
    });

    downloadResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const outputFilePath = `${tmpDir}/${filename.replace('.mp4', '_fixed.mp4')}`;

    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .outputOptions('-c copy')
        .output(outputFilePath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const caption = `Aqui tiene su vídeo @${m.sender.split('@')[0]}`;

await conn.sendMessage(m.chat, { document: { url: outputFilePath }, caption: caption, mimetype: 'video/mp4', fileName: `${tes.title}` + `.mp4`}, {quoted: m })

/*    await conn.sendMessage(m.chat, {
      video: { url: outputFilePath },
      mimetype: "video/mp4",
      fileName: filename,
      caption,
      mentions: [m.sender]
    }, { quoted: m });*/
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete original video file: ${err}`);
      } else {
        console.log(`Deleted original video file: ${filePath}`);
      }
    });

    fs.unlink(outputFilePath, (err) => {
      if (err) {
        console.error(`Failed to delete processed video file: ${err}`);
      } else {
        console.log(`Deleted processed video file: ${outputFilePath}`);
      }
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key }})
  }
};

handler.help = ['playvideo *<consulta>*'];
handler.tags = ['downloader'];
handler.command = /^(playvideo|playvid)$/i;

handler.register = true
handler.disable = false

export default handler