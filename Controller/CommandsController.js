const Discord = require("discord.js");
const EmbedMessage = require("../View/EmbedMessage");
const commandPrefix = "/";

class CommandsController{
    constructor(client){
        this.client = client;
    }

    sendEmbededMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.example;
    }

    analyseCommand(event){
        //verifie que celui qui envoie le message est un bot
        if(event.author.bot) return;
        //si le message commence par quelque chose de different que le prefixe
        if(!event.content.startsWith(commandPrefix)) return;
    
        //on supprime le prefixe
        let commandBody = event.content.slice(commandPrefix.length);
        //on divise le message en tableau
        let args = commandBody.split(" ");
        //on supprime le premier element du tableau qu'on retourne dans command
        //et on le converti en lettre minuscule
        let command = args.shift().toLowerCase();
        
        switch(command){
            case "lmt":
                switch(args.length){
                    case 0:
                        event.channel.send(
                            this.sendEmbededMessage(
                            "Wtf is this bot ?",
                            "LearnMoreTech is a bot for being aware of the latest news in the field of tech and IT development !")
                        );
                    break;
                }
            break;
        }
    }

    listen(){
        this.client.on('message', event=> this.analyseCommand(event));
    }
}

module.exports = CommandsController;