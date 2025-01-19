import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🤍\`*', m);
  try {
    let data = await tiktokdl(text); // Obtén la información del video
    console.log(data);

    // Mensajes de calidad
    let cap = `*\`[ TIKTOK CALIDAD NORMAL ]\`*`;
    let capp = `*\`[ TIKTOK CALIDAD HD ]\`*`;

    // Crear los botones
    const buttons = [
      { buttonId: `downloadNormal_${text}`, buttonText: { displayText: 'Descargar Normal' }, type: 1 },
      { buttonId: `downloadHD_${text}`, buttonText: { displayText: 'Descargar HD' }, type: 1 }
    ];

    // Mensaje con botones para video normal
    const buttonMessage = {
      video: { url: data.server1.url },
      caption: cap,
      footer: 'Elige la calidad que deseas descargar.',
      buttons: buttons,
      headerType: 4
    };

    // Enviar mensaje de calidad normal
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    // Mensaje con botones para video HD
    const buttonMessageHD = {
      video: { url: data.serverHD.url },
      caption: capp,
      footer: 'Elige la calidad que deseas descargar.',
      buttons: buttons,
      headerType: 4
    };

    // Enviar mensaje de calidad HD
    await conn.sendMessage(m.chat, buttonMessageHD, { quoted: m });

    // Marca como completado
    await m.react('✅');
  } catch (error) {
    // Si ocurre un error, marcar como fallo
    await m.react('✖️');
    console.error(error);
  }
};

handler.help = ['tiktokhd *<url>*'];
handler.tags = ['dl'];
handler.command = /^(tiktokhd)$/i;

export default handler;

async function tiktokdl(url) {
  let result = {};
  let form = new FormData();
  form.append("q", url);
  form.append("lang", "id");

  try {
    // Solicitar al API de SaveTik para obtener los enlaces
    let { data } = await axios("https://savetik.co/api/ajaxSearch", {
      method: "post",
      data: form,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": "PostmanRuntime/7.32.2"
      }
    });

    let $ = cheerio.load(data.data);

    result.status = true;
    result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text();
    result.server1 = {
      quality: "MEDIUM",
      url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
    };
    result.serverHD = {
      quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
      url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
    };
    result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");

  } catch (error) {
    result.status = false;
    result.message = error;
    console.log(result);
  }

  return result;
}