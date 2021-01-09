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
        let message = new EmbedMessage(client, title, description);
        return message.showHelpMessage();
    }
};