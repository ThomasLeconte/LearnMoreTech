const fs = require("fs");

class JsonWriter {
    constructor() {

    }

    static writeData(server) {
        if (!fs.existsSync("./Saves")) {
            fs.mkdirSync("./Saves", { recursive: true })
        }
        let config = [];
        let channel = {"MainChannel" : server.getMainChannel().id}
        let RSSLinks = { "RSS": server.getRSSLinks() }
        let language = {"Language": server.getLanguage() }
        config.push(channel); config.push(language); config.push(RSSLinks);
        let json = JSON.stringify(config, null, 2);
        fs.writeFile(server.getJsonLink(), json, (err) => {
            if (err) console.error(err);
            console.log('Data written to file');
        });
    }
}

module.exports = JsonWriter;