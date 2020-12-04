const Discord = require("discord.js");
const EmbedMessage = require("../View/EmbedMessage");
const ArticleMessage = require("../View/ArticleMessage");
const commandPrefix = "/";
const fetch = require("node-fetch");
const ArticleParser = require('../Tools/ArticleParser');
const RSSLinks = [];

class CommandsController{
    constructor(client){
        this.client = client;
        this.messagesSend = [];
        this.publishing = false;
    }

    sendEmbededMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.showMessage();
    }

    sendHelpMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.showStartMessage();
    }

    sendArticleMessage(title, link, description){
        let message = new ArticleMessage(this.client, title, link, description);
        return message.card;
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
                            "LearnMoreTech is a bot for being aware of the latest news in the field of tech and IT development !\n"+
                            "Type **/lmt help** for know more about me ☺")
                        );
                        //https://www.clubic.com/feed/news.rss
                        //https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml
                        this.publishing = true;
                        let articleParser = new ArticleParser(`https://www.clubic.com/feed/news.rss`, this);
                        articleParser.fetchArticles(this.client, event);
                    break;
                    case 1:
                        switch(args[0]){
                            case "add":
                                event.channel.send("You must specify RSS link !");
                            case "feeds":
                                if(RSSLinks.length == 0){
                                    event.channel.send("Looking empty here ... Add RSS link with **/lmt add [yourLink]** !");
                                }else{
                                    let text = "Voici tout vos sites d'informations enregistrés :";
                                    for(let i=0;i<RSSLinks.length;i++){
                                        text += "\n - "+RSSLinks[i];
                                    }
                                    event.channel.send(toto);
                                }
                                break;
                            case "clear":
                                event.channel.bulkDelete(10, true);
                                event.channel.send("This channel will never remember me !");
                                break;
                            case "help":
                                event.channel.send(
                                    this.sendHelpMessage("I'm here for help you", "Here is all available commands, enjoy !")
                                )
                                break;
                            case "stop":
                                this.publishing = false;
                                event.channel.send("Ciao amigos");
                                break;
                            case "start":
                                this.publishing = true;
                                event.channel.send("Let's me make you discovering world 😁");
                                break;
                        }
                    break;
                    case 2:
                        switch(args[0]){
                            case "add":
                            if(args[1] != null){
                                RSSLinks.push(args[1]);
                                event.channel.send("RSS link added !");
                            }
                        }
                    break;
                }
            break;
        }
    }

    listen(){
        this.client.on('message', event=> this.analyseCommand(event));
    }

    isPublishing(){
        return this.publishing;
    }
}

module.exports = CommandsController;