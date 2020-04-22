const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Buna yetkin yok!");
    if(!args[0] || args[0 == "help"]) return message.reply("Kullanımı: joinmesaj yapmakistediğinmesaj");

    let mesaj = JSON.parse(fs.readFileSync("./joinmesaj.json", "utf8"));

    mesaj[message.guild.id] = {
        mesaj: args.slice(0).join(' ')
    };

    fs.writeFile("./joinmesaj.json", JSON.stringify(mesaj), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#03fc3d")
    .setTitle("Join mesajı ayarlama")
    .setDescription(`join mesajı ${args.slice(0).join(' ')} olarak değiştirildi`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "joinmesaj"
}