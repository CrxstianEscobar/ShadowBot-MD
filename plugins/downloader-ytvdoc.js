// HECHO POR CRISTIAN ESCOBAR 🌙
/*
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*[ 🌙 ] Ingresa un número de DNI*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix}${command} 46027897`);

    // Verificar que el texto sea numérico
    if (!/^\d+$/.test(text)) return m.reply('Por favor ingresa un número de DNI válido.');

    // Enviar un "react" mientras se procesa la solicitud
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    // Definir el token de la API de RENIEC
    const token = 'apis-token-1.aTSI1U7KEuT-6bbbCguH-4Y8TI6KS73N';

    try {
        // Realizar la solicitud a la API de RENIEC para obtener los datos del DNI
        let response = await fetch(`https://api.apis.net.pe/v2/reniec/dni?numero=${text}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Referer': 'https://apis.net.pe/consulta-dni-api'
            }
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error de la API: ${errorData.message || 'Desconocido'}`);
        }

        // Obtener la respuesta en formato JSON
        let data = await response.json();

        // Verificar si la API devuelve un error o si no contiene datos
        if (data.error || !data.nombres) {
            return m.reply('No se encontraron datos para este DNI o el DNI no es válido.');
        }

        // Extraer la información relevante de la respuesta
        const nombre = data.nombres;
        const apellidos = `${data.apellidoPaterno || ''}${data.apellidoPaterno && data.apellidoMaterno ? ' ' : ''}${data.apellidoMaterno || ''}`;
        const fechaNacimiento = data.fechaNacimiento;

        // Formatear el mensaje para enviar los datos del DNI
        let message = `*💫 Datos del DNI ${text}:*\n`;
        message += `*Nombre:* ${nombre}\n`;
        message += `*Apellidos:* ${apellidos}\n`;
        message += `*Fecha de Nacimiento:* ${fechaNacimiento}`;

        // Enviar los datos del DNI al usuario
        await conn.sendMessage(m.chat, message);

        // Enviar una reacción de "check" cuando se complete la solicitud
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los datos:', error.message);
        m.reply('Hubo un problema al obtener los datos, intenta de nuevo más tarde. Error: ' + error.message);
    }
}

// Definición del comando y ayuda
handler.help = ['dnidox *<dni>*'];
handler.tags = ['información'];
handler.command = /^(dnidox)$/i;
handler.premium = false;
handler.rowner = true;
handler.register = true;

export default handler;*/

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*[ 😮‍💨 ] Ingresa un número de DNI*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix}${command} 46027897`);

    // Verificar que el texto sea numérico y tenga 8 dígitos (longitud típica del DNI en Perú)
    if (!/^\d{8}$/.test(text)) return m.reply('Por favor ingresa un número de DNI válido (8 dígitos).');

    // Enviar un "react" mientras se procesa la solicitud
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    // Obtener el token de la API desde las variables de entorno
    const token = process.env.RENIEC_API_TOKEN; // Asegúrate de definir esta variable en tu entorno

    if (!token) {
        return m.reply('No se ha encontrado el token de la API. Por favor, verifica la configuración.');
    }

    try {
        // Realizar la solicitud a la API de RENIEC para obtener los datos del DNI
        let response = await fetch(`https://api.apis.net.pe/v2/reniec/dni?numero=${text}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Referer': 'https://apis.net.pe/consulta-dni-api'
            }
        });

        // Verificar si la respuesta fue exitosa (código 200)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error de la API: ${errorData.message || 'Desconocido'} (Código: ${response.status})`);
        }

        // Obtener la respuesta en formato JSON
        let data = await response.json();

        // Verificar si la API devuelve un error o si no contiene datos
        if (data.error || !data.nombres) {
            return m.reply('No se encontraron datos para este DNI o el DNI no es válido.');
        }

        // Extraer la información relevante de la respuesta
        const nombre = data.nombres;
        const apellidos = `${data.apellidoPaterno || ''}${data.apellidoPaterno && data.apellidoMaterno ? ' ' : ''}${data.apellidoMaterno || ''}`;
        const fechaNacimiento = data.fechaNacimiento;

        // Formatear el mensaje para enviar los datos del DNI
        let message = `*💫 Datos del DNI ${text}:*\n`;
        message += `*Nombre:* ${nombre}\n`;
        message += `*Apellidos:* ${apellidos}\n`;
        message += `*Fecha de Nacimiento:* ${fechaNacimiento}`;

        // Enviar los datos del DNI al usuario
        await conn.sendMessage(m.chat, message);

        // Enviar una reacción de "check" cuando se complete la solicitud
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los datos:', error.message);
        m.reply('Hubo un problema al obtener los datos, intenta de nuevo más tarde. Error: ' + error.message);
    }
}

// Definición del comando y ayuda
handler.help = ['dnidox *<dni>*'];
handler.tags = ['información'];
handler.command = /^(dnidox)$/i;
handler.premium = false;
handler.rowner = true;
handler.register = true;

export default handler;