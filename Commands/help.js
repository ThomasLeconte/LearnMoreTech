const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'help',
    description: 'Get all available commands',
    usage: '/lmt help',
    execute(message, server, client) {
        message.channel.send(
            this.sendHelpMessage(client, server.translate("help_title"), server.translate("help_desc"))
        )
    },

    /**
     * Send help messages to channel
     * @param {string} title 
     * @param {string} description
     */
    sendHelpMessage(client, title, description) {
        let commands = [];
        client.commands.forEach(command => {
            commands.push({ name: command.name, content: command.getHelp() });
        });
        let message = new EmbedMessage(client, {
            title: title,
            description: description,
            content: commands,
            thumbnail: true
        });
        return message;
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};