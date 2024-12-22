const handler = async (m, { conn, args }) => {
    if (args.length < 3) {
        conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM), AM/PM, y el país (MX, CO, CL, AR, PE, EC).', m);
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
        MX: -1, // UTC-6
        CO: 0,  // UTC-5
        CL: 2,  // UTC-4
        AR: 2,  // UTC-3
        PE: 0,  // UTC-5
        EC: 0   // UTC-5
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina, PE para Perú o EC para Ecuador.', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];

    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });

    const horasEnPais = {
        MX: '',
        CO: '',
        CL: '',
        AR: '',
        PE: '',
        EC: ''
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

    const message = `╭──────>⋆☽⋆ 🆚 ⋆☾⋆<──────╮
ㅤ          •6  𝗩 𝗘 𝗥 𝗦 𝗨 𝗦  6•           
╰──────>⋆☽⋆ 🆚 ⋆☾⋆<──────╯

╭──────>⋆☽⋆ 🔥 ⋆☾⋆<──────╮
│⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎:
│🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horasEnPais.MX}
│🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horasEnPais.CO}
│🇵🇪 𝐏𝐄𝐑𝐔 : ${horasEnPais.PE}
│🇪🇨 𝐄𝐂𝐔𝐀𝐃𝐎𝐑 : ${horasEnPais.EC}
│🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horasEnPais.CL}
│🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horasEnPais.AR}
│
│ㅤʚ 𝗝𝗨𝗚𝗔𝗗𝗢𝗥𝗘𝗦: 
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤
│⚜️ ➤
│
│ㅤʚ 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦:
│⚜️ ➤ 
│⚜️ ➤ 
│
│ㅤʚ 𝗗𝗢𝗡𝗔𝗗𝗢𝗥 𝗗𝗘 𝗦𝗔𝗟𝗔:
│🫂 ➤
╰──────>⋆☽⋆ 🔥 ⋆☾⋆<──────╯
`.trim();
    
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};
handler.help = ['tesis2']
handler.tags = ['ff']
handler.command = /^(tesis2)$/i
export default handler;