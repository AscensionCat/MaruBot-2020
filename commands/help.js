const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.MessageEmbed()
        .setDescription("Yardım")
        .setColor("#00f7ff")
        .setThumbnail(bicon)
        .addField("Önemli!!!", "`Botun düzgünce çalışabilmesi için logs isimli bir metin kanalı olmalıdır`")
        .addField("Müzik Komutları", "`play` `stop` `skip` `pause` `resume` `np` `queue` `volume`")
        .addField("Komutlar", "`çayver @etiket` `ping` `vote` `serverbilgi` \n \n `botbilgi` `yapımcı` `yaz yazdırmak istediğin şey` \n \n `pp @etiket` `yazıtura`")
        .addField("Gif Komutları", " `ağla` `ağlat @etiket` `nee` `öp @etiket` `sarıl @etiket` `yes`")
        .addField("YETKİLİ KOMUTLARI", " `autorole @roletiketi` `.prefix istediğinizprefix` \n \n `joinquitoda odaismi` `joinmesaj İstediğiniz Mesaj` \n \n `quitmesaj İsetediğiniz Mesaj` `clear sayı` \n \n `ban @etiket sebep` `kick @etiket sebep`");

        return message.channel.send(botembed);
    }

module.exports.help = {
    name: "help"
}