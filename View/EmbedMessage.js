const Discord = require("discord.js");

class EmbedMessage extends Discord.MessageEmbed{
    constructor(client, args){
        super();
        this.client = client;
        if(args != null){
            if(args.title !== undefined){
                this.setTitle(args.title);
            }
            if(args.titleLink !== undefined){
                this.setURL(args.titleLink);
            }
            if(args.description !== undefined){
                this.setDescription(args.description);
            }
            if(args.content !== undefined){
                this.addField('\u200B', '\u200B')
                args.content.forEach(line => {
                    this.addField(line.name, line.content);
                });
                this.addField('\u200B', '\u200B')
            }
            if(args.thumbnail !== undefined && args.thumbnail != false){
                if(args.image !== undefined){
                    this.setThumbnail(args.image);
                }else{
                    this.setThumbnail(this.client.user.displayAvatarURL());
                }
            }
            if(args.color !== undefined){
                this.setColor(args.color);
            }else{
                this.setColor("#1abc9c");
            }
        }else{
            this.setTitle("⛔ Error");
            this.setDescription("An error has occurred. Please contact bot administrator.");
        }

        this.setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }

    static showError(client, title, desc){
        return new EmbedMessage(client, {
            title: title,
            description: desc,
            color: "#e74c3c"
        });
    }

    static showSuccess(client, title, desc){
        return new EmbedMessage(client, {
            title: title,
            description: desc,
            color: "#2ecc71"
        })
    }
}

module.exports = EmbedMessage;