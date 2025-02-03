/*import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
    tmpdir
} from 'os';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: {
                q: text
            },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

const handler = async (m, {
    text,
    conn
}) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '🍬 Por favor ingresa el texto para hacer un sticker.',
        }, {
            quoted: m
        });
    }

    try {
        const buffer = await fetchSticker(text);
        const outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.webp`);
        await sharp(buffer)
            .resize(512, 512, {
                fit: 'contain',
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 0
                }
            })
            .webp({
                quality: 80
            })
            .toFile(outputFilePath);

        await conn.sendMessage(m.chat, {
            sticker: {
                url: outputFilePath
            },
        }, {
            quoted: m
        });
        fs.unlinkSync(outputFilePath);
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `⚠️ Ocurrio un erro.`,
        }, {
            quoted: m
        });
    }
};
handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];
*/
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
      params: {
        q: text
      },
      responseType: 'arraybuffer',
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5;
      await delay(retryAfter * 1000);
      return fetchSticker(text, attempt + 1);
    }
    throw error;
  }
};

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: ' Por favor ingresa el texto para hacer un sticker.',
    }, { quoted: m });
  }
  try {
    const buffer = await fetchSticker(text);
    const stickerBuffer = await sticker(buffer, {
      pack: 'Tu paquete de stickers',
      author: 'Tu nombre',
    });
    const stickerExif = await addExif(stickerBuffer, {
      pack: 'Tu paquete de stickers',
      author: 'Tu nombre',
    });
    const stickerUrl = await uploadFile(stickerExif);
    await conn.sendMessage(m.chat, {
      sticker: {
        url: stickerUrl
      },
    }, { quoted: m });
  } catch (error) {
    return conn.sendMessage(m.chat, {
      text: ' Ocurrio un error.',
    }, { quoted: m });
  }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat <texto>'];

export default handler;
