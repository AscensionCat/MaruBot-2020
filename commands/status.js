const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    let botembed = new Discord.MessageEmbed()
    .setDescription("Durum")
    .setColor("#2bff00")
    .setThumbnail(bicon)
    .addField("Durum", `MaruBot ${bot.guilds.cache.size} adet sunucuya ve ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya hizmet veriyor!`);

    return message.channel.send(botembed);
    }

module.exports.help = {
    name: "status"
}