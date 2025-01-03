/*var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = 'https://qu.ax/kgzBh.jpg';
    const groupAdmins = participants.filter(p => p.admin);
    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    // Verificar si se ingresaron suficientes argumentos (hora y modalidad)
    if (args.length < 2) return m.reply('➤ `𝗔𝗩𝗜𝗦𝗢` 💫\n\n*INGRESA UNA HORA Y UNA MODALIDAD*\n_Ejemplo: .4vs4infimasc 10:00 Infinito_');

    const hora = args[0]; // Primer texto (hora)
    const modalidad = args.slice(1).join(' '); // Segundo texto (modalidad), puede contener más de una palabra

    m.react('🎮');

    let yo = `│🕓 𝗛𝗢𝗥𝗔: *${hora}*`;
    let modo = `│🎮 𝗠𝗢𝗗𝗔𝗟𝗜𝗗𝗔𝗗: *${modalidad}*`;

    let texto = `
╭──────>⋆☽⋆ 💫 ⋆☾⋆<──────╮
ㅤ          •𝟰  𝗩 𝗘 𝗥 𝗦 𝗨 𝗦  𝟰•
                    *${groupMetadata.subject}*
╰──────>⋆☽⋆ 💫 ⋆☾⋆<──────╯


╭──────>⋆☽⋆ 💫 ⋆☾⋆<──────╮
${yo}
${modo}
│
│ㅤʚ 𝗝𝗨𝗚𝗔𝗗𝗢𝗥𝗘𝗦: 
│☁️ ➤ 
│☁️ ➤ 
│☁️ ➤ 
│☁️ ➤ 
│
│ㅤʚ 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦:
│☁️ ➤ 
│☁️ ➤ 
│
│ㅤʚ 𝗗𝗢𝗡𝗔𝗗𝗢𝗥 𝗗𝗘 𝗦𝗔𝗟𝗔:
│☁️ ➤
╰──────>⋆☽⋆ 💫 ⋆☾⋆<──────╯`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}
handler.help = ['4vs4infimasc <hora> <modalidad>']
handler.tags = ['ffvs']
handler.command = /^(4x4infimasc|4vs4infimasc|4vs4)$/i
handler.admin = true
handler.group = true

export default handler*/


const handler = async (m, { conn, participants, groupMetadata, args, text }) => {
  const pp = 'https://qu.ax/kgzBh.jpg';
  const groupAdmins = participants.filter(p => p.admin);
  const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  // Verificar si se ingresaron suficientes argumentos (hora y modalidad)
  if (args.length < 2) return m.reply('➤ `𝗔𝗩𝗜𝗦𝗢` 💫\n\n*INGRESA UNA HORA Y UNA MODALIDAD*\n_Ejemplo: .4vs4infimasc 10:00 Infinito_');

  const hora = args[0]; // Primer texto (hora)
  const modalidad = args.slice(1).join(' '); // Segundo texto (modalidad), puede contener más de una palabra

  m.react('🎮');

  // Sumar 2 horas a la hora original
  const sumaHoras = (hora) => {
    const [horas, minutos] = hora.split(":");
    const nuevaHora = new Date();
    nuevaHora.setHours(parseInt(horas) + 2);
    nuevaHora.setMinutes(parseInt(minutos));
    const nuevaHoraFormateada = `${nuevaHora.getHours()}:${nuevaHora.getMinutes()}`;
    return nuevaHoraFormateada;
  };

  const horaMasDos = sumaHoras(hora);

  let yo = `│🕓 𝗛𝗢𝗥𝗔: *${hora}*`;
  let yoMasDos = `│🕓 𝗛𝗢𝗥𝗔 +2: *${horaMasDos}*`;
  let modo = `│🎮 𝗠𝗢𝗗𝗔𝗟𝗜𝗗𝗔𝗗: *${modalidad}*`;

  let texto = ` ╭──────>⋆☽⋆ 💫 ⋆☾⋆<──────╮
 ㅤ •𝟰 𝗩 𝗘 𝗥 𝗦 𝗨 𝗦 𝟰• *${groupMetadata.subject}*
 ╰──────>⋆☽⋆ 💫 ⋆☾⋆<──────╯
 ╭──────>⋆☽⋆ 💫 ⋆☾⋆<──────╮
 ${yo}
 ${yoMasDos}
 ${modo}
 │ │ㅤʚ 𝗝𝗨𝗚𝗔𝗗𝗢𝗥𝗘𝗦:
 │☁️ ➤ │☁️ ➤ │☁️ ➤ │☁️ ➤ │
 │ │ㅤʚ 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦:
 │☁️ ➤ │☁️ ➤ │
 │ │ㅤʚ 𝗗𝗢𝗡𝗔𝗗𝗢𝗥 𝗗𝗘 𝗦𝗔𝗟𝗔:
 │☁️ ➤
 ╰──────>⋆☽⋆ 💫 ⋆☾⋆<──────╯`.trim();

conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

handler.help = ['4vs4infimasc <hora> <modalidad>'];
handler.tags = ['ffvs'];
handler.command = /^(4x4infimasc|4vs4infimasc|4vs4)$/i;
handler.admin = true;
handler.group = true;

export default handler;
