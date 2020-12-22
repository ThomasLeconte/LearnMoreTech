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
        //url associée au titre
        .setURL('https://www.youtube.com')
        //auteur avec son avatar et une url associés
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL(), 'https://www.youtube.com')
        .setDescription(this.description)
        //Vignette début d'image
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('\u200B', '\u200B')
        .setTimestamp()
        .setFooter('Footer', this.client.user.displayAvatarURL());
    }

    showMessage(){
        return this.card;
    }

    showHelpMessage(){
        let availableCommands = "";
        let descriptions = "";
        let permissions = "";
        let commands = require("./commands.json");
        commands.forEach(command => {
            availableCommands += "\n"+command.command;
            descriptions+= "\n"+command.desc;
            permissions+= "\n"+command.perm;
        });
        this.card = new Discord.MessageEmbed()
        //couleur de bordure
        .setColor('#FFFFF')
        .setTitle(this.title)
        //url associée au titre
        .setURL('https://www.youtube.com')
        //auteur avec son avatar et une url associés
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL(), 'https://www.youtube.com')
        .setDescription(this.description)
        //Vignette début d'image
        .setThumbnail(this.client.user.displayAvatarURL())
        .addFields(
            { name: 'Command', value: availableCommands, inline: true},
            { name: 'Description', value: descriptions, inline: true },
            { name: 'Permission', value: permissions, inline: true },
        )
        .addField('\u200B', '\u200B')
        .setTimestamp()
        .setFooter('Footer', this.client.user.displayAvatarURL());
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
        .setTimestamp()
        .setFooter('Footer', this.client.user.displayAvatarURL());
        return this.card;
    }
}

module.exports = EmbedMessage;