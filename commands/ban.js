const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Buna yetkin yok");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Kişi bulunamadı!");
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.reply("nedenini yazmalısın");
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu kişi banlanamaz!")


    let banEmbed = new Discord.MessageEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banlanan kişi", `${bUser} with ID ${bUser.id}`)
        .addField("Şu kişi tarafından", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Şu kanalda", message.channel)
        .addField("Banlanma zamanı", message.createdAt)
        .addField("Banlanma nedeni", bReason);

    //let incidentchannel = message.guild.channels.find(`name`, "logs");
    let channel = message.guild.channels.cache.find(ch => ch.name === 'logs');
    if (!channel) {
        message.channel.send("logs kanalı bulunamadı.");
        return;
    }    
    message.channel.send(`${bUser}, kişisi banlandı!`);
    message.guild.member(bUser).ban(bUser, { reason: `bReason`});
    channel.send(banEmbed);
    }

module.exports.help = {
    name: "ban"
}