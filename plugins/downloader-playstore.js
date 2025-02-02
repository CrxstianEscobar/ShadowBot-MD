import gplay from 'google-play-scraper';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {

    if (!args[0]) {
        return conn.reply(m.chat, `*[ ☕ ] Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*[ 💡 ] Ejemplo:* .playstore https://play.google.com/store/apps/details?id=com.whatsapp`, m, rcanal);
    }

    m.react('⌛');

    const url = args[0];
    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*[ ❌ ] La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m, rcanal);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch {
        return conn.reply(m.chat, `*[ ❌ ] No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
    }

    const h = info.title;
    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    const response = await fetch(link);
    if (!response.ok) {
        return conn.reply(m.chat, `*[ ❌ ] No se pudo obtener el archivo APK. Intenta con otro enlace.*`, m, rcanal);
    }

    await conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

    m.react('✅️');
    //conn.reply(m.chat, `*[ ✅ ] Descarga completada para "${h}*`, m, rcanal);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dowloader'];
handler.command = /^(playstore|psdl)$/i;
hendler.register = true;
export default handler;