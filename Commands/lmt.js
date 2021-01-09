const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
	name: 'lmt',
	description: 'Main bot command',
	usage: '/lmt help',
	execute(message, server, client) {
		message.channel.send(
			this.sendEmbededMessage(
				client,
				server.translate("main_title"),
				server.translate("main_desc") +
				server.translate("main_command"))
		);
	},
	
	/**
     * Send Embeded message to channel
     * @param {string} title 
     * @param {string} description 
     */
    sendEmbededMessage(client, title, description) {
        let message = new EmbedMessage(client, title, description);
        return message.showMessage();
    }
};