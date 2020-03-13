const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Bilgisi")
    .setColor("#32a8a4")
    .setThumbnail(sicon)
    .addField("Server adı", message.guild.name)
    .addField("Açılma tarihi", message.guild.createdAt)
    .addField("Katılma Tarihin", message.member.joinedAt)
    .addField("Kişi sayısı", message.guild.memberCount);

    return message.channel.send(serverembed);
}


module.exports.help = {
    name: "serverbilgi"
}