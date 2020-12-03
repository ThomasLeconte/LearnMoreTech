const Discord = require("discord.js");

class EmbedMessage{
    constructor(client, title, description){
        this.example = new Discord.MessageEmbed()
        //couleur de bordure
        .setColor('#FFFFF')
        .setTitle(title)
        //url associée au titre
        .setURL('https://www.youtube.com')
        //auteur avec son avatar et une url associés
        .setAuthor(client.user.username, client.user.displayAvatarURL(), 'https://www.youtube.com')
        .setDescription(description)
        //Vignette début d'image
        .setThumbnail(client.user.displayAvatarURL())
        .addField("Help :", "Commands available")
        .addFields(
            { name: 'Command', value: '/lmt help', inline: true},
            { name: 'Description', value: 'Get help with commands', inline: true },
            { name: 'Permission', value: 'Admin', inline: true },
        )
        .addField('\u200B', '\u200B')
        //ajoute une image classique dans la card
        //.setImage(evt.author.displayAvatarURL())
        .setTimestamp()
        .setFooter('Footer', client.user.displayAvatarURL());
    }

    showMessage(){
        return this.example;
    }
}

module.exports = EmbedMessage;