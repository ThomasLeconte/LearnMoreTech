class Article {

    constructor(title, description, link, image) {
        this.title = title;
        this.desc = description;
        this.link = link;
        this.image = image;
    }

    getImage(){
        return this.image;
    }

    setImage(imageLink) {
        this.image = imageLink;
    }

    getTitle() {
        return this.title;
    }

    getDesc() {
        return this.desc;
    }
    
    getLink() {
        return this.link;
    }
}

module.exports = Article;