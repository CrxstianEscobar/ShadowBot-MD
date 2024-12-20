import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
 m.reply(global.ficha);

handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler

global.ficha = `🤕`;