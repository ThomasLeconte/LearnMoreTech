module.exports = {
    name: 'setlang',
    description: 'Set favorite language of bot',
    usage: '/lmt setlang <lang>',
    execute(message, args, server) {
        switch (args.length){
            case 2:
                message.channel.send(server.translate("setlang_help") +"**"+this.usage+"** !\n"+
                server.translate("setlang_available") + "\"fr\", \"us\"");
                break;
            case 3:
                if(args[2].length == 2 && args[2] == "fr" || args[2] == "us"){
                    server.setLanguage(args[2]);
                    server.updateJson();
                    message.channel.send(server.translate("setlang_success"));
                }else{
                    message.channel.send(server.translate("setlang_error")+
                    server.translate("setlang_available") + "\"fr\", \"us\"");
                }
                break;
        }
    }
};