const JsonReader = require("../Tools/JsonReader");
const EmbedMessage = require("../View/EmbedMessage");

module.exports = {
    name: 'choose',
    description: 'List of all RSS patterns availables for subscription',
    usage: '/lmt choose <index>',
    execute(message, server, args, client) {
        switch (args.length) {
            case 2:
                message.channel.send(server.translate("choose_main"));
                let patterns = JsonReader.readFileData("View/patterns.json");
                patterns.forEach(pattern => {
                    let mess = new EmbedMessage(client,
                        {
                            title: pattern.name + " - n°" + (patterns.indexOf(pattern) + 1),
                            description: pattern.desc,
                            thumbnail: false,
                            color: "#1abc9c"
                        }
                    );
                    message.channel.send(mess);
                });
                break;
            case 3:
                if (args[2] != null) {
                    let index = parseInt(args[2]);
                    let pattern = JsonReader.readFileData("View/patterns.json")[index - 1];
                    server.setRSSLinks(pattern.urls);
                    message.channel.send(EmbedMessage.showSuccess(
                        global.client,
                        server.translate("success"),
                        server.translate("choose_success") + pattern.name + " 🤪"
                    ));
                }
                break;
        }
    },

    getHelp() {
        return this.description + "\n" + "Usage : " + this.usage;
    }
}