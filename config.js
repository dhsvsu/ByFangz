const chalk = require("chalk")
const fs = require("fs")

global.ownerNumber = ["6283192328920@s.whatsapp.net"]
global.nomerOwner = "6283192328920"
global.nomorOwner = ['6283192328920']
global.nameGEDE = "Fangz"
global.namaDeveloper = "Fangz"
global.namaBot = "Fangz WhatsApp"
global.thumb = fs.readFileSync("./thumb.png")

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})

/*

Thanks To By KirBotz
Base Ori By KirBotz
Ubah Nomor Owner?
Ganti Di File ./owner.json
Harap Jangan Jual Sc Ini
Karena Sc Ini Free Langsung Dari
Youtube : https://youtube.com/@kangbotwhatsapp

*/