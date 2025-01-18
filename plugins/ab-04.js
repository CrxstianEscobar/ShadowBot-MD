import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(message.chat, '🍬 Por favor, ingrese lo que desea buscar en tiktok.', message);

  // Función para crear el mensaje de video
  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
    return videoMessage;
  }

  try {
    // Mensaje inicial informando al usuario que se está descargando el video
    conn.reply(message.chat, '🍭 Descargando su video, espere un momento...', message);

    // Realizar la búsqueda de TikTok
    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
    let searchResults = response.data;

    // Limitar a los primeros 7 resultados
    let selectedResults = searchResults.slice(0, 7);

    // Crear el mensaje con los resultados
    let results = [];
    for (let result of selectedResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '⪛✰ Tiktok - Busquedas ✰⪜' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    // Crear el mensaje con el carrusel de resultados
    const responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: '🍬 Resultado de: ' + text }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '⪛✰ Tiktok - Busquedas ✰⪜' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
          })
        }
      }
    }, { quoted: message });

    // Enviar el mensaje de respuesta
    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

  } catch (error) {
    await conn.reply(message.chat, error.toString(), message);
  }
};

handler.help = ['tiktoksearch <txt>'];
handler.coin = 1;
handler.register = true;
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];

export default handler;