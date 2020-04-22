const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Buna yetkin yok!");
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Kişi bulunamadı!");
  let bReason = args.join(" ").slice(22);
  if(!bReason) return message.reply("nedenini yazmalısın");
  if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu kişi atılamaz")


  let banEmbed = new Discord.MessageEmbed()
      .setDescription("~Kick~")
      .setColor("#bc0000")
      .addField("Şu kişi", `${bUser} with ID ${bUser.id}`)
      .addField("Şu kişi tarafından", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Zamanı", message.createdAt)
      .addField("Nedeni", bReason);

  //let incidentchannel = message.guild.channels.find(`name`, "logs");
  let channel = message.guild.channels.cache.find(ch => ch.name === 'logs');
  if (!channel) {
      message.channel.send("Can't find a 'logs' channel.");
      return;
  }
  message.channel.send(`${bUser}, kişisi atıldı!`);
  message.guild.member(bUser).kick(bReason);
  channel.send(banEmbed);
}

module.exports.help = {
    name: "kick"
}