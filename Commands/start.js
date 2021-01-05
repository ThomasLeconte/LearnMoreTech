module.exports = {
    name: 'start',
    description: 'Start publishing articles',
    usage: '/lmt start',
    execute(message, args, server) {
        switch (args.length) {
            case 2:
                console.log(server);
                if (server.getParser() == null) {
                    message.channel.send("Let me keep you up to date 😁");
                    if (server.getRSSLinks().length == 0) {
                        message.channel.send("I have selected by default clubic.com and lemondeinformatique.fr sources for next articles, because you don't have any RSS link active 😐");
                        server.addRSSLink("https://www.clubic.com/feed/news.rss");
                        server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                        server.updateJson();
                    }
                    server.defineParser(2);
                    server.getParser().fetchArticles(message);
                } else {
                    server.setParsingStatus(true);
                    message.channel.send("Let me spam you again 😈");
                }
                break;
            case 3:
                let interval = parseInt(args[2]);
                message.channel.send("Parsing has started with " + interval + "s messages interval !");
                if (server.getRSSLinks().length == 0) {
                    server.addRSSLink("https://www.clubic.com/feed/news.rss");
                    server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                    server.updateJson();
                }
                server.defineParser(interval);
                server.getParser().fetchArticles(message);
                break;
        }
    }
};