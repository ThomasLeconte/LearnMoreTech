module.exports = {
    name: 'setlang',
    description: 'Set favorite language of bot',
    usage: '/lmt setlang <lang>',
    execute(message, args, server) {
        switch (args.length){
            case 2:
                message.channel.send("Guy, please precise your favorite language using **"+this.usage+"** !\n"+
                "Available languages : \"fr\", \"us\"");
                break;
            case 3:
                if(args[2].length == 2 && args[2] == "fr" || args[2] == "us"){
                    server.setLanguage(args[2]);
                    message.channel.send(server.translate("changeLanguage"));
                }else{
                    message.channel.send("This is not an available language dude 🤨 Please choose one of these languages :\n"+
                    "Available languages : \"fr\", \"us\"");
                }
                break;
        }
    }
};