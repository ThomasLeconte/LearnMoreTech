const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'setchannel',
    description: 'Set channel where bot has to publish articles',
    usage: '/lmt setchannel',
    execute(message, server) {
        server.setMainChannel(message.channel);
        server.updateJson();
        message.channel.send(EmbedMessage.showSuccess(
            global.client,
            server.translate("success"),
            server.translate("setchannel_success") + "**" + message.channel.name + "** 😉"
        ));
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};