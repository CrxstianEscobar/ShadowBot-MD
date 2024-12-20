import {search, download} from 'aptoide-scraper';

const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {


 if (!text) throw `x?`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `name ${data5.name}\nvx ${data5.package}\nxx ${data5.lastup}\nvv ${data5.size}`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: `${tradutor.texto3}`}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `jaja`;
  }    
};
handler.command = /^(apk|apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;
export default handler;
