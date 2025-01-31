/*import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    m.react('🤍');

    if (!args[0]) {
        console.log('Argumento vacío, enviando mensaje de ayuda');
        return conn.reply(m.chat, `*🚩 Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

    const url = args[0];

    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m, rcanal);
    }

    console.log(`ID de paquete: ${packageName}`);

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
    }

    const h = info.title;
    console.log(`Título de la aplicación: ${h}\nID de la aplicación: ${info.appId}`);

    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
    m.react('✅️');

    conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;



import gplay from 'google-play-scraper';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    // Reacción de espera cuando se recibe el comando
    m.react('🤍');

    if (!args[0]) {
        // Reacción de error si no se proporciona el enlace
        m.react('❌');
        return conn.reply(m.chat, `*🚩 Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

    const url = args[0];
    let packageName;

    // Validación de la URL para asegurarse de que es un enlace válido de Play Store
    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.hostname.includes('play.google.com')) throw new Error('No es un enlace de Play Store.');
        packageName = parsedUrl.searchParams.get("id");
        if (!packageName) throw new Error('El enlace no contiene un ID de aplicación.');
    } catch (error) {
        // Reacción de error si la URL no es válida
        m.react('❌');
        return conn.reply(m.chat, `*❌ Error:* ${error.message}`, m, rcanal);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        // Reacción de error si no se puede obtener la información
        m.react('❌');
        return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
    }

    const h = info.title;
    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    try {
        // Reacción de espera sigue aquí para que el usuario vea que está en proceso
        await conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
        // Reacción de finalizado cuando el archivo se envía correctamente
        m.react('✅️');
        conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
    } catch (error) {
        // Reacción de error si ocurre un fallo al intentar enviar el archivo
        m.react('❌');
        conn.reply(m.chat, `*❌ Hubo un error al intentar enviar el archivo de la aplicación.*`, m, rcanal);
    }
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;*/


import gplay from 'google-play-scraper';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*🚩 Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

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

    conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
    m.react('✅️'); // Reacción de éxito
    conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;