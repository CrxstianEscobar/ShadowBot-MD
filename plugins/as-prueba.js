import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*❌ Ingresa un link de ApkPure*`
const url = args[0]
const separado = url.split("/");
const resultado = separado[separado.length - 1];
m.react('🩵')
let link = `https://d.apkpure.com/b/APK/${resultado}?version=latest`

let url_dl = link;
let response = await fetch(url_dl);
let buffer = await response.arrayBuffer();
conn.sendFile(m.chat, buffer, resultado + '.apk', `* ApkPure Downloader*`, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

let link_dl = await fetch(link)

conn.sendFile(m.chat, url_dl, resultado + '.apk', `*⌗ ApkPure Downloader*`, m, false, { mimetype: 'application/videos.android.package-archive', asDocument: true })
m.react('🍃')
}
handler.tags = ['dl', 'prem']
handler.help = ['apkpure']
handler.command = ['apkpure'] 
handler.premium = false
export default handler