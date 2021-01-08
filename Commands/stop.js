module.exports = {
    name: 'stop',
    description: 'Stop publishing articles',
    usage: '/lmt stop',
    execute(message, server) {
        if (server.getParser() == null) {
            message.channel.send(server.translate("stop_notAllowed"));
        } else {
            server.setParsingStatus(false);
            message.channel.send(server.translate("stop_success"));
        }
    }
};