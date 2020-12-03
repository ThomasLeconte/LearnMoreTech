const Parser = require('rss-parser');
const ArticleMessage = require("../View/ArticleMessage");
const utf8 = require('utf8');

class ArticleParser{
    constructor(url){
        this.url = url;
        this.articlesPending = [];
    }

    fetchArticles(client, event){
        let parser = new Parser();
        (async () => {
            let feed = await parser.parseURL(this.url);
            feed.items.forEach(item => {
                this.articlesPending.push(item);
            });

            if(this.articlesPending.length > 0){
                for(let i=0;i<feed.items.length;i++){
                    if(this.articlesPending[i] !== feed.items[i]){
                        this.articlesPending.push(feed.items[i]);
                    }
                }
            }

           this.sendArticlesByInterval(client, event, 10000);
          })();
    }

    sendArticlesByInterval(client, event, timeout){

        let interval = setInterval(()=>{
            let index = Math.floor(Math.random() * Math.floor(this.articlesPending.length));
            let message = new ArticleMessage(
                client,
                this.articlesPending[index].title,
                this.articlesPending[index].link,
                this.articlesPending[index].contentSnippet
            );
            event.channel.send(message.card);
            this.articlesPending.splice(index, 1);
            clearInterval(interval);
        }, timeout);
    }
}

module.exports = ArticleParser;