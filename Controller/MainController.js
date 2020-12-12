const EmbedMessage = require("../View/EmbedMessage");
const ArticleMessage = require("../View/ArticleMessage");
const commandPrefix = "/";
const ServerManager = require("../Tools/ServerManager");
const RSSLinks = [];

class MainController{
    constructor(client){
        this.client = client;
        this.parser = null;
        this.publishing = false;
        this.manager = new ServerManager();
    }

    /**
     * Send Embeded message to channel
     * @param {string} title 
     * @param {string} description 
     */
    sendEmbededMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.showMessage();
    }

    /**
     * Send help messages to channel
     * @param {string} title 
     * @param {string} description
     */
    sendHelpMessage(title, description){
        let message = new EmbedMessage(
            this.client, title, description);
        return message.showStartMessage();
    }

    /**
     * Send Article message to channel
     * @param {string} title 
     * @param {string} link 
     * @param {string} description 
     */
    sendArticleMessage(title, link, description){
        let message = new ArticleMessage(title, link, description);
        return message.card;
    }

    /**
     * 
     * @param {event} event 
     */
    analyseCommand(event){
        let serverId = event.channel.guild.id;
        this.manager.addServer(serverId, this.client);
        var server = this.manager.getServer(serverId);
        
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
                                event.channel.send("I deleted last 10 messages !");
                                break;
                            case "help":
                                event.channel.send(
                                    this.sendHelpMessage("I'm here for help you", "Here is all available commands, enjoy !")
                                )
                            break;
                            case "stop":
                                if(server.getParser() == null){
                                    event.channel.send("Dude, you don't allow me to start ... wtf 🧐 ? Type **/lmt start** for allowing me !");
                                }else{
                                    server.setParsingStatus(false);
                                    event.channel.send("Ciao amigos");
                                }
                            break;
                            case "start":
                                if(server.getParser() == null){
                                    event.channel.send("Let's me make you discovering world 😁");
                                    server.addRSSLink("https://www.clubic.com/feed/news.rss");
                                    server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                                    server.defineParser(2);
                                    server.getParser().fetchArticles(server.getClient(), event);
                                }else{
                                    server.setParsingStatus(true);
                                    event.channel.send("Let's me spam you again 😈");
                                }
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

    /**
     * Listen to bot events
     */
    listen(){
        this.client.on('message', event=> this.analyseCommand(event));
    }

    static test(){
        return MainController.mainClient;
    }

    /**
     * Getter of publishing attribute
     */
    isPublishing(){
        return this.publishing;
    }
}

module.exports = MainController;