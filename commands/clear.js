const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Buna Yetkin yok!!");
    const deleteCount = parseInt(args[0], 10);
        
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
//        message.reply("Example: " + prefix + "clear 10");
        message.reply("Lütfen 2 ile 100 arasında bir sayı gir");
        return;
    }
    
    let embed = new Discord.MessageEmbed()
        .setDescription("~Clear~")
        .setColor("#e56b00")
        .addField("Şu kadar mesajı sildi: ", `${deleteCount}`)
        .addField("Şu Kişi Tarafından Silindi", `<@${message.author.id}> Kişi ID si ${message.author.id}`)
        .addField("Şuradan silindi", message.channel)
        .addField("Silinme zamanı", message.createdAt);
    
    //let channel = message.guild.channels.find(`name`, "logs");
    let channel = message.guild.channels.cache.find(ch => ch.name === 'logs');
    if (!channel) {
        message.channel.send("Bunu kullanmak için 'logs' isimli yazı kanalı oluşturmalısın.");
        return;
    }
    
    const fetched = await message.channel.messages.fetch({ limit: deleteCount });
    channel.send(embed);
    message.channel
        .bulkDelete(fetched)
}

module.exports.help = {
    name: "clear"
}