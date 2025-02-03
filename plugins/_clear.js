/*import fs from 'fs';

const paths = {
  ShadowJadiBot: `./${jadi}/`,
  ShadowSession: `./${sessions}/`
};

function cleanSubbotDirectories() {
  for (const [name, path] of Object.entries(paths)) {
    if (name === 'ShadowSession') continue; // Skip SanSession for this function

    fs.readdir(path, (err, subbotDirs) => {
      if (err) {
        return console.log(`No se puede escanear el directorio ${name}: ` + err);
      }

      let totalFilesDeleted = 0;

      subbotDirs.forEach((subbotDir) => {
        const subbotPath = `${path}${subbotDir}/`;

        fs.readdir(subbotPath, (err, files) => {
          if (err) {
            return console.log(`No se puede escanear el directorio ${subbotPath}: ` + err);
          }

          let filesDeleted = 0;
          const deletePromises = files.map((file) => {
            if (file !== 'creds.json') {
              return new Promise((resolve, reject) => {
                fs.unlink(`${subbotPath}${file}`, (err) => {
                  if (!err || err.code === 'ENOENT') {
                    filesDeleted++;
                    totalFilesDeleted++;
                    resolve();
                  } else {
                    reject(err);
                  }
                });
              });
            }
          });

          Promise.all(deletePromises).then(() => {
            if (filesDeleted > 0) {
              console.log(`Se eliminaron ${filesDeleted} archivos de la sesión Jadibot: ${subbotDir}`);
            }
          }).catch((err) => {
            console.log('Error al eliminar archivos: ' + err);
          });
        });
      });

      if (totalFilesDeleted === 0) {
        console.log(`0 Archivos eliminados en ${name}`);
      } else {
        console.log(`Se eliminaron un total de ${totalFilesDeleted} archivos de todas las sesiones Jadibot en ${name}`);
      }
    });
  }
}

function cleanShadowSession() {
  const sessionPath = paths.ShadowSession;

  fs.readdir(sessionPath, (err, files) => {
    if (err) {
      return console.log('No se puede escanear el directorio ShadowSession: ' + err);
    }

    let filesDeleted = 0;
    const deletePromises = files.map((file) => {
      if (file !== 'creds.json') {
        return new Promise((resolve, reject) => {
          fs.unlink(`${sessionPath}${file}`, (err) => {
            if (!err || err.code === 'ENOENT') {
              filesDeleted++;
              resolve();
            } else {
              reject(err);
            }
          });
        });
      }
    });

    Promise.all(deletePromises).then(() => {
      if (filesDeleted > 0) {
        console.log(`Se eliminaron ${filesDeleted} archivos de la sesión ShadowSession`);
      } else {
        console.log('0 Archivos eliminados en ShadowSession');
      }
    }).catch((err) => {
      console.log('Error al eliminar archivos: ' + err);
    });
  });
}

function displayNoFilesDeleted() {
  const noFilesDeletedInSessions = [];

  for (const [name, path] of Object.entries(paths)) {
    fs.readdir(path, (err, files) => {
      if (!err && files.length === 1 && files[0] === 'creds.json') {
        noFilesDeletedInSessions.push(name);
      }

      if (noFilesDeletedInSessions.length > 0) {
        console.log(`0 sesiones en: ${noFilesDeletedInSessions.join(', ')}`);
      }
    });
  }
}

setInterval(cleanSubbotDirectories, 60 * 1000);
setInterval(cleanShadowSession, 60 * 1000);
setInterval(displayNoFilesDeleted, 60 * 1000);

cleanSubbotDirectories();
cleanShadowSession();
displayNoFilesDeleted();*/




let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin}) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (chat.autoAceptar && !isAdmin) {
    if (!isBotAdmin) return !0
        const participants = await conn.groupRequestParticipantsList(m.chat)
        const latinPrefix = '5'
        const filteredParticipants = participants.filter(p => p.jid.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith(latinPrefix))
        for (const participant of filteredParticipants) {
            await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "approve")
        }
        if (m.messageStubType === 172 && m.messageStubParameters) {
            const [jid] = m.messageStubParameters
            if (jid.includes('@s.whatsapp.net') && jid.split('@')[0].startsWith(latinPrefix)) {
                await conn.groupRequestParticipantsUpdate(m.chat, [jid], "approve")}}
}}
export default handler