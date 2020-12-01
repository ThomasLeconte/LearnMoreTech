console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const Client = new Discord.Client;
const prefix = "/";
const clientAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Logo_anniversaire_rouge.svg/1024px-Logo_anniversaire_rouge.svg.png";

Client.on("ready", ()=>{
    console.log("...Bot started !");
    //Client.user.setAvatar(clientAvatar);
});

Client.on('message', function (evt) {
    //verifie que celui qui envoie le message est un bot
    if(evt.author.bot) return;
    //si le message commence par quelque chose de different que le prefixe
    if(!evt.content.startsWith(prefix)) return;

    //on supprime le prefixe
    let commandBody = evt.content.slice(prefix.length);
    //on divise le message en tableau
    let args = commandBody.split(" ");
    //on supprime le premier element du tableau qu'on retourne dans command
    //et on le converti en lettre minuscule
    let command = args.shift().toLowerCase();

    switch(command){
        case "toto":
            //evt.reply("Salut moi c'est toto, je viens du ghetto, pour te faire la peau, avec tout mes potos 💣");
            //evt.channel.send("SALUT");
            let example = new Discord.MessageEmbed()
            //couleur de bordure
            .setColor('#FFFFF')
            .setTitle('What a title guy')
            //url associée au titre
            .setURL('https://www.youtube.com')
            //auteur avec son avatar et une url associés
            .setAuthor(Client.user.username, Client.user.displayAvatarURL(), 'https://www.youtube.com')
            .setDescription('Bonsoir')
            //Vignette début d'image
            .setThumbnail(Client.user.displayAvatarURL())
            .addFields(
                { name: 'Francais', value: 'Bonjour' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Anglais', value: 'Hello', inline: true },
                { name: 'Espagnol', value: 'Hola', inline: true },
            )
            .addField('Russe', 'Здравствуйте', true)
            //ajoute une image classique dans la card
            .setImage(evt.author.displayAvatarURL())
            .setTimestamp()
            .setFooter('Footer', Client.user.displayAvatarURL());
            evt.channel.send(example);
            break;
    }
});

Client.login(auth.TOKEN);