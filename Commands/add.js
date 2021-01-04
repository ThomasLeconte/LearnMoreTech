const ArticleParser = require("../Tools/ArticleParser");

module.exports = {
    name: 'add',
    description: 'Add RSS link command',
    usage: '/lmt add <link>',
    execute(message, args, server) {
        switch (args.length) {
            case 2:
                message.channel.send("You must specify a RSS link !");
                break;
            case 3:
                if (args[1] != null) {
                    ArticleParser.testLink(args[1])
                        .then(booleanResult => {
                            if (booleanResult) {
                                server.addRSSLink(args[1]);
                                message.channel.send("RSS link added !");
                            } else {
                                message.channel.send("Stop trolling me, i know it's not a link dude 😑");
                            }
                        });
                }
                break;
        }
    }
};