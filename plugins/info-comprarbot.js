const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command = /^(comprarbot|comprar)$/i;
export default handler;

global.ComprarBot = `
〔 *SHADOW - BOT* 〕

*BOT PARA GRUPO* :
> wa.me/51927238856

*BOT PERZONALIZADO* :
> wa.me/51927238856
`;
