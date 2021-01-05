const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'help',
    description: 'Get all available commands',
    usage: '/lmt help',
    execute(message, client) {
        message.channel.send(
            this.sendHelpMessage(client, "I'm here to help you", "Here is all available commands, enjoy !")
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