module.exports = {
    name: 'stop',
    description: 'Stop publishing articles',
    usage: '/lmt stop',
    execute(message, args, server) {
        if (server.getParser() == null) {
            message.channel.send("Dude, you didn't let me start... wtf 🧐 ? Type **/lmt start** to do that !");
        } else {
            server.setParsingStatus(false);
            message.channel.send("See you soon !");
        }
    }
};