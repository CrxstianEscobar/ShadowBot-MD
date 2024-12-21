
/* ✨ DERECHOS RESERVADOS DEL AUTOR ✨ - WillZek (@NiñoPiña) */
import { googleIt } from '@bochilteam/scraper';
import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
  const text = args.join` `;
  if (!text) return conn.reply(m.chat, '*[🌠] Complementa tu petición con alguna frase para iniciar la búsqueda.*', m);

  try {
    const search = await googleIt(text);
    if (!search || !search.articles || search.articles.length === 0) {
      return conn.reply(m.chat, '*[🌠] No se encontraron resultados para tu búsqueda.*', m);
    }

    const msg = search.articles.map(({ title, url, description }) => {
      return `*${title}*\n_${url}_\n_${description}_`;
    }).join('\n\n');

    if (msg.length > 2000) {
      return conn.reply(m.chat, '*[🌠] El mensaje es demasiado largo. Intenta con una búsqueda más específica.*', m);
    }

    const url = 'https://google.com/search?q='' + encodeURIComponent(text);
    const ss = `(link unavailable);
    await conn.sendFile(m.chat, ss, 'error.png', url + '\n\n' + msg, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '*[🌠] Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.*', m);
  }
};

handler.help = ['google', 'googlef'].map((v) => v + ' <pencarian>');
handler.tags = ['tools', 'search'];
handler.command = /^googlef?$/i;

export default handler;