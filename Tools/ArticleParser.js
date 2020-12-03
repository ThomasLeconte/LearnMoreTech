const Parser = require('rss-parser');
const ArticleMessage = require("../View/ArticleMessage");
const utf8 = require('utf8');

class ArticleParser{
    constructor(url){
        this.url = url;
        this.articles = [];
    }

    fetchArticles(client, event){
        let parser = new Parser();
        (async () => {

            let feed = await parser.parseURL(this.url);
           
            feed.items.forEach(item => {
                this.articles.push(item);
            });
           this.sendArticlesByInterval(client, event, 10000);
          })();
    }

    sendArticlesByInterval(client, event, timeout){
        let index = 0;
        setInterval(()=>{
            index = Math.floor(Math.random() * Math.floor(this.articles.length));
            let message = new ArticleMessage(client, this.articles[index].title, this.articles[index].link, this.articles[index].contentSnippet);
            event.channel.send(message.card);
        }, timeout);
    }
}

module.exports = ArticleParser;