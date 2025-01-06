const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const fs = require('fs');
const { Buffer } = require('buffer');
const fetch = require('node-fetch');

// Variables globales y configuraciones
const GROUP_ADMIN_ROLE = 'admin';  // Cambia según el rol necesario
const OWNER_NUMBER = 'xxxxxxxxxx@s.whatsapp.net'; // Cambia al número del propietario del bot

// Inicializar autenticación y crear la conexión a WhatsApp
async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,  // Muestra el QR en la terminal para escanear
    });

    sock.ev.on('creds.update', saveCreds);  // Guarda las credenciales automáticamente

    // Evento de nuevos mensajes
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        const messageContent = msg.message?.conversation?.toLowerCase();
        
        if (messageContent === 'mute' && isAdmin(msg)) {
            let userToMute = extractUserFromMessage(msg);
            if (userToMute) {
                await muteUser(sock, userToMute, msg);
            } else {
                sock.sendMessage(msg.key.remoteJid, { text: 'Por favor, menciona al usuario que quieres mutear.' });
            }
        } else if (messageContent === 'unmute' && isAdmin(msg)) {
            let userToUnmute = extractUserFromMessage(msg);
            if (userToUnmute) {
                await unmuteUser(sock, userToUnmute, msg);
            } else {
                sock.sendMessage(msg.key.remoteJid, { text: 'Por favor, menciona al usuario que quieres desmutear.' });
            }
        }
    });

    // Función para verificar si el usuario es administrador
    function isAdmin(msg) {
        return msg.key.fromMe || msg.key.remoteJid === OWNER_NUMBER;  // Solo el bot o el propietario pueden ejecutar los comandos
    }

    // Extraer el JID de usuario mencionado en el mensaje
    function extractUserFromMessage(msg) {
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid) {
            return msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        return null;
    }

    // Función para mutear al usuario
    async function muteUser(sock, userJid, msg) {
        try {
            // Usar la función groupParticipantsUpdate para mutear al usuario
            await sock.groupParticipantsUpdate(msg.key.remoteJid, [userJid], 'mute');
            sock.sendMessage(msg.key.remoteJid, { text: `El usuario ${userJid} ha sido muteado.` });
        } catch (error) {
            console.error('Error al mutear:', error);
            sock.sendMessage(msg.key.remoteJid, { text: 'No se pudo mutear al usuario.' });
        }
    }

    // Función para desmutear al usuario
    async function unmuteUser(sock, userJid, msg) {
        try {
            // Usar la función groupParticipantsUpdate para desmutear al usuario
            await sock.groupParticipantsUpdate(msg.key.remoteJid, [userJid], 'unmute');
            sock.sendMessage(msg.key.remoteJid, { text: `El usuario ${userJid} ha sido desmuteado.` });
        } catch (error) {
            console.error('Error al desmutear:', error);
            sock.sendMessage(msg.key.remoteJid, { text: 'No se pudo desmutear al usuario.' });
        }
    }

    // Función para enviar mensajes de tipo "locationMessage"
    async function sendLocationMessage(sock, chatId) {
        const locationMessage = {
            locationMessage: {
                name: 'Nombre del Lugar',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
            },
        };
        sock.sendMessage(chatId, locationMessage);
    }
}

// Iniciar el bot
startBot();