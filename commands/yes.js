const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  number = 50;
  imageNumber = Math.floor (Math.random() * (number - 1 + 1)) +1;
  message.channel.send ( {files: ["./Yes/" + imageNumber + ".gif"]} )
}

module.exports.help = {
    name: "yes"
}