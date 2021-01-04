const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
	name: 'lmt',
	description: 'Main bot command',
	usage: '/lmt help',
	execute(message, client) {
		message.channel.send(
			this.sendEmbededMessage(
				client,
				"Wtf is this bot ?",
				"LearnMoreTech is a bot with the goal to aware you of the latest news in the tech and IT development domains !\n" +
				"Type **/lmt help** to know more about me ☺")
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