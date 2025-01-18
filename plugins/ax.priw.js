import fetch from 'node-fetch';
import yts from 'yt-search';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@adiwajshing/baileys';
import FormData from 'form-data';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} elaina edit`);

    await m.reply('> _*`Cargando...`*_');

    async function createImage(img) {
        const { imageMessage } = await generateWAMessageContent({
            image: img
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Buscar videos en YouTube
    let results = await yts(text);
    let videos = results.videos.slice(0, 6); 
    shuffleArray(videos);

    let push = [];
    let i = 1;

    // Crear los mensajes con los videos
    for (let video of videos) {
        let imageUrl = video.thumbnail;
        let imageK = await fetch(imageUrl);
        let imageB = await imageK.buffer();
        
        // Llamar a la función para mejorar la imagen
        let pr = await remini(imageB, "enhance");

        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `🎬 *Título:* ${video.title}\n⌛ *Duración:* ${video.timestamp}\n👀 *Vistas:* ${video.views}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '乂 Y O U T U B E' 
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `Video - ${i++}`,
                hasMediaAttachment: true,
                imageMessage: await createImage(pr)
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": `{"display_text":"Mirar en YouTube","url":"${video.url}"}`
                    },
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({
                            "display_text": "Copiar Link",
                            "copy_code": `${video.url}`
                        })
                    }
                ]
            })
        });
    }

    // Crear el mensaje de salida con todos los videos
    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Resultados de la búsqueda completos..."
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'YOUTUBE'
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push]
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}

handler.help = ["ytslide *<consulta>*", "ytx *<consulta>*"];
handler.tags = ["search"];
handler.command = ["ytslide", "ytx"];

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (!availableOperations.includes(operation)) {
      operation = availableOperations[0];
    }
    
    const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
    formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });
    
    formData.submit({
      url: baseUrl,
      host: "inferenceengine.vyro.ai",
      path: `/${operation}`,
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    }, function (err, res) {
      if (err) reject(err);
      const chunks = [];
      res.on("data", function (chunk) { chunks.push(chunk); });
      res.on("end", function () { resolve(Buffer.concat(chunks)); });
      res.on("error", function (err) { reject(err); });
    });
  });
}