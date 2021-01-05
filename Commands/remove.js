module.exports = {
    name: 'remove',
    description: 'Remove RSS link from server',
    usage: '/lmt remove <link or index>',
    execute(message, args, server) {
        switch (args.length) {
            case 2:
                if (server.getRSSLinks() == 0) {
                    message.channel.send("There is no feed to delete on this server !");
                }
                else {
                    let text = "To remove a feed, do `/lmt remove [link OR index]`\nThis is the list of your feed(s) :";
                    for (let i = 0; i < server.getRSSLinks().length; i++) {
                        text += `\n **Index :** ${i + 1}, **link :** ${server.getRSSLinks()[i]}`;
                    }
                    message.channel.send(text);
                }
                break;
            case 3:
                if (args[2] != null) {
                    server.removeRSSLink(args[2]);
                    message.channel.send("RSS link removed !");
                }
                break;
        }
    }
};