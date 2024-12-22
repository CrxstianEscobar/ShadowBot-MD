const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 3) {
        conn.reply(m.chat, '*[ ℹ️ ] Proporciona la hora y el pais.*\n*Usa Ar para Argentina y Pe para Perú.*\n\n*[ 💡 ] Ejemplo:*
${usedPrefix + command} 10:00 am pe', m);
        return;
    }

    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, 'Formato de hora incorrecto. Debe ser HH:MM en formato de 12 horas.', m);
        return;
    }

    const horaUsuario = args[0];
    const ampm = args[1].toUpperCase();
    const pais = args[2].toUpperCase();

    if (!['AM', 'PM'].includes(ampm)) {
        conn.reply(m.chat, 'Formato AM/PM incorrecto. Debe ser AM o PM.', m);
        return;
    }

    let [hora, minutos] = horaUsuario.split(':').map(Number);
    if (ampm === 'PM' && hora !== 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;

    const diferenciasHorarias = {
        CL: 2,  // UTC-4
        AR: 2,  // UTC-3
        PE: 0,  // UTC-5
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa AR para Argentina, PE para Perú.', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];

    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });

    const horasEnPais = {
        CL: '',
        AR: '',
        PE: ''
    };

    for (const key in diferenciasHorarias) {
        const horaActual = new Date();
        horaActual.setHours(hora);
        horaActual.setMinutes(minutos);
        horaActual.setSeconds(0);
        horaActual.setMilliseconds(0);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));
        horasEnPais[key] = formatTime(horaEnPais);
    }

    const message = `ㅤㅤ•──⪻ *_VS FEM_* ⪼──•
╭─────━━━━────── •••
» *🍨꒱ Modalidad:* 4vs4
» *⏰꒱ Horario:*
╎  • *Perú:* ${horasEnPais.PE}
╎  • *Arg:* ${horasEnPais.AR}
╰◣◥◣◥◤◢◤◢◣◥◣◥◤
ㅤ _ʚ Jugadoras:_ ᭡
💋 • 
💋 • 
💋 • 
💋 • 
ㅤ _ʚ Suplentes:_ ᭡
💋 • 
💋 • 

> By Shadow Bot - MD
`.trim();
    
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};
handler.help = ['tesis2']
handler.tags = ['ff']
handler.command = /^(tesis2)$/i
export default handler;