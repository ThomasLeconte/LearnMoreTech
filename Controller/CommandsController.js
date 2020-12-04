const Discord = require("discord.js");
const EmbedMessage = require("../View/EmbedMessage");
const ArticleMessage = require("../View/ArticleMessage");
const commandPrefix = "/";
const fetch = require("node-fetch");
const ArticleParser = require('../Tools/ArticleParser');
const websites = [];

class CommandsController{
    constructor(client){
        this.client = client;
        this.messagesSend = [];
    }

    sendEmbededMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.example;
    }

    sendArticleMessage(title, link, description){
        let message = new ArticleMessage(this.client, title, link, description);
        return message.card;
    }

    analyseCommand(event){
        
        //verifie que celui qui envoie le message est un bot
        if(event.author.bot){
            if(event.author.username == "LearnMoreTech"){
                this.messagesSend.push(event);
            }
            return;
        } 
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
                        let articleParser = new ArticleParser(`https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml`);
                        articleParser.fetchArticles(this.client, event);
                    break;
                    case 1:
                        switch(args[0]){
                            case "add":
                                event.channel.send("You must specify RSS link !");
                            case "feeds":
                                if(websites.length == 0){
                                    event.channel.send("Looking empty here ... Add RSS link with **/lmt add [yourLink]** !");
                                }else{
                                    let toto = "Voici tout vos sites d'informations enregistrés :";
                                    for(let i=0;i<websites.length;i++){
                                        toto += "\n - "+websites[i];
                                    }
                                    event.channel.send(toto);
                                }
                                break;
                            case "clear":
                                event.channel.bulkDelete(10, true);
                                event.channel.send("This channel will never remember me !");
                                break;
                        }
                    break;
                    case 2:
                        switch(args[0]){
                            case "add":
                            if(args[1] != null){
                                websites.push(args[1]);
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
}

module.exports = CommandsController;