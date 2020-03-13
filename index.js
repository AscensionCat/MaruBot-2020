const { token, prefix, GOOGLE_API_KEY } = require("./botconfig.json");
const botconfig = require("./botconfig.json")
const Discord= require("discord.js");
const Util = require ("discord.js");
const fs = require("fs");
const ms = require("ms");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const opus = require("opusscript");
const bot = new Discord.Client({disableEveryone: true});
const DBL = require("dblapi.js");
const express = require('express');
bot.commands = new Discord.Collection();
const youtube = new YouTube(GOOGLE_API_KEY);

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    
    bot.user.setActivity(`.help`, {type: "PLAYING"});

}); 

const app = express();
app.use(express.static('public'));

var server = require('http').createServer(app);

const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc1NzQ3MDg0NjY4MTA5OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY3ODQ2NzEyfQ.pjm0czFmyUWt819x8p1Yn-DWh7NzSuyYdRiQlRlnF2c', { webhookServer: listener, webhookAuth: 'ajanyusuf2004' }, bot);

var path = require("path");

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const queue = new Map();

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => console.log('Yo this is ready'));

bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

bot.on('guildMemberAdd', member => {

    let joinquitoda = JSON.parse(fs.readFileSync("./joinquitoda.json", "utf8"));
    if(!joinquitoda[member.guild.id]){
        joinquitoda[member.guild.id] = {
            oda: "join-quit"
        };
    }

    let joinqoda = joinquitoda[member.guild.id].oda;
        
    let joinmesaj = JSON.parse(fs.readFileSync("./joinmesaj.json", "utf8"));
    if(!joinmesaj[member.guild.id]){
        joinmesaj[member.guild.id] = {
            mesaj: `Kişisi aramıza katıldı.`
        };
    }

    let jmesaj = joinmesaj[member.guild.id].mesaj;


    const channel = member.guild.channels.find(ch => ch.name === `${joinqoda}`);
    if (!channel) return;
    channel.send(` <@${member.id}>, ${jmesaj}`);

  });
  
bot.on('guildMemberRemove', member => {

    let joinquitoda = JSON.parse(fs.readFileSync("./joinquitoda.json", "utf8"));
    if(!joinquitoda[member.guild.id]){
        joinquitoda[member.guild.id] = {
            oda: "join-quit"
        };
    }

    let joinqoda = joinquitoda[member.guild.id].oda;
    
    let quitmesaj = JSON.parse(fs.readFileSync("./quitmesaj.json", "utf8"));
    if(!quitmesaj[member.guild.id]){
        quitmesaj[member.guild.id] = {
            mesaj: `Kişisi aramızdan ayrıldı.`
        };
    }

    let qmesaj = quitmesaj[member.guild.id].mesaj;

    const channel = member.guild.channels.find(ch => ch.name === `${joinqoda}`);
    if (!channel) return;
    channel.send(` <@${member.id}>, ${qmesaj}`);

  });

bot.on('guildMemberAdd', member => {
        
    let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
    if(!autorole[member.guild.id]){
        return undefined;
    }

    let arole = autorole[member.guild.id].rol;
    const brole = arole.substring(3, arole.length - 1);

  member.addRole(brole)
})

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    if (!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
});

