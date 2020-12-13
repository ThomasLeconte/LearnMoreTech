const ArticleParser = require("../Tools/ArticleParser");
const jsonWriter = require("../Tools/JsonWriter");

class Server{

    constructor(id, publishing, client){
        this.id = id;
        this.isPublishing = publishing;
        this.client = client;
        this.parser = null;
        this.RSSLinks = [];
    }

    defineParser(messageInterval){
        this.parser = new ArticleParser(this.RSSLinks[0], messageInterval);
    }


    getId(){
        return this.id;
    }

    getParsingStatus(){
        return this.isPublishing;
    }

    setParsingStatus(status){
        this.parser.setPublishing(status);
    }

    addRSSLink(link){
        this.RSSLinks.push(link);
        jsonWriter.writeData(this);
    }

    getRSSLinks(){
        return this.RSSLinks;
    }

    getParser(){
        return this.parser;
    }

    getClient(){
        return this.client;
    }
}

module.exports = Server;