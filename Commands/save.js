module.exports = {
    name: 'save',
    description: 'Get .json file save of your RSS links added',
    usage: '/lmt save',
    execute(message, args, server) {
        message.channel.send("Here is a save of your RSS links dude 😎 !");
        message.channel.send({
            files: [{
                attachment: server.getJsonLink(),
                name: "save_" + server.getId() + ".json"
            }]
        });
    }
};