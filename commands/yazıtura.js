const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let x = Math.floor(Math.random() * 3) + 1
  if (x == 1) {
      message.channel.send(`<@${message.author.id}>, Yazı`)
  } else if (x == 2) {
   message.channel.send(`<@${message.author.id}>, Tura`)
  } else {
   message.channel.send(`<@${message.author.id}>, Olamaz! para dik durdu`)
  }
}
module.exports.help = {
    name: "yazıtura"
}