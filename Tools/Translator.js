class Translator{

    constructor(choosenLanguage){
        this.language = choosenLanguage;
        this.setLanguage(choosenLanguage);
        this.ressources = require("../View/messages.json")[this.langIndex];
    }

    get(key){
        return this.ressources[key];
    }

    setLanguage(lang){
        this.language = lang;
        switch(lang){
            case "fr": this.langIndex = 0; break;
            case "us": this.langIndex = 1; break;
        }
        this.updateRessources();
    }

    getLanguage(){
        return this.language;
    }

    updateRessources(){
        this.ressources = require("../View/messages.json")[this.langIndex];
    }
}

module.exports = Translator;