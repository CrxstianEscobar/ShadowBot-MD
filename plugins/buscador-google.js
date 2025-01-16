import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply('*Proporciona una consulta de búsqueda*');
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('Error al realizar la búsqueda.');
      return;
    }

    let replyMessage = '*Resultados de búsqueda:*\n\n';
    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `${index + 1}. ${item.title}\n`;
      replyMessage += `> *${item.description}*\n\n`;
      replyMessage += `   URL: ${item.url}\n\n`;
    });

m.react('✅')

    m.reply(replyMessage);
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    m.reply('Ocurrió un error al obtener los resultados.');
  }
};

handler.help = ['google *<texto>*']
handler.tags = ['internet']
handler.command = ['google'];

export default handler;