const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'prevent',
    description: 'Prevent servers of an event or update',
    usage: '/lmt prevent',
    execute(message, server, args, client, manager) {
        let channel = message.channel;
        channel.messages.fetch({ limit: 10 }).then(messages => {
            let lastMessage = Array.from(messages.keys())[1];
            manager.getServers().forEach(server => {
                console.log(server.getMainChannel())
                if(server.getMainChannel().id !== null){
                    let channel = server.getServerData().channels.cache.get(server.getMainChannel().id);
                    channel.send(this.sendEmbededMessage(
                        client,
                        "BREAKING NEWS :",
                        messages.get(lastMessage).content
                    ));
                }
            });
            message.channel.send("All servers have been prevented !");
        })
        .catch(console.error);
    },

    /**
     * Send Embeded message to channel
     * @param {string} title 
     * @param {string} description 
     */
    sendEmbededMessage(client, title, description) {
        let message = new EmbedMessage(client, title, description);
        return message.showMessage();
	},

    getHelp(){
        return this.description+"\n"+"Usage : "+this.usage;
    }
};