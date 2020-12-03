const Discord = require("discord.js");

class ArticleMessage{
    constructor(client, title, link, description){
        this.client = client;
        this.title = title;
        this.link = link;
        this.description = description;
        this.card = null;
        this.constructArticleCard();
    }

    constructArticleCard(){
        this.card = new Discord.MessageEmbed()
        .setColor('#334F3F')
        .setTitle(this.title)
        .setURL(this.link)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL(), "https://google.com")
        .setDescription(this.description)
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('\u200B', '\u200B')
        .setTimestamp()
        .setFooter('Footer', this.client.user.displayAvatarURL());
    }
}

module.exports = ArticleMessage;