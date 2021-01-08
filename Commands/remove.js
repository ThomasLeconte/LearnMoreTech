module.exports = {
    name: 'remove',
    description: 'Remove RSS link from server',
    usage: '/lmt remove <link or index>',
    execute(message, server, args) {
        switch (args.length) {
            case 2:
                if (server.getRSSLinks() == 0) {
                    message.channel.send(server.translate("remove_error"));
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
                    message.channel.send(server.translate("remove_success"));
                }
                break;
        }
    }
};