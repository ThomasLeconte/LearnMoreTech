const commandPrefix = "/lmt";

class MainController {
    constructor(client, manager) {
        this.client = client;
        this.parser = null;
        this.publishing = false;
        this.manager = manager;
    }

    /**
     * 
     * @param {event} message 
     */
    analyseCommand(message) {
        //verifie que celui qui envoie le message est un bot
        if (message.author.bot) return;
        //si le message commence par quelque chose de different que le prefixe
        if (!message.content.startsWith(commandPrefix)) return;

        //On récpère le serveur depuis lequel a été envoyé le message
        let serverId = message.channel.guild.id;
        this.manager.addServer(serverId, this.client);
        var server = this.manager.getServer(serverId);

        if (message.content === "/lmt") {
            this.client.commands.get("main").execute(message, this.client);
            return;
        } else if (message.content === "/lmt help") {
            this.client.commands.get("help").execute(message, this.client);
        } else {
            //on divise le message en tableau
            let args = message.content.split(" ");
            //on supprime le premier element du tableau qu'on retourne dans command
            //et on le converti en lettre minuscule
            let command = args[1].toLowerCase();
            //on verifie si le bot contient la commande souhaitée
            if (!this.client.commands.has(command)) {
                message.reply("type **/lmt help** for get all availables commands !");
                return;
            }

            try {
                this.client.commands.get(command).execute(message, args, server, this.client);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
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
        this.client.on('message', message => this.analyseCommand(message));
        this.client.on('guildCreate', event => this.joinGuild(event));
        this.client.on('guildDelete', event => this.leaveGuild(event));
    }

    getClient() {
        return this.client;
    }

    /**
     * Getter of publishing attribute
     */
    isPublishing() {
        return this.publishing;
    }
}

module.exports = MainController;