require(`./config.js`)
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep } = require("./functions.js")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const axios = require("axios")
const fs = require("fs")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
const owner = JSON.parse(fs.readFileSync("./owner.json"))

module.exports = client = async (client, msg, chatUpdate, store) => {
try {
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = msg.quoted ? msg.quoted : msg
const mime = (quoted.msg || quoted).mimetype || ''
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof msg.text == 'string' ? msg.text : '')
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await client.groupMetadata(msg.chat).catch(e => {}) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isGroupAdmins = isGroup? groupAdmins.includes(msg.sender) : false
const botNumber = await client.decodeJid(client.user.id)
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const sender = msg.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (msg.key.participant || msg.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isOwner = owner.includes(senderNumber) || isBot
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const kays = (`Jam: ${jamwib} Menit: ${menitwib} Detik: ${detikwib}`)

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
    charactersLength));
    }
    return result
}

const reply = (teks) => {
client.sendMessage(from, { text : teks }, { quoted : msg })
}

if (isCmd && msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}

if (isCmd && !msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}

try {
ppuser = await client.profilePictureUrl(sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

let list = []
for (let i of owner) {
list.push({
displayName: await client.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await client.getName(i + '@s.whatsapp.net')}\n
FN:${await client.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

function khususOwner() {
let izi = "Kamu Siapa? Owner Ku Bukan ?? Kalau Bukan Jangan Gunain Command Ini Ya"
let buttons = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner' }, type: 1 }
]
client.sendButMessage(msg.chat, buttons, izi, ``, msg)
}

function khususGroup() {
reply("Maaf Fitur Ini Hanya Bisa Digunakan Di Group Chat")
}

const meki = await getBuffer(ppuser)

switch (command) {
case "menu": {
txt5 = `*BOT WHATSAPP BY ${nameGEDE}*

╭─⬣「 *LIST FITUR* 」⬣
│➥⬣.Owner
│➥⬣.IdGroup
│➥⬣.Join *Link Group*
│➥⬣.PushKontak *IdGroup|Teks*
│➥⬣.PushKontakv2 *Teks*
╰─⬣`
await client.sendMessage(from, { image: thumb, caption: txt5, mentions:[sender] },{quoted:msg})
}
break
case "owner":{
const repf = await client.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }}, { quoted: msg })
client.sendMessage(from,{text:`Hai Kak @${sender.split("@")[0]}, Itu Owner Ku Jangan Macam-macam Ya, Bytheway Jangan Galak-galak Ya.`,mentions:[sender]},{quoted:repf})
}
break
case "idgroup": {
if (!isOwner) return khususOwner()
let getGroups = await client.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await client.groupMetadata(x)
teks += `❏ *INFO GROUP*\n│⭔ *NAMA :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`
}
reply(teks + `Untuk Penggunaan Silahkan Ketik\nCommand ${prefix}pushkontak id|teks\n\nPOWER BY *© Fangz*`)
}
break
case "pushkontak":
if (!isOwner) return khususOwner()
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Menampilkan Id Group Silahkan Ketik .idgroup`)
await reply("*Wᴀɪᴛɪɴɢ... ɪɴ ᴘʀᴏɢʀᴇss‼️*\n_Sedang Mengirim Pesan Ke Seluruh Member GROUP 🔄_")
const hay = q.split("|")[1]
const groupMetadataa = !isGroup? await client.groupMetadata(`${q.split("|")[0]}`).catch(e => {}) : ""
const participantss = !isGroup? await groupMetadataa.participants : ""
const halls = await participantss.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
client.sendMessage(mem, { text: hay })
await sleep(2000)
}
reply("*SUCCESSFUL ✅*")
break
case "pushkontakv2":
if (!isOwner) return khususOwner()
if (!msg.isGroup) return reply(`Maaf Kak Fitur ${prefix+command} Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join linkgroup`)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
await reply("*Wᴀɪᴛɪɴɢ... ɪɴ ᴘʀᴏɢʀᴇss‼️*\n_Sedang Mengirim Pesan Ke Seluruh Member GROUP 🔄_")
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
client.sendMessage(men, { text: text })
await sleep(2000)
}
reply("*SUCCESSFUL ✅*")
break
case "join": {
if (!isOwner) return khususOwner()
if (!text) return reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await client.groupAcceptInvite(result).then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
default:
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
client.sendMessage("6282192728854@s.whatsapp.net", {text:e})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})