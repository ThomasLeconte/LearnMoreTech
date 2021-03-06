const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'stop',
    description: 'Stop publishing articles',
    usage: '/lmt stop',
    execute(message, server) {
        if (server.getParser() == null) {
            message.channel.send(EmbedMessage.showError(
                global.client,
                server.translate("error"),
                server.translate("stop_notAllowed")
            ));
        } else {
            server.setParsingStatus(false);
            message.channel.send(server.translate("stop_success"));
        }
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};