"use strict";

let ArticleParser = require("../Tools/ArticleParser");

module.exports = {
    name: 'add',
    description: 'Add RSS link command',
    usage: '/lmt add <link>',
    execute(message, server, args) {
        switch (args.length) {
            case 2:
                message.channel.send(server.translate("add_error_arg"));
                break;
            case 3:
                if (args[2] != null) {
                    ArticleParser.testLink(args[2])
                        .then(booleanResult => {
                            if (booleanResult) {
                                server.addRSSLink(args[2]);
                                message.channel.send(server.translate("add_success"));
                            } else {
                                message.channel.send(server.translate("add_error_link"));
                            }
                        });
                }
                break;
        }
    }
};