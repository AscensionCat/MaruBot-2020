const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    function duration (ms) {
        const saniye = Math.floor((ms / 1000) % 60).toString()
        const dakika = Math.floor((ms / (1000 * 60)) % 60).toString()
        const saat = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const gun = Math.floor((ms / (1000 * 60 *60 *24)) %60).toString()
        return `${gun.padStart(1, '0')} gün, ${saat.padStart(2, '0')} saat, ${dakika.padStart(2, '0')} dakika, ${saniye.padStart(2, '0')} saniye`
    }

    message.channel.send(`${duration(client.uptime)}dir açığım`);

    }

module.exports.help = {
    name: "uptime"
}