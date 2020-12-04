const Parser = require('rss-parser');
const ArticleMessage = require("../View/ArticleMessage");
const utf8 = require('utf8');

class ArticleParser{
    constructor(url, controller){
        this.url = url;
        this.controller = controller;
        this.articlesPending = [];
        this.articlesPublished = [];
    }

    fetchArticles(client, event){
        let parser = new Parser();
        (async () => {
            //on récupère tout les articles
            let feed = await parser.parseURL(this.url);
            console.log(feed.items);

            feed.items.forEach(element => {
                this.articlesPending.push(element);
            });

           this.sendArticlesByInterval(client, event, 10000);
          })();
    }

    sendArticlesByInterval(client, event, timeout){

        let interval = setInterval(()=>{
            if(this.controller.isPublishing()){
                var index = 0;
                if(this.articlesPending.length == 0){
                    console.log("Plus d'articles !");
                    clearInterval(interval);
                    this.fetchArticles(client, event);
                }else{
                    //let index = Math.floor(Math.random() * Math.floor(this.articlesPending.length));
                    if(this.articlesPublished.some(e=>e.title == this.articlesPending[index].title)){
                        console.log("MEME ARTICLE");
                        this.articlesPending.splice(index, 1);
                    }else{
                        let message = new ArticleMessage(
                            client,
                            this.articlesPending[index].title,
                            this.articlesPending[index].link,
                            this.articlesPending[index].contentSnippet
                        );
                        event.channel.send(message.card);
                        this.articlesPublished.push(message.card);
                        this.articlesPending.splice(index, 1);
                        index = index + 1;
                    }
                }
            }
        }, timeout);
    }
}

module.exports = ArticleParser;