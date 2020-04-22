const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bicon = bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Bilgisi")
        .setColor("#2bff00")
        .setThumbnail(bicon)
        .addField("Bot ismi", bot.user.username)
        .addField("Yapılma tarihi", bot.user.createdAt);

        return message.channel.send(botembed);
    }

module.exports.help = {
    name: "botbilgi"
}