bot.on('message', async msg => { //eslint-disable-line

    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[msg.guild.id]){
        prefixes[msg.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[msg.guild.id].prefixes;

    if (!msg.content.startsWith(prefix)) return; 
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, `$1`) : '';
    const serverQueue = queue.get(msg.guild.id);
    try {
    if (msg.content.startsWith(`${prefix}play`)) {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('Üzgünüm fakat ses kanalında olmalısın.');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('Olduğun ses kanalına bağlanma yetkim yok.');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('Olduğun ses kanalında konuşma yetkim yok.');
        }
        
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/(.*)$/)) {
            try {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, msg, voiceChannel, true);
                }
                return msg.channel.send(`Playlist: **${playlist.title}** sıraya eklendi`);
            } catch (error) {
                try {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 10);
                            let index = 0;
                            msg.channel.send(`
         __**Şarkı seçimi:**__
        ${videos.map(video2 => `** ${++index} -** ${video2.title}`).join('\n')}
        Lütfen 1 ile 10 arasından seç ve numarasını yaz
                                    `);
                            //eslint-disable-next-line max-depth
                            try {
                                var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                    maxMatches: 1,
                                    time: 20000,
                                    errors: ['time']
                                });
                            } catch (err) {
                                console.error(err);
                                return msg.channel.send('Geçerli veya hiçbir sayı giirlmedi, şarkı seçimi iptal ediliyor.');
                            }
                            const videoIndex = parseInt(response.first().content);
                            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                        } catch (err) {
                            console.error(err)
                            return msg.channel.send('Sonuç bulunamadı');
                        }  
                    }
        
                    return handleVideo(video, msg, voiceChannel);
                } catch (error) {
                    
                }
            }

        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    msg.channel.send(`
 __**Şarkı seçimi:**__
${videos.map(video2 => `** ${++index} -** ${video2.title}`).join('\n')}
Lütfen 1 ile 10 arasından seç ve numarasını yaz
                            `);
                    //eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('Geçerli veya hiçbir sayı giirlmedi, şarkı seçimi iptal ediliyor.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err)
                    return msg.channel.send('Sonuç bulunamadı');
                }  
            }

            return handleVideo(video, msg, voiceChannel);
        }
    } else if (msg.content.startsWith(`${prefix}skip`)) {
        if (!msg.member.voiceChannel) return msg.channel.send('Bir ses kanalında değilsin.');
        if (!serverQueue) return msg.channel.send('Atlayabileceğim bir şarkı çalmıyor.');
        serverQueue.connection.dispatcher.end('Skip command has been used.');
        return undefined;
    } else if (msg.content.startsWith(`${prefix}stop`)) {
        if (!msg.member.voiceChannel) return msg.channel.send('Bir ses kanalında değilsin.');
        if (!serverQueue) return msg.channel.send('Durdurabileceğim bir şarkı çalmıyor.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('stop command has been used.');
        return undefined;
    } else if(msg.content.startsWith(`${prefix}volume`)) {
        if (!msg.member.voiceChannel) return msg.channel.send('Bir ses kanalında değilsin.');
        if (!serverQueue) return msg.channel.send('Şarkı çalmıyor.');
        if (!args[1]) return msg.channel.send(`Şu anki ses: ${serverQueue.volume}`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return msg.channel.send(`Sesi şu değer yaptım: **${args[1]}**`);
    } else if (msg.content.startsWith(`${prefix}np`)) {
        if (!serverQueue) return msg.channel.send('Şarkı çalmıyor.');
        return msg.channel.send(`Şimdi çalıyor ${serverQueue.songs[0].title}`);
    } else if (msg.content.startsWith(`${prefix}queue`)) {
        if (!serverQueue) return msg.channel.send('Şarkı çalmıyor.');
        return msg.channel.send(`
__**Şarkı sırası:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Şimdi çalıyor:** ${serverQueue.songs[0].title}
        `);
    } else if (msg.content.startsWith(`${prefix}pause`)){
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.content.startsWith('Şarkı durduruldu!');
        }
        return msg.channel.send('Zaten şarkı çalmıyor.');
    } else if (msg.content.startsWith(`${prefix}resume`)){
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('Şarkı başarıyla devam ettirildi!');
        }
        return msg.channel.send('Zaten şarkı çalmıyor.');
    }

    return undefined;
} catch (error) {
    console.log(error)
}
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
//    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Ses kanalına bağlanamıyorum ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Ses kanalına bağlanamıyorum ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
//        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`**${song.title}** Sıraya eklendi.`);
    }
    return undefined;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

//    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason == 'Stream is not generating quickly enough.') console.log('song ended');
            console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Şarkı başladı : **${song.title}**`);
}

bot.login(botconfig.token);