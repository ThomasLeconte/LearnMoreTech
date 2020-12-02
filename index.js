console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const EmbedMessage = require("./View/EmbedMessage");
const CommandsController = require("./Controller/CommandsController");
const Client = new Discord.Client;
const prefix = "/";

Client.on("ready", ()=>{
    console.log("...Bot started !");
});

Client.on('message', function (evt) {
    //verifie que celui qui envoie le message est un bot
    if(evt.author.bot) return;
    //si le message commence par quelque chose de different que le prefixe
    if(!evt.content.startsWith(prefix)) return;

    //on supprime le prefixe
    let commandBody = evt.content.slice(prefix.length);
    //on divise le message en tableau
    let args = commandBody.split(" ");
    //on supprime le premier element du tableau qu'on retourne dans command
    //et on le converti en lettre minuscule
    let command = args.shift().toLowerCase();

    switch(command){
        case "lmt":
            let test = new EmbedMessage(
                Client,
                "Wtf is this bot ?", 
                "LearnMoreTech is a bot for being aware of the latest news in the field of tech and IT development !"
            );
            //evt.reply("Salut moi c'est toto, je viens du ghetto, pour te faire la peau, avec tout mes potos 💣");
            //evt.channel.send("SALUT");
            evt.channel.send(test.example);
            break;
    }
});

Client.login(auth.TOKEN);