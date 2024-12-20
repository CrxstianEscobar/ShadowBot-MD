import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*[ ℹ️ ] Ingrese un link de TikTok*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} https://vm.tiktok.com/ZMhAk8tLx/_`);
    }

    try {
        await conn.reply(m.chat, "*[ ⛄ ] Espere un momento, estoy descargando su video...*", m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData) {
            throw m.reply("Error api!");
        }

        const videoURL = tiktokData.data.play;
        const videoURLWatermark = tiktokData.data.wmplay;
        const infonya_gan = `‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊ ♡ °̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ °̩̥˚̩̩̥͙°̩̥ ♡ ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊\n> _Sʜᴀᴅᴏᴡ Bᴏᴛ MD ☃️_\n`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "`DOWNLOADER - TIKTOK`" + `\n\n${infonya_gan}`, m);
            setTimeout(async () => {
            }, 1500);
        } else {
            throw m.reply("No se pudo descargar.");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*')
handler.tags = ['descargas']
handler.command = /^(tt|tiktok)$/i;

handler.disable = false
handler.register = false
handler.limit = false

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}