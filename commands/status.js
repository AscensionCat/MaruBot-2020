const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Durum")
    .setColor("#2bff00")
    .setThumbnail(bicon)
    .addField("Durum", `MaruBot ${bot.guilds.size} adet sunucuya ve ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya hizmet veriyor!`);

    return message.channel.send(botembed);
    }

module.exports.help = {
    name: "status"
}