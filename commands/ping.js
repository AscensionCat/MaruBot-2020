const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send({embed: {
    color: 0x2ed32e,
    fields: [{
        name: "Pong",
        value: "Pingim: " + Math.round(bot.ping) + ' ms'
  }
 ],
}
})
    }

module.exports.help = {
    name: "ping"
}