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
        const infonya_gan = `*📖 Descrip꯭ción:*\n> ${tiktokData.data.title}*\n\n♡⑅*˖•. ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ .•˖*⑅♡
\n✧ Likes = ${tiktokData.data.digg_count}\n✧ Comentarios = ${tiktokData.data.comment_count}\n✧ Compartidas = ${tiktokData.data.share_count}\n✧ Vistas = ${tiktokData.data.play_count}\n✧ Descargas = ${tiktokData.data.download_count}\n꒷︶꒷꒥꒷‧૮꒰˵•ᵜ•˵꒱ა‧꒷︶꒷꒥꒷
\n\n*👤 Usu꯭ario:*\n   ᜊ ${tiktokData.data.author.nickname || "No info"}\n(${tiktokData.data.author.unique_id} - https://www.tiktok.com/@${tiktokData.data.author.unique_id})\n*🎧 Son꯭ido:*\n${tiktokData.data.music}`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "`DOWNLOAD - TIKTOK V2`" + `\n\n${infonya_gan}`, m);
            setTimeout(async () => {
                // Aquí se eliminó la línea que enviaba el audio
                 await conn.sendFile(m.chat, `${tiktokData.data.music}`, "lagutt.mp3", "", m);
            }, 1500);
        } else {
            throw m.reply("No se pudo descargar.");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok2'].map((v) => v + ' *<link>*')
handler.tags = ['descargas']
handler.command = /^(tiktok2|tt2|tt2dl)$/i;

handler.disable = false
handler.register = false
handler.limit = false

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}