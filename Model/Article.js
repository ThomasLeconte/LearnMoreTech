class Article{

    constructor(title, description, link){
        this.title = title;
        this.desc = description;
        this.link = link;
    }

    setImage(imageLink){
        this.image = this.imageLink;
    }

    getTitle(){
        return this.title;
    }

    getDesc(){
        return this.desc;
    }

    getLink(){
        return this.link;
    }
}

module.exports = Article;