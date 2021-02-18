const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'remove',
    description: 'Remove RSS link from server',
    usage: '/lmt remove <link or index>',
    execute(message, server, args) {
        switch (args.length) {
            case 2:
                if (server.getRSSLinks() == 0) {
                    message.channel.send(EmbedMessage.showError(
                        global.client,
                        server.translate("error"),
                        server.translate("remove_empty")
                    ));
                }
                else {
                    let text = server.translate("remove_main");
                    for (let i = 0; i < server.getRSSLinks().length; i++) {
                        text += `\n **Index :** ${i + 1}, **link :** ${server.getRSSLinks()[i]}`;
                    }
                    message.channel.send(text);
                }
                break;
            case 3:
                if (args[2] != null) {
                    server.removeRSSLink(args[2]);
                    message.channel.send(EmbedMessage.showSuccess(
                        global.client,
                        server.translate("success"),
                        server.translate("remove_success")
                    ));
                }
                break;
        }
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};