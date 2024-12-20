import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
 m.reply(global.ficha);

handler.help = ['perfil']
handler.tags = ['rg']
handler.command = ['perfil', 'profile'] 
handler.register = true

export default handler

global.ficha = `🤕`;