import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*❌ Ingresa un link de ApkPure*`
const url = args[0]
const separado = url.split("/");
const resultado = separado[separado.length - 1];
m.react('🩵')
let link = `https://d.apkpure.com/b/APK/${resultado}?version=latest`
let _url = new URL(link)
    let url_dl = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
let link_dl = await fetch(link)

conn.sendFile(m.chat, url_dl, resultado + '.apk', `*⌗ ApkPure Downloader*`, m, false, { mimetype: 'application/videos.android.package-archive', asDocument: true })
m.react('🍃')
}
handler.tags = ['dl', 'prem']
handler.help = ['apkpure']
handler.command = ['apkpure'] 
handler.premium = false
export default handler