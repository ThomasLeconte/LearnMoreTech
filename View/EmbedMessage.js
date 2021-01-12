const Discord = require("discord.js");

class EmbedMessage{
    constructor(client, title, description){
        this.client = client;
        this.title = title;
        this.description = description;
        this.card = new Discord.MessageEmbed()
        //couleur de bordure
        .setColor('#FFFFF')
        .setTitle(this.title)
        //auteur avec son avatar et une url associés
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
        .setDescription(this.description)
        //Vignette début d'image
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('\u200B', '\u200B')
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }

    showMessage(){
        return this.card;
    }

    showHelpMessage(){
        let availableCommands = "";
        let descriptions = "";
        let permissions = "";
        let commands = require("./commands.json");
        this.card = new Discord.MessageEmbed()
        //couleur de bordure
        .setColor('#FFFFF')
        .setTitle(this.title)
        //auteur avec son avatar et une url associés
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
        .setDescription(this.description)
        //Vignette début d'image
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('\u200B', '\u200B')
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());

        this.client.commands.forEach(command => {
            this.card.addField(command.name, command.getHelp())
        });

        this.card.addField('\u200B', '\u200B')

        return this.card;
    }

    showPatternMessage() {
        this.card = new Discord.MessageEmbed()
        //couleur de bordure
        .setColor('#FFFFF')
        .setTitle(this.title)
        //auteur avec son avatar et une url associés
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
        .setDescription(this.description)
        .addField('\u200B', '\u200B')
        .addField('Choose this one ?', '\u200B')
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        return this.card;
    }
}

module.exports = EmbedMessage;