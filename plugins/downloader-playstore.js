/*import gplay from 'google-play-scraper';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    // Verificar si hay un enlace
    if (!args[0]) {
        return conn.reply(m.chat, `*☕ Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

    // Reacción de espera solo si se pasa un enlace
    m.react('⌛');

    const url = args[0];
    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m, rcanal);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch {
        return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
    }

    const h = info.title;
    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    // Verificación de la URL de APK
    const response = await fetch(link);
    if (!response.ok) {
        return conn.reply(m.chat, `*❌ No se pudo obtener el archivo APK. Intenta con otro enlace.*`, m, rcanal);
    }

    // Enviar el archivo APK y esperar que se termine
    await conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

    // Reacción de éxito
    m.react('✅️');
    conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;*/

import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    // Verificar si hay un enlace
    if (!args[0]) {
        return conn.reply(m.chat, `*☕ Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

    // Reacción de espera solo si se pasa un enlace
    m.react('⌛');

    const url = args[0];
    
    // 4. Validación estricta del enlace de Play Store
    if (!url.startsWith("https://play.google.com/store/apps/details?id=")) {
        return conn.reply(m.chat, `*❌ El enlace proporcionado no es de la Play Store. Por favor, usa un enlace válido de la Play Store.*`, m, rcanal);
    }

    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ La URL proporcionada no contiene un ID de aplicación válido.*`, m, rcanal);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        // 2. Manejo de errores específicos
        if (error.message.includes('App not found')) {
            return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación en Google Play. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
        }
        return conn.reply(m.chat, `*❌ Ocurrió un error al obtener la información de la aplicación. Intenta nuevamente más tarde.*`, m, rcanal);
    }

    const h = info.title;
    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    // 3. Verificación de tiempo de espera
    try {
        const response = await fetch(link);
        if (!response.ok) {
            return conn.reply(m.chat, `*❌ No se pudo obtener el archivo APK. Intenta con otro enlace.*`, m, rcanal);
        }

        // Enviar el archivo APK y esperar que se termine
        await conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

        // Reacción de éxito
        m.react('✅️');
        conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
    } catch (error) {
        // Error en caso de que la descarga no se complete correctamente
        m.react('❌');
        conn.reply(m.chat, `*❌ Hubo un problema al intentar obtener el archivo APK. Intenta más tarde.*`, m, rcanal);
    }
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;