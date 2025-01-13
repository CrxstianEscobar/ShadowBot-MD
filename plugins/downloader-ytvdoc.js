import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*[ 🌷 ] Ingresa un número de DNI*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix}${command} 46027897`);

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

        // Obtener la respuesta en formato JSON
        let data = await response.json();

        // Si hay un error en la API, enviar un mensaje de error
        if (data.error) {
            return m.reply('No se encontraron datos para este DNI.');
        }

        // Extraer la información relevante de la respuesta
        const nombre = data.nombres;
        const apellidos = `${data.apellidoPaterno} ${data.apellidoMaterno}`;
        const fechaNacimiento = data.fechaNacimiento;

        // Enviar los datos al usuario
        let message = `*💫 Datos del DNI ${text}:*\n`;
        message += `*Nombre:* ${nombre}\n`;
        message += `*Apellidos:* ${apellidos}\n`;
        message += `*Fecha de Nacimiento:* ${fechaNacimiento}`;

        await conn.sendMessage(m.chat, message);

        // Enviar una reacción de "check" cuando se complete la solicitud
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error(error);
        m.reply('Hubo un problema al obtener los datos, intenta de nuevo más tarde.');
    }
}

handler.help = ['dnisearch *<dni>*'];
handler.tags = ['información'];
handler.command = /^(dnisearch)$/i;
handler.premium = false;
handler.register = true;

export default handler;