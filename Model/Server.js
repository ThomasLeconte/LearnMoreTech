const ArticleParser = require("../Tools/ArticleParser");
const jsonWriter = require("../Tools/JsonWriter");
const Translator = require("../Tools/Translator");

class Server {

    constructor(id, publishing, client) {
        this.id = id;
        this.isPublishing = publishing;
        this.client = client;
        this.parser = null;
        this.RSSLinks = [];
        this.translator = new Translator("us");
        this.jsonLink = "Saves/" + this.id + ".json";
    }

    defineParser(messageInterval) {
        this.parser = new ArticleParser(this, messageInterval);
    }

    getId() {
        return this.id;
    }

    getParsingStatus() {
        return this.isPublishing;
    }

    setParsingStatus(status) {
        this.parser.setPublishing(status);
    }

    getRSSLinks() {
        return this.RSSLinks;
    }

    setRSSLinks(data) {
        this.RSSLinks = data;
    }

    addRSSLink(link) {
        this.RSSLinks.push(link);
        this.updateJson();
    }

    removeRSSLink(link) {
        let index;
        if (link === parseInt(link, 10)) { index = link + 1; }
        else { index = this.RSSLinks.indexOf(link); }
        this.RSSLinks.splice(index, 1);
        this.updateJson();
    }

    clearRSSList(){
        this.RSSLinks = [];
        this.updateJson();
    }

    translate(key){
        return this.translator.get(key);
    }

    getLanguage() {
        return this.translator.getLanguage();
    }

    setLanguage(data) {
        this.language = this.translator.setLanguage(data);
        this.updateJson();
    }

    updateJson() {
        jsonWriter.writeData(this);
    }

    getParser() {
        return this.parser;
    }

    getClient() {
        return this.client;
    }

    getJsonLink() {
        return this.jsonLink;
    }
}

module.exports = Server;