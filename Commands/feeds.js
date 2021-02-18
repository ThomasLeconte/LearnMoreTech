const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'feeds',
    description: 'Get list of all RSS links',
    usage: '/lmt feeds',
    execute(message, server) {
        if (server.getRSSLinks() == 0) {
            message.channel.send(EmbedMessage.showError(
                global.client,
                server.translate("error"),
                server.translate("feed_empty")
            ));
        } else {
            let text = server.translate("feed_main");
            for (let i = 0; i < server.getRSSLinks().length; i++) {
                text += "\n" + (i + 1) + " - " + server.getRSSLinks()[i];
            }
            message.channel.send(text);
        }
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};