const EmbedMessage = require("../View/EmbedMessage");
const ArticleMessage = require("../View/ArticleMessage");
const ArticleParser = require("../Tools/ArticleParser");
const commandPrefix = "/";

class MainController {
    constructor(client, manager) {
        this.client = client;
        this.parser = null;
        this.publishing = false;
        this.manager = manager;
    }

    /**
     * Send Embeded message to channel
     * @param {string} title 
     * @param {string} description 
     */
    sendEmbededMessage(title, description) {
        let message = new EmbedMessage(this.client, title, description);
        return message.showMessage();
    }

    /**
     * Send help messages to channel
     * @param {string} title 
     * @param {string} description
     */
    sendHelpMessage(title, description) {
        let message = new EmbedMessage(this.client, title, description);
        return message.showHelpMessage();
    }

    /**
     * Send Article message to channel
     * @param {string} title 
     * @param {string} link 
     * @param {string} description 
     */
    sendArticleMessage(title, link, description) {
        let message = new ArticleMessage(title, link, description);
        return message.card;
    }

    /**
     * 
     * @param {event} event 
     */
    analyseCommand(event) {
        //verifie que celui qui envoie le message est un bot
        if (event.author.bot) return;
        //si le message commence par quelque chose de different que le prefixe
        if (!event.content.startsWith(commandPrefix)) return;

        //On récpère le serveur depuis lequel a été envoyé le message
        let serverId = event.channel.guild.id;
        this.manager.addServer(serverId, this.client);
        var server = this.manager.getServer(serverId);

        //on supprime le prefixe
        let commandBody = event.content.slice(commandPrefix.length);
        //on divise le message en tableau
        let args = commandBody.split(" ");
        //on supprime le premier element du tableau qu'on retourne dans command
        //et on le converti en lettre minuscule
        let command = args.shift().toLowerCase();

        switch (command) {
            case "lmt":
                switch (args.length) {
                    case 0:
                        event.channel.send(
                            this.sendEmbededMessage(
                                "Wtf is this bot ?",
                                "LearnMoreTech is a bot with the goal to aware you of the latest news in the tech and IT development domains !\n" +
                                "Type **/lmt help** to know more about me ☺")
                        );
                        break;
                    case 1:
                        switch (args[0]) {
                            case "add":
                                event.channel.send("You must specify a RSS link !");
                                break;
                            case "remove":
                                if (server.getRSSLinks() == 0) {
                                    event.channel.send("There is no RSS link to delete on this server !");
                                } else {
                                    let text = "To remove a RSS link, do `/lmt remove [link OR index]`\nThis is the list of your RSS Links :";
                                    for (let i = 0; i < server.getRSSLinks().length; i++) {
                                        text += `\n **Index :** ${i + 1}, **link :** ${server.getRSSLinks()[i]}`;
                                    }
                                    event.channel.send(text);
                                }
                                break;
                            case "feeds":
                                if (server.getRSSLinks() == 0) {
                                    event.channel.send("Looking empty here... Add a RSS link with **/lmt add [link]** !");
                                } else {
                                    let text = "There is the list of all you feed :";
                                    for (let i = 0; i < server.getRSSLinks().length; i++) {
                                        text += "\n"+(i+1)+" - " + server.getRSSLinks()[i];
                                    }
                                    event.channel.send(text);
                                }
                                break;
                            case "clear":
                                event.channel.bulkDelete(10, true);
                                event.channel.send("I deleted the 10 last messages !");
                                break;
                            case "help":
                                event.channel.send(
                                    this.sendHelpMessage("I'm here to help you", "Here is all available commands, enjoy !")
                                )
                                break;
                            case "stop":
                                if (server.getParser() == null) {
                                    event.channel.send("Dude, you didn't let me start... wtf 🧐 ? Type **/lmt start** to do that !");
                                } else {
                                    server.setParsingStatus(false);
                                    event.channel.send("See you soon !");
                                }
                                break;
                            case "start":
                                console.log(server);
                                if (server.getParser() == null) {
                                    event.channel.send("Let me keep you up to date 😁");
                                    if (server.getRSSLinks().length == 0) {
                                        server.addRSSLink("https://www.clubic.com/feed/news.rss");
                                        server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                                        server.updateJson();
                                    }
                                    server.defineParser(2);
                                    server.getParser().fetchArticles(event);
                                } else {
                                    server.setParsingStatus(true);
                                    event.channel.send("Let me spam you again 😈");
                                }
                                break;
                            case "save":
                                event.channel.send("Here is a save of your RSS links dude 😎 !");
                                event.channel.send({
                                    files: [{
                                        attachment: server.getJsonLink(),
                                        name: "save_" + server.getId() + ".json"
                                    }]
                                });
                                break;
                        }
                        break;
                    case 2:
                        switch (args[0]) {
                            case "add":
                            if(args[1] != null){
                                ArticleParser.testLink(args[1])
                                .then(booleanResult => {
                                    if(booleanResult){
                                        server.addRSSLink(args[1]);
                                        event.channel.send("RSS link added !");
                                    }else{
                                        event.channel.send("Stop trolling me, i know it's not a link dude 😑");
                                    }
                                });
                            }
                            break;
                            case "start":
                                let interval = parseInt(args[1]);
                                event.channel.send("Parsing has started with " + interval + "s messages interval !");
                                if (server.getRSSLinks().length == 0) {
                                    server.addRSSLink("https://www.clubic.com/feed/news.rss");
                                    server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                                    server.updateJson();
                                }
                                server.defineParser(2);
                                server.getParser().fetchArticles(event);
                                break;

                            case "remove":
                                if (args[1] != null) {
                                    server.removeRSSLink(args[1]);
                                    event.channel.send("RSS link removed !");
                                }
                                break;
                        }
                        break;
                }
                break;
        }
    }

    joinGuild(event) {
        console.log("JOINED " + event.name);
        this.manager.addServer(event.id, this.client);
    }

    leaveGuild(event) {
        console.log("LEAVED " + event.name);
        this.manager.removeServer(event.id);
    }

    /**
     * Listen to bot events
     */
    listen() {
        this.client.on('message', event => this.analyseCommand(event));
        this.client.on('guildCreate', event => this.joinGuild(event));
        this.client.on('guildDelete', event => this.leaveGuild(event));
    }

    static test() {
        return MainController.mainClient;
    }

    /**
     * Getter of publishing attribute
     */
    isPublishing() {
        return this.publishing;
    }
}

module.exports = MainController;