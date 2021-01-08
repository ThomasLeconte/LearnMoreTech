const ArticleParser = require("../Tools/ArticleParser");
const jsonWriter = require("../Tools/JsonWriter");
const Translator = require("../Tools/Translator");

class Server {

    constructor(server, publishing, client) {
        this.id = server.id;
        this.serverData = server;
        this.isPublishing = publishing;
        this.client = client;
        this.parser = null;
        this.RSSLinks = [];
        this.mainChannel = null;
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

    clearRSSList() {
        this.RSSLinks = [];
        this.updateJson();
    }

    translate(key) {
        return this.translator.get(key);
    }

    getLanguage() {
        return this.translator.getLanguage();
    }

    setLanguage(data) {
        this.language = this.translator.setLanguage(data);
    }

    getMainChannel() {
        if (this.mainChannel == null) {
            return { id: null };
        } else {
            return this.mainChannel;
        }

    }

    setMainChannel(channel) {
        this.mainChannel = channel;
    }

    getServerData(){
        return this.serverData;
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