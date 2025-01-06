/*import FormData from 'form-data';
import axios from 'axios';
import cheerio from 'cheerio';

const extractVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `*[ ℹ️ ] Ingresa el link del video de YouTube junto al comando.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=kLpH1nSLJSs`
    );
  }

  const videoID = extractVideoID(text);
  if (!videoID) {
    return m.reply('*[ ℹ️ ] El link proporcionado es invalido.*');
  }

  await conn.sendMessage(m.chat, { text: '*[ ℹ️ ] Descargando video de YouTube...*' });

  try {
    let ytdata = await ytdl(text);

    if (!ytdata.success || !ytdata.video[0]) {
      throw new Error('*[ ❌ ] No se pudo obtener el enlace de descarga. Inténtalo más tarde.*');
    }

    let videoInfo = ytdata.video[0];
    const fileSizeInMB = parseFloat(videoInfo.fileSize.replace('MB', '').trim());

    if (fileSizeInMB > 200) {
      return m.reply(
        `*[ ⚠️ ] El archivo excede el límite permitido de 200 MB. Tamaño detectado: ${fileSizeInMB} MB.*\n*No se puede descargar.*`
      );
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: videoInfo.downloadLink },
        caption: `*Video descargado con éxito.*\n\n*🎥 Título:* ${ytdata.title}\n*⏳ Duración:* ${ytdata.duration}`,
        mimetype: 'video/mp4',
        fileName: `${ytdata.title}.mp4`,
      },
      { quoted: m }
    );
    await conn.sendMessage(m.chat, { react: { text: '💫', key: m.key } });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply(`*[ ⚠️ ] Ocurrió un error al procesar tu solicitud.*\n\n*Detalle del error:* ${error.message || 'Error desconocido.'}`);
  }
};

handler.help = ['ytmp4 *<link>*', 'ytvdoc *<link>*'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4|ytvdoc|ytmp4doc)$/i;

export default handler;

async function ytdl(query) {
  const form = new FormData();
  form.append('query', query);

  try {
    const response = await axios.post('https://yttomp4.pro/', form, {
      headers: { ...form.getHeaders() },
    });

    const $ = cheerio.load(response.data);

    const results = {
      success: true,
      title: $('.vtitle').text().trim(),
      duration: $('.res_left p').text().replace('Duracion: ', '').trim(),
      image: $('.ac img').attr('src'),
      video: [],
      audio: [],
      other: [],
    };

    $('.tab-item-data').each((index, tab) => {
      const tabTitle = $(tab).attr('id');
      $(tab).find('tbody tr').each((i, element) => {
        const fileType = $(element).find('td').eq(0).text().trim();
        const fileSize = $(element).find('td').eq(1).text().trim();
        const downloadLink = $(element).find('a.dbtn').attr('href');

        if (tabTitle === 'tab-item-1') {
          results.video.push({ fileType, fileSize, downloadLink });
        } else if (tabTitle === 'tab-item-2') {
          results.audio.push({ fileType, fileSize, downloadLink });
        } else if (tabTitle === 'tab-item-3') {
          results.other.push({ fileType, fileSize, downloadLink });
        }
      });
    });

    return results;
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, message: error.message };
  }
}*/

/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`)
let json = await api.json()
let { title, views, likes, description, author } = json.metadata
let HS = `- *Titulo :* ${title}
- *Descripcion :* ${description}
- *Visitas :* ${views}
- *Likes :* ${likes}
- *Autor :* ${author}
- *Tamaño :* ${json.downloads.size}
`
await conn.sendFile(m.chat, json.downloads.url, 'HasumiBotFreeCodes.mp4', HS, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp4)$/i

export default handler
