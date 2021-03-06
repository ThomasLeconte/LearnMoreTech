const Discord = require("discord.js");
class ArticleMessage {
    constructor(client, article){
        this.client = client;
        this.article = article;
        this.card = null;
        this.constructArticleCard();
    }

    constructArticleCard(){
        this.card = new Discord.MessageEmbed()
        .setColor('#334F3F')
        .setTitle(this.article.getTitle())
        .setURL(this.article.getLink())
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL(), "https://google.com")
        .setDescription(this.article.getDesc())
        .setThumbnail(this.getImage())
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }

    getImage(){
        if(this.article.getImage() !== undefined){
            return this.article.getImage()["url"];
        }else{ 
            return this.client.user.displayAvatarURL()
        }
    }

    getArticle(){
        return this.article;
    }
}

module.exports = ArticleMessage;