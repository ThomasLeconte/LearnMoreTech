const JsonReader = require("../Tools/JsonReader");
const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'choose',
    description: 'List of all RSS patterns availables for subscription',
    usage: '/lmt choose <index>',
    execute(message, args, server, client) {
        switch (args.length) {
            case 2:
                message.channel.send("Here are some RSS patterns, constructed by community ! Check this out : ");
                let patterns = JsonReader.readFileData("View/patterns.json");
                patterns.forEach(pattern => {
                    console.log(pattern);
                    let mess = new EmbedMessage(client, pattern.name + " - n°" + (patterns.indexOf(pattern) + 1), pattern.desc);
                    message.channel.send(mess.showPatternMessage());
                });
                break;
            case 3:
                if (args[2] != null) {
                    let index = parseInt(args[2]);
                    let pattern = JsonReader.readFileData("View/patterns.json")[index - 1];
                    server.setRSSLinks(pattern.urls);
                    message.channel.send("Nice one dude ! Now you will receive articles from " + pattern.name + " 🤪");

                }
                break;
        }
    }
}