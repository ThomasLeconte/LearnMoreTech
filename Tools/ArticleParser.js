const Parser = require('rss-parser');
const Article = require('../Model/Article');
const EmbedMessage = require("../View/EmbedMessage");

class ArticleParser {

    /**
     * Constructor
     * @param {Server} server - Server source for get RSS links
     * @param {int} messageInterval - Seconds between two messages
     */
    constructor(server, messageInterval) {
        this.server = server;
        this.urls = this.server.getRSSLinks();
        this.publishing = true;
        this.messageInterval = messageInterval * 1000;
        this.urlProvided = [];
        this.articlesPending = [];
        this.articlesPublished = [];
        this.sameArticleCounter = 0;
    }

    fetchArticles(event) {
        if(this.sameArticleCounter < 20){
            event.channel.send(this.server.translate("start_parser"));
        }
        let parser = new Parser();
            //on récupère tout les articles
            this.urls.forEach(url => {
                (async () => {
                    let feed = await parser.parseURL(url);
                    console.log(feed.items);
                    feed.items.forEach(article => {
                        if(article.enclosure !== null){
                            this.articlesPending.push(new Article(article.title, article.contentSnippet.toString("utf-8"), article.link, article.enclosure));
                        }else{
                            this.articlesPending.push(new Article(article.title, article.contentSnippet.toString("utf-8"), article.link));
                        }
                        
                    });
                })();
            });
            this.sendArticlesByInterval(event, this.messageInterval);
    }

    sendArticlesByInterval(event, timeout) {
        let client = this.server.getClient();
        //toute les X secondes on execute l'action
        let interval = setInterval(() => {
            //si le parser est autorisé à publier
            if (this.isPublishing()) {
                var index = 0;
                //si le tableau d'articles en attente est vide, on arrête l'interval (clearInterval)
                if (this.articlesPending.length == 0) {
                    console.log("PLUS D'ARTICLES")
                    clearInterval(interval);
                    //on appelle fetchArticles() pour remplir de nouveau le tableau d'articles en attente
                    this.fetchArticles(event);
                } else {
                    //si le tableau des articles déjà publiés contient un article dont le titre est le même
                    //que l'article en attente d'index X, alors on ne le publie pas
                    if (this.articlesPublished.some(e => e.getTitle() == this.articlesPending[index].getTitle())) {
                        this.sameArticleCounter++;
                        console.log("MEME ARTICLE" + this.sameArticleCounter);
                        //on supprime l'article en attente de la liste
                        this.articlesPending.splice(index, 1);
                    } else {
                        let message = new EmbedMessage(
                            client,
                            {
                                title: this.articlesPending[index].getTitle(),
                                titleLink : this.articlesPending[index].getLink(),
                                description: this.articlesPending[index].getDesc(),
                                thumbnail: true,
                                image: this.articlesPending[index].getImage()
                            }
                        );
                        event.channel.send(message);
                        //on ajoute l'article publié à la liste des articles publiés
                        this.articlesPublished.push(this.articlesPending[index]);
                        //et on le supprime de la liste des articles en attente
                        this.articlesPending.splice(index, 1);
                        index = index + 1;
                    }
                }
            }
        }, timeout);
    }

    isPublishing() {
        return this.publishing;
    }

    setPublishing(isPublishing) {
        this.publishing = isPublishing;
    }

    static async testLink(link) {
        let parser = new Parser();
        return (async () => {
            try {
                //on récupère tout les articles
                await parser.parseURL(link);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        })();
    }
}

module.exports = ArticleParser;