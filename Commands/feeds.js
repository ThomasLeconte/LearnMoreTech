module.exports = {
    name: 'feeds',
    description: 'Get list of all RSS links',
    usage: '/lmt feeds',
    execute(message, args, server) {
        if (server.getRSSLinks() == 0) {
            message.channel.send("Looking empty here... Add a RSS link with **/lmt add [link]** !");
        } else {
            let text = "There is the list of all you feed :";
            for (let i = 0; i < server.getRSSLinks().length; i++) {
                text += "\n" + (i + 1) + " - " + server.getRSSLinks()[i];
            }
            message.channel.send(text);
        }
    }
};