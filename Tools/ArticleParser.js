const Parser = require('rss-parser');
const ArticleMessage = require("../View/ArticleMessage");
const utf8 = require('utf8');

class ArticleParser{
    constructor(url){
        this.url = url;
    }

    fetchArticles(client, event){
        let parser = new Parser();
        (async () => {

            let feed = await parser.parseURL(this.url);
           
            feed.items.forEach(item => {
                console.log(utf8.decode(item.content));  
                let articleMessage = new ArticleMessage(client, utf8.encode(item.title), item.link, item.contentSnippet);
                /*event.channel.send(
                    articleMessage.card
                );*/
            });
           
          })();
    }
}

module.exports = ArticleParser;