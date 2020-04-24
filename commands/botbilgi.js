const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
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