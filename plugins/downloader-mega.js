/*import { File } from "megajs";
import path from "path";

const botName = 'Descarga de MEGA';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  try {
    if (!text) return conn.reply(m.chat,`*[ ℹ️ ] Ingresa un link de Mega mas el comando.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8_`, null, { quoted: m });

    const file = File.fromURL(text);
    await file.loadAttributes();

    if (file.size >= 300000000) return m.reply('Error: El archivo es demasiado pesado (Peso máximo: 300MB ( Premium: 800MB )');

    const caption = `\`DOWNLOADER - MEGA\`\n\n*🪴 File:* ${file.name}\n*⚖️ Size:* ${formatBytes(file.size)}\n\n> Shadow Bot MD`;
    const data = await file.downloadBuffer();
    const fileExtension = path.extname(file.name).toLowerCase();
    const mimeTypes = {
      ".mp4": "video/mp4",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".rar": "application/x-rar-compressed",
      ".7z": "application/x-7z-compressed",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
    };
    let mimetype = mimeTypes[fileExtension] || "application/octet-stream";
    await conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });
  } catch (error) {
    return m.reply(`Error: ${error.message}`);
  }
}

handler.help = ["mega"];
handler.tags = ["descargas"];
handler.command = /^(mega)$/i;
handler.register = true

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}*/

import { File } from "megajs";
import path from "path";

const botName = 'Descarga de MEGA';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  try {
    // Validar si el enlace es de Mega
    if (!text || !text.includes('mega.nz/file')) {
      return conn.reply(m.chat, `*[ ℹ️ ] Ingresa un enlace válido de Mega.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8_`, null, { quoted: m });
    }

    // Reacción de espera mientras procesamos el archivo
    await conn.react(m.chat, '⏳', m);

    const file = File.fromURL(text);
    await file.loadAttributes();

    // Validar que el archivo no exceda los 300MB
    const sizeLimit = 300000000; // 300MB
    if (file.size > sizeLimit) {
      return m.reply(`❌ *Error:* El archivo es demasiado pesado. El tamaño máximo permitido es de ${formatBytes(sizeLimit)}`);
    }

    // Descargar el archivo
    const data = await file.downloadBuffer();
    const fileExtension = path.extname(file.name).toLowerCase();
    const mimeTypes = {
      ".mp4": "video/mp4",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".rar": "application/x-rar-compressed",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
    };

    const mimetype = mimeTypes[fileExtension] || "application/octet-stream";

    await conn.sendFile(m.chat, data, file.name, null, m, null, { mimetype, asDocument: true });

    conn.react(m.chat, '✅', m);
  } catch (error) {
    return m.reply(`❌ *Error:* Ocurrió un problema al procesar el archivo. Intenta de nuevo más tarde.`);
  }
}

handler.help = ["mega"];
handler.tags = ["descargas"];
handler.command = /^(mega)$/i;
handler.register = true

export default handler;

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}