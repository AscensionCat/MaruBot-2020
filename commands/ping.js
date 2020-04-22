const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging....`);
    msg.edit({embed: {
    color: 0x2ed32e,
    fields: [{
        name: "🏓 Pong!",
        value: `Pingim: ${Math.floor(msg.createdAt - message.createdAt)}ms \nAPI pingi: ${Math.round(bot.ws.ping)}ms`
  }
 ],
}
})
    }

module.exports.help = {
    name: "ping"
}