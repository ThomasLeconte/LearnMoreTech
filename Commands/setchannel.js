module.exports = {
    name: 'setchannel',
    description: 'Set channel where bot has to publish articles',
    usage: '/lmt setchannel',
    execute(message, server) {
        server.setMainChannel(message.channel);
        server.updateJson();
        message.channel.send(server.translate("setchannel_success")+"**"+message.channel.name+"** 😉");
    }
};