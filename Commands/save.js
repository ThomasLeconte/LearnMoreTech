module.exports = {
    name: 'save',
    description: 'Get .json file save of your RSS links added',
    usage: '/lmt save',
    execute(message, server) {
        message.channel.send(EmbedMessage.showSuccess(
            global.client,
            server.translate("success"),
            server.translate("save_success")
        ));
        message.channel.send({
            files: [{
                attachment: server.getJsonLink(),
                name: "save_" + server.getId() + ".json"
            }]
        });
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
};