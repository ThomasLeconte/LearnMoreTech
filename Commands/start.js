module.exports = {
    name: 'start',
    description: 'Start publishing articles',
    usage: '/lmt start',
    execute(message, args, server) {
        switch (args.length) {
            case 2:
                if (server.getParser() == null) {
                    message.channel.send(server.translate("start_start"));
                    if (server.getRSSLinks().length == 0) {
                        message.channel.send(server.translate("start_default"));
                        server.addRSSLink("https://www.clubic.com/feed/news.rss");
                        server.addRSSLink("https://www.lemondeinformatique.fr/flux-rss/thematique/logiciel/rss.xml");
                        server.updateJson();
                    }
                    server.defineParser(5);
                    server.getParser().fetchArticles(message);
                } else {
                    server.setParsingStatus(true);
                    message.channel.send(server.translate("start_again"));
                }
                break;
            case 3:
                let interval = parseInt(args[2]);
                message.channel.send(server.translate("start_interval") + interval + server.translate("start_interval_seconds"));
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