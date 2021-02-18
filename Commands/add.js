"use strict";

let ArticleParser = require("../Tools/ArticleParser");
const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'add',
    description: 'Add RSS link command',
    usage: '/lmt add <link>',
    execute(message, server, args) {
        switch (args.length) {
            case 2:
                message.channel.send(EmbedMessage.showError(
                    global.client,
                    server.translate("error"),
                    server.translate("add_error_arg")
                ));
                break;
            case 3:
                if (args[2] != null) {
                    ArticleParser.testLink(args[2])
                        .then(booleanResult => {
                            if (booleanResult) {
                                server.addRSSLink(args[2]);
                                message.channel.send(EmbedMessage.showSuccess(
                                    global.client,
                                    server.translate("success"),
                                    server.translate("add_success")
                                ));
                            } else {
                                message.channel.send(EmbedMessage.showError(
                                    global.client,
                                    server.translate("error"),
                                    server.translate("add_error_link")
                                ));
                            }
                        });
                }
                break;
        }
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};