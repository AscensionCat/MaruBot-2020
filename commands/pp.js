const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const taggedUser = message.mentions.users.first();
  if (!message.mentions.users.size) {
          
    let ppembed = new Discord.MessageEmbed()
    .setDescription("Profil Fotoğrafın")
    .setColor("#fc9003")
    .setImage(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setTimestamp()
    return message.channel.send(ppembed);
  }
              
    let ppkembed = new Discord.MessageEmbed()
    .setDescription("<@" + taggedUser.id + "> kişisinin Profil Fotoğrafı ")
    .setColor("#fc9003")
    .setImage(taggedUser.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setTimestamp()
    return message.channel.send(ppkembed);

        // Send the user's avatar URL
      }
    
module.exports.help = {
    name: "pp"
}