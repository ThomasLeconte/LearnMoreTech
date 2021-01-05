const Discord = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'Clear last 10 messages of channel',
    usage: '/lmt clear',
    execute(message, args, server) {
        if (server.getRSSLinks() == 0) {
            message.channel.send("There is no RSS link to delete on this server !");
            return;
        }
        message.channel.send(`Are you sure to delete all links ?\n\`yes\` / \`no\``);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
            if (message.content.toLowerCase() == 'yes' || message.content.toLowerCase() == 'y') {
                server.clearRSSList();
                message.channel.send(`I have deleted all links 🤐`)
            } else if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n') {
                message.channel.send(`Ok, you keep your links !`)
            } else {
                message.channel.send(`That's not a valid response, bro.`)
            }
        });
    }
};