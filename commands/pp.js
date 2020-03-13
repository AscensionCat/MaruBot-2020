const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const taggedUser = message.mentions.users.first();
  if (!message.mentions.users.size) {
          
    let ppembed = new Discord.RichEmbed()
    .setDescription("Profil Fotoğrafın")
    .setColor("#fc9003")
    .setImage(message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(ppembed);
  }
              
    let ppkembed = new Discord.RichEmbed()
    .setDescription("<@" + taggedUser.id + "> kişisinin Profil Fotoğrafı ")
    .setColor("#fc9003")
    .setImage(taggedUser.avatarURL)
    .setTimestamp()
    return message.channel.send(ppkembed);

        // Send the user's avatar URL
      }
    
module.exports.help = {
    name: "pp"
}