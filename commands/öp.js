const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        const taggedUser = message.mentions.users.first();
      if (!message.mentions.users.size) {
        return;
      }
        number = 50;
        imageNumber = Math.floor (Math.random() * (number - 1 + 1)) +1;
        //msg.channel.send ("")
        message.channel.send ( {files: ["./Kiss/" + imageNumber + ".gif"]} )
        //msg.channel.send ("<@" + msg.author.id + "> Şu kişiyi ağlatıyor <@" + taggedUser.id + ">");
        message.channel.send({embed: {
        color: 0x2ed32e,
        fields: [{
            name: "Öpüldün!",
            value: "<@" + message.author.id + "> Şu kişiyi öptü <@" + taggedUser.id + ">"
      }
      ],
    }
    })
    }

module.exports.help = {
    name: "öp"
}