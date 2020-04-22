const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Buna yetkin yok!");
    if(!args[0] || args[0 == "help"]) return message.reply("Kullanımı: quitmesaj yapmakistediğinmesaj");

    let mesaj = JSON.parse(fs.readFileSync("./quitmesaj.json", "utf8"));

    mesaj[message.guild.id] = {
        mesaj: args.slice(0).join(' ')
    };

    fs.writeFile("./quitmesaj.json", JSON.stringify(mesaj), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#fc0314")
    .setTitle("Quit mesajı ayarlama")
    .setDescription(`quit mesajı ${args.slice(0).join(' ')} olarak değiştirildi`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "quitmesaj"
}