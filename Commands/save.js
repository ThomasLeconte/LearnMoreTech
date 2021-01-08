module.exports = {
    name: 'save',
    description: 'Get .json file save of your RSS links added',
    usage: '/lmt save',
    execute(message, args, server) {
        message.channel.send(server.translate("save_success"));
        message.channel.send({
            files: [{
                attachment: server.getJsonLink(),
                name: "save_" + server.getId() + ".json"
            }]
        });
    }
};