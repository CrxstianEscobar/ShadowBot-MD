const _0x5b4011 = _0x1e46;
(function (_0x5d5f48, _0x19a8da) {
  const _0x158a14 = _0x1e46,
    _0x3cfdf1 = _0x5d5f48();
  while (!![]) {
    try {
      const _0x1183ac = parseInt(_0x158a14(0x156)) / 0x1 + -parseInt(_0x158a14(0x14b)) / 0x2 + -parseInt(_0x158a14(0x159)) / 0x3 * (parseInt(_0x158a14(0x148)) / 0x4) + parseInt(_0x158a14(0x13d)) / 0x5 + -parseInt(_0x158a14(0x150)) / 0x6 + -parseInt(_0x158a14(0x15a)) / 0x7 * (-parseInt(_0x158a14(0x14c)) / 0x8) + parseInt(_0x158a14(0x151)) / 0x9 * (-parseInt(_0x158a14(0x15c)) / 0xa);
      if (_0x1183ac === _0x19a8da) break;
      else _0x3cfdf1['push'](_0x3cfdf1['shift']());
    } catch (_0x2b24bf) {
      _0x3cfdf1['push'](_0x3cfdf1['shift']());
    }
  }
}(_0x2d65, 0x8b32d));

import _0x19a3e4 from 'node-fetch';

function _0x1e46(_0x301c1c, _0x5d24cd) {
  const _0x2d65df = _0x2d65();
  return _0x1e46 = function (_0x1e46ec, _0x23712a) {
    _0x1e46ec = _0x1e46ec - 0x136;
    let _0x3f6ee7 = _0x2d65df[_0x1e46ec];
    return _0x3f6ee7;
  }, _0x1e46(_0x301c1c, _0x5d24cd);
}

const handler = async (_0x5b04ea, {
  conn: _0x24d45b,
  command: _0x38ad25,
  text: _0x29b0ac,
  isAdmin: _0x9e35ac
}) => {
  const _0x267b7e = _0x1e46;

  if (_0x38ad25 === _0x267b7e(0x139)) {
    if (!_0x9e35ac) throw'💌\x20*Solo\x20un\x20administrador\x20puede\x20ejecutar\x20este\x20comando';const _0x45f556=global['owner'][0x0][0x0]+_0x267b7e(0x140);if(_0x5b04ea[_0x267b7e(0x13e)][0x0]===_0x45f556)throw _0x267b7e(0x158);let _0x329969=_0x5b04ea[_0x267b7e(0x13e)][0x0]?_0x5b04ea['mentionedJid'][0x0]:_0x5b04ea[_0x267b7e(0x154)]?_0x5b04ea[_0x267b7e(0x154)][_0x267b7e(0x142)]:_0x29b0ac;if(_0x329969===_0x24d45b[_0x267b7e(0x136)][_0x267b7e(0x153)])throw _0x267b7e(0x144);const _0xeea06e=await _0x24d45b[_0x267b7e(0x14e)](_0x5b04ea['chat']),_0x69b64a=_0xeea06e[_0x267b7e(0x15e)]||_0x5b04ea[_0x267b7e(0x152)]['split']`-`[0x0]+_0x267b7e(0x140);if(_0x5b04ea[_0x267b7e(0x13e)][0x0]===_0x69b64a)throw _0x267b7e(0x14f);let _0xc6ae1d=global['db'][_0x267b7e(0x15b)][_0x267b7e(0x15d)][_0x329969],_0x3d4fa1={'key':{'participants':_0x267b7e(0x146),'fromMe':![],'id':_0x267b7e(0x13b)},'message':{'locationMessage':{'name':_0x267b7e(0x13c),'jpegThumbnail':await(await _0x19a3e4('https://telegra.ph/file/f8324d9798fa2ed2317bc.png'))['buffer'](),'vcard':'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD'}},'participant':_0x267b7e(0x146)},_0x1385c9=_0x267b7e(0x14a);if(!_0x5b04ea[_0x267b7e(0x13e)][0x0]&&!_0x5b04ea['quoted'])return _0x24d45b[_0x267b7e(0x141)](_0x5b04ea['chat'],_0x1385c9,_0x5b04ea);if(_0xc6ae1d[_0x267b7e(0x13a)]===!![])throw _0x267b7e(0x14d);_0x24d45b['reply'](_0x5b04ea[_0x267b7e(0x152)],_0x267b7e(0x137),_0x3d4fa1,null,{'mentions':[_0x329969]}),global['db'][_0x267b7e(0x15b)][_0x267b7e(0x15d)][_0x329969][_0x267b7e(0x13a)]=!![];}else{if(_0x38ad25===_0x267b7e(0x147)){if(!_0x9e35ac)throw _0x5b04ea[_0x267b7e(0x141)](_0x267b7e(0x155));let _0x12128f=_0x5b04ea['mentionedJid'][0x0]?_0x5b04ea[_0x267b7e(0x13e)][0x0]:_0x5b04ea[_0x267b7e(0x154)]?_0x5b04ea[_0x267b7e(0x154)][_0x267b7e(0x142)]:_0x29b0ac,_0x498844=global['db'][_0x267b7e(0x15b)]['users'][_0x12128f],_0x2d1dfb={'key':{'participants':_0x267b7e(0x146),'fromMe':![],'id':_0x267b7e(0x13b)},'message':{'locationMessage':{'name':_0x267b7e(0x143),'jpegThumbnail':await(await _0x19a3e4('https://telegra.ph/file/aea704d0b242b8c41bf15.png'))['buffer'](),'vcard':_0x267b7e(0x138)}},'participant':_0x267b7e(0x146)},_0x294b70=_0x267b7e(0x13f);if(_0x12128f===_0x5b04ea[_0x267b7e(0x142)])throw _0x267b7e(0x157);if(!_0x5b04ea['mentionedJid'][0x0]&&!_0x5b04ea[_0x267b7e(0x154)])return _0x24d45b[_0x267b7e(0x141)](_0x5b04ea[_0x267b7e(0x152)],_0x294b70,_0x5b04ea);if(_0x498844[_0x267b7e(0x13a)]===![])throw _0x267b7e(0x149);global['db'][_0x267b7e(0x15b)][_0x267b7e(0x15d)][_0x12128f][_0x267b7e(0x13a)]=![],_0x24d45b[_0x267b7e(0x141)](_0x5b04ea[_0x267b7e(0x152)],'*Tus\x20mensajes\x20no\x20serán\x20eliminados*',_0x2d1dfb,null,{'mentions':[_0x12128f]});}}};function _0x2d65(){const _0x1338ed=['✨️\x20*Sólo\x20otro\x20administrador\x20puede\x20desmutarte*','👑\x20*El\x20creador\x20del\x20bot\x20no\x20puede\x20ser\x20mutado*','129PEBBUv','51289OMfQvC','data','9070eQsjRl','users','owner','user','*Tus\x20mensajes\x20serán\x20eliminados*','BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD','mute','muto','Halo','𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20𝗺𝘂𝘁𝗮𝗱𝗼','3136705kmgDtk','mentionedJid','🥀\x20*Menciona\x20a\x20la\x20persona\x20que\x20deseas\x20demutar*','@s.whatsapp.net','reply','sender','𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼','🚩\x20*No\x20puedes\x20mutar\x20el\x20bot*','group','0@s.whatsapp.net','unmute','14340DPskXA','☁️\x20*Este\x20usuario\x20no\x20ha\x20sido\x20mutado*','🥀\x20*Menciona\x20a\x20la\x20persona\x20que\x20deseas\x20mutar*','472398wcTpbo','848XQksSy','💡\x20*Este\x20usuario\x20ya\x20ha\x20sido\x20mutado*','groupMetadata','👑\x20*No\x20puedes\x20mutar\x20el\x20creador\x20del\x20grupo*','6547128nviniQ','3051obNcjV','chat','jid','quoted','💭\x20*Solo\x20un\x20administrador\x20puede\x20ejecutar\x20este\x20comando','955169UoGRsU'];_0x2d65=function(){return _0x1338ed;};return _0x2d65();}handler['command']=['mute','unmute'],handler[_0x5b4011(0x145)]=!![],handler['admin']=!![],handler['botAdmin']=!![];export default handler;
