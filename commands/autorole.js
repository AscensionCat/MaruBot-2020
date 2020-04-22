const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Buna yetkin yok!");
    if(!args[0] || args[0 == "help"]) return message.reply("Kullanımı: autorole @yapmak istediğin rol ");
    if(!args[0].startsWith("<@&")) return message.reply("Bir rol etiketlemelisin");

    let rol = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));

    rol[message.guild.id] = {
        rol: args.slice(0).join(' ')
    };

    fs.writeFile("./autorole.json", JSON.stringify(rol), (err) => {
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#8803fc")
    .setTitle("Autorole Set")
    .setDescription(`Otomatik verilecek rol ${args.slice(0).join(' ')} olarak değiştirildi`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "autorole"
}