const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Buna yetkin yok!");
    if(!args[0] || args[0 == "help"]) return message.reply("Kullanımı: .prefix yapmakistediğin");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#FF9900")
    .setTitle("Prefix Set")
    .setDescription(`Prefix ${args[0]} olarak değiştirildi`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "prefix"
}