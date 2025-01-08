/*import { search, download } from 'aptoide-scraper'

var handler = async (m, {conn, usedPrefix, command, text}) => {
if (!text) return conn.reply(m.chat, '*[ ℹ️ ] Ingrese el nombre de una apk.*', m, rcanal)
try {
await m.react(rwait)
conn.reply(m.chat, '*[ ☃️ ] Descargando su aplicación...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let txt = `*乂  APTOIDE - DESCARGAS* 乂\n\n`
txt += `🕵🏻 *Nombre* : ${data5.name}\n`
txt += `🗃 *Package* : ${data5.package}\n`
txt += `🪴 *Update* : ${data5.lastup}\n`
txt += `⚖ *Peso* :  ${data5.size}`
await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m, null, rcanal) 
await m.react(done)  
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.reply(m.chat, '*[ ℹ️ ] El archivo es demasiado pesado*', m, rcanal )}
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: fkontak})
} catch {
return conn.reply(m.chat, '*[ ℹ️ ] Ocurrió un fallo*', m, rcanal )}}

handler.tags = ['downloder']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.register = true

export default handler*/

import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '[ℹ️] Ingrese el nombre de una apk.', m);  // Mensaje si no se proporciona texto
  
  try {    
    const searchA = await search(text);  // Realiza la búsqueda
    const data5 = await download(searchA[0].id);  // Descarga la información del APK
    
    // Preparar el mensaje con la información del APK
    let response = `*乂  APTOIDE - DESCARGAS* 乂\n\n`;
    response += `🕵🏻 *Nombre* : ${data5.name}\n`;
    response += `🗃 *Package* : ${data5.package}\n`;
    response += `🪴 *Actualización* : ${data5.lastup}\n`;
    response += `⚖ *Peso* : ${data5.size}`;
    
    // Enviar la respuesta con la imagen y la descripción
    await conn.sendMessage(m.chat, { 
      image: { url: data5.icon }, 
      caption: response 
    }, { quoted: m });

    // Verificar si el archivo es muy grande
    if (data5.size.includes('GB') || parseInt(data5.size.replace(' MB', '')) > 999) {
      return await conn.sendMessage(m.chat, { text: '[ℹ️] El archivo es demasiado pesado.' }, { quoted: m });
    }

    // Enviar el archivo APK
    await conn.sendMessage(m.chat, { 
      document: { url: data5.dllink }, 
      mimetype: 'application/vnd.android.package-archive', 
      fileName: data5.name + '.apk' 
    }, { quoted: m });

  } catch (err) {
    console.error(err);  // Mostrar error en la consola para depuración
    return conn.reply(m.chat, '[ℹ️] Ocurrió un fallo.', m);  // Mensaje de error
  }
};

handler.command = /^(apk|apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;
export default handler;