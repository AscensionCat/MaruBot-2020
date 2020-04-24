const { token, prefix, GOOGLE_API_KEY, Authorid } = require("./botconfig.json"); //Yapımcı ID, Bot tokeni, Bot prefixi, Google api keyini botconfig.json dan alır
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const bot = new Discord.Client({ disableEveryone: true });
const DBL = require("dblapi.js");
const express = require("express");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const opus = require("node-opus");
const youtube = new YouTube(GOOGLE_API_KEY);
bot.commands = new Discord.Collection();

function loadcommands() {
  //Command Handler
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      console.log("couldn't find commands.");
      return;
    }

    jsfile.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${f}`)];
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });
}

bot.on("ready", async () => {
  //Bot giriş yaptığında
  console.log(`${bot.user.username} is online!`); //Konsola botismi online yaz

  bot.user.setActivity(`.help Müzik bir süre devre dışı :(`, { type: "PLAYING" }); //Bot discord aktivitesini .help yap tipi oynuyor yap
});

const queue = new Map();

bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("ready", () => console.log("Yo this is ready"));

bot.on("disconnect", () =>
  console.log(
    "I just disconnected, making sure you know, I will reconnect now..."
  )
);

bot.on("shardReconnecting", id =>
  console.log(`Shard with ID ${id} reconnected.`)
);

bot.on("guildMemberAdd", member => {
  //JOİNMESAJ KISMI

  let joinquitoda = JSON.parse(fs.readFileSync("./joinquitoda.json", "utf8")); //join quit oda db sini qoinquitoda olarak tanımladım
  if (!joinquitoda[member.guild.id]) {
    joinquitoda[member.guild.id] = {
      oda: "join-quit"
    };
  } //eğer o sunucuya tanımlı bir oda yoksa varsayılan olarak join-quit olarak belirledim

  let joinqoda = joinquitoda[member.guild.id].oda; // Sunucuda tanımlanan odayı joinqoda olarak tanımladım

  let joinmesaj = JSON.parse(fs.readFileSync("./joinmesaj.json", "utf8")); // joinmesaj db sini joinmesaj olarak tanımladım
  if (!joinmesaj[member.guild.id]) {
    joinmesaj[member.guild.id] = {
      mesaj: `Kişisi aramıza katıldı.`
    }; // eğer db de tanımlı bir mesaj yoksa varsayılan olarak Kişisi aramıza katıldı olarak belirledim
  }

  let jmesaj = joinmesaj[member.guild.id].mesaj; // Sunucuda tanımlanan mesajı jmesaj olarak tanımladım

  const channel = member.guild.channels.cache.find(
    ch => ch.name === `${joinqoda}`
  ); // Tanımlanan yada varsayılan olarak tanımladığımız odayı channel olarak belirledim
  if (!channel) return; // Eğer öyle bir oda yoksa return olacak
  channel.send(` <@${member.id}>, ${jmesaj}`); //Kişiyi etiketleyip belirlenen mesajı yazacak
});

bot.on("guildMemberRemove", member => {
  // QUITMESAJ KISMI

  let joinquitoda = JSON.parse(fs.readFileSync("./joinquitoda.json", "utf8")); //Joinquitoda dbsini oku
  if (!joinquitoda[member.guild.id]) {
    joinquitoda[member.guild.id] = {
      oda: "join-quit"
    };
  } //eğer o sunucuya tanımlı bir oda yoksa varsayılan olarak join-quit olarak belirledim

  let joinqoda = joinquitoda[member.guild.id].oda; // Sunucuda tanımlanan odayı joinqoda olarak tanımladım

  let quitmesaj = JSON.parse(fs.readFileSync("./quitmesaj.json", "utf8")); //Quitmesaj dbsini oku
  if (!quitmesaj[member.guild.id]) {
    quitmesaj[member.guild.id] = {
      mesaj: `Kişisi aramızdan ayrıldı.`
    };
  } // Eğer bir quitmesaj belirtilmemişse Kişisi aramızdan ayrıldı olarak belirle

  let qmesaj = quitmesaj[member.guild.id].mesaj; // Sunucuda tanımlanan mesajı qmesaj olarak tanımladım

  const channel = member.guild.channels.cache.find(
    ch => ch.name === `${joinqoda}`
  ); // Tanımlanan yada varsayılan olarak tanımladığımız odayı channel olarak belirledim
  if (!channel) return; // Eğer öyle bir oda yoksa return olacak
  channel.send(` <@${member.id}>, ${qmesaj}`); //Kişiyi etiketleyip belirlenen mesajı yazacak
});

bot.on("guildMemberAdd", member => {
  //AUTOROLE KISMI

  let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8")); //Autorole db sini oku
  if (!autorole[member.guild.id]) {
    return undefined;
  } // Eğer bir autorole belirlenmediyse Dön

  let arole = autorole[member.guild.id].rol;
  const brole = arole.substring(3, arole.length - 1);

  member.roles.add(brole); //Kullanıcıya rolü ver
});

const app = express();
app.use(express.static("public"));

var server = require("http").createServer(app);

const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc1NzQ3MDg0NjY4MTA5OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY3ODQ2NzEyfQ.pjm0czFmyUWt819x8p1Yn-DWh7NzSuyYdRiQlRlnF2c",
  { webhookServer: listener, webhookAuth: "ajanyusuf2004" },
  bot
);

var path = require("path");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

dbl.webhook.on("ready", hook => {
  console.log(
    `Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`
  );
});
dbl.webhook.on("vote", vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

loadcommands();

bot.on("message", async message => {
  if (message.author.bot) return; //Mesajı yazan bir botsa dikkate alma
  if (message.channel.type === "dm") return; //Mesaj dm den geliyorsa dikkate alma

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Prefix db sini oku ve prefixes olarak tanımla
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  } //Eğer db de bir prefix yoksa botconfig de belirlenen prefixi kullan

  let prefix = prefixes[message.guild.id].prefixes;

  if (!message.content.startsWith(prefix)) return; //Eğer prefix yoksa dikkate alma

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (
    message.content.startsWith(`${prefix}reload`) &&
    message.author.id == Authorid
  ) {
    //Author dışında kimse komutu kullanamaz
    message.channel.send({ embed: { description: "Tüm komutlar yenilendi" } });
    loadcommands();
  }

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});

bot.login(token);
