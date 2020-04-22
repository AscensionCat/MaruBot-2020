const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Buna yetkin yok!");
    if(!args[0] || args[0 == "help"]) return message.reply("Kullanımı: joinquitoda yapmakistediğinodanınismi");

    let oda = JSON.parse(fs.readFileSync("./joinquitoda.json", "utf8"));

    oda[message.guild.id] = {
        oda: args[0]
    };

    fs.writeFile("./joinquitoda.json", JSON.stringify(oda), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#03dbfc")
    .setTitle("Join quit mesaj kanalı ayarlama")
    .setDescription(`Join Quit mesaj kanalı ${args[0]} olarak değiştirildi`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "joinquitoda"
}