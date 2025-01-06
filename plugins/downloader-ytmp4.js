Aquí te dejo una versión modificada de tu código que incluye reacciones de espera y finalizado:

```
/* 
 *❀ By JTxs* 
[ Canal Principal ] : (link unavailable) 
[ Canal Rikka Takanashi Bot ] : (link unavailable) 
[ Canal StarlightsTeam] : (link unavailable) 
[ HasumiBot FreeCodes ] : (link unavailable) 
*/

// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)
    
    await conn.react(m.chat, '⏳️') // reacción de espera
    
    try {
        let api = await fetch(`https://axeel.my.id/api/download/video?url=$`)
        let json = await api.json()
        
        let { title, views, likes, description, author } = json.metadata
        
        let HS = `- *Titulo :* ${title} 
- *Descripcion :* ${description} 
- *Visitas :* ${views} 
- *Likes :* ${likes} 
- *Autor :* ${author} 
- *Tamaño :* ${json.downloads.size} `
        
        await conn.sendFile(m.chat, json.downloads.url, 'HasumiBotFreeCodes.mp4', HS, m)
        
        await conn.react(m.chat, '✔️') // reacción de finalizado
    } catch (error) {
        console.error(error)
        await conn.reply(m.chat, '❌ Error al descargar el video', m)
    }
}

handler.command = /^(ytmp4)$/i

export default handler
```