import {performance} from 'perf_hooks';
const handler = async (m, {conn, text}) => {
const start = performance.now();    
const end = performance.now();
const executionTime = (end - start);
async function loading() {
var hawemod = [
    "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "System hyjacking on process..\nConecting to Server error to find 404 ",
    "Device successfully connected...\nRiciving data...",
    "Data hyjacked from divice 100% completed\nkilling all evidence killing all malwares...",
    " HACKING COMPLETED ",
    " SENDING LOG DOCUMENTS...",
    " SUCCESSFULLY SENT DATA AND Connection disconnected",
    "*Nombre:* ${userName}\n*Ip:* 92.28.211.234\n*N:* 43 7462\n*W:* 12.4893\n*SS NUMBER:* 6979191519182016\n*IPV6:* fe80::5dcd::ef69::fb22::d9888%12 \n*UPNP:* Enabled\n*DMZ:* 10.112.42.15\n*MAC:* 5A:78:3E:7E:00\n*ISP:* Ucom universal \n*DNS:* 8.8.8.8\n*ALT DNS:* 1.1.1.1 \n*DNS SUFFIX:* Dlink\n*WAN:* 100.23.10.15\n*WAN TYPE:* private nat\n*GATEWAY:* 192.168.0.1\n*SUBNET MASK:* 255.255.0.255\n*UDP OPEN PORTS:* 8080, 80\n*TCP OPEN PORTS:* 443\n*ROUTER VENDEDOR:* ERICCSON\n*DEVICE VENDEDOR:* WIN32-X\n*CONNECTION TYPE:* TPLINK COMPANY\n*ICMPHOPS:* 192.168.0.1, 192.168.1.1, 100.73.43.4
host-132.12.32.167.ucom.com
host-132.12.111.ucom.com
36.134.67.189, 216.239.78.11
Sof02s32inf14.1e100.net
*HTTP:* 192.168.3.1:433-->92.28.211.234:80
*Http:* 192.168.625-->92.28.211.455:80
*Http:* 192.168.817-->92.28.211.8:971
*Upd:* 192.168.452-->92.28.211:7265288
*Tcp:* 192.168.682-->92.28.211:62227.7
*Tcp:* 192.168.725-->92.28.211:67wu2
*Tcp:* 192.168.629-->92.28.211.167:8615
*EXTERNAL MAC:* 6U:77:89:ER:O4
*MODEM JUMPS:* 64"
  ];
      let { key } = await conn.sendMessage(m.chat, {text: `*☠ ¡¡Starting doxxing!! ☠*`}, {quoted: m})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key}, {quoted: m}); 
  }     
 }
loading()    
};
handler.help = ['doxxing <nombre> | <@tag>'];
handler.tags = ['fun'];
handler.command = /^doxxing/i;
export default handler;

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}