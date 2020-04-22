const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      
    let çayembed = new Discord.MessageEmbed()
    .setDescription("Çaylaaaar!")
    .setColor("#32a8a4")
    .setImage("http://ozcekim.com.tr/wp-content/uploads/2018/04/kapak_cay-1-780x400.jpg")
    .setTimestamp()

    return message.channel.send(çayembed);
    }
      let çayiembed = new Discord.MessageEmbed()
      .setDescription("<@" + taggedUser.id + "> kişisine çay ikram ettin")
      .setColor("#32a8a4")
      .setImage("http://ozcekim.com.tr/wp-content/uploads/2018/04/kapak_cay-1-780x400.jpg")
      .setTimestamp()
  
      return message.channel.send(çayiembed);
    }

module.exports.help = {
    name: "çayver"
}