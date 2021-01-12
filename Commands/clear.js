const Discord = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'Clear last 10 messages of channel',
    usage: '/lmt clear',
    execute(message, server) {
        if (server.getRSSLinks() == 0) {
            message.channel.send(server.translate("clear_error"));
            return;
        }
        message.channel.send(server.translate("clear_question"));
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
            if (message.content.toLowerCase() == 'yes' || message.content.toLowerCase() == 'y') {
                server.clearRSSList();
                message.channel.send(server.translate("clear_success"))
            } else if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n') {
                message.channel.send(server.translate("clear_undo"))
            } else {
                message.channel.send(server.translate("clear_incorrect_response"))
            }
        });
    },

    getHelp(){
        return this.description+"\n"+"Usage : "+this.usage;
    }
};