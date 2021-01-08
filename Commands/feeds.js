module.exports = {
    name: 'feeds',
    description: 'Get list of all RSS links',
    usage: '/lmt feeds',
    execute(message, args, server) {
        if (server.getRSSLinks() == 0) {
            message.channel.send(server.translate("feed_empty"));
        } else {
            let text = server.translate("feed_main");
            for (let i = 0; i < server.getRSSLinks().length; i++) {
                text += "\n" + (i + 1) + " - " + server.getRSSLinks()[i];
            }
            message.channel.send(text);
        }
    }
};