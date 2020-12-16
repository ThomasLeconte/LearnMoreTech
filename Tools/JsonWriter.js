const fs = require("fs");

class JsonWriter {
    constructor() {

    }

    static writeData(server) {
        if (!fs.existsSync("./Saves")) {
            fs.mkdirSync("./Saves", { recursive: true })
        }
        let array = { "RSS": server.getRSSLinks() }
        let json = JSON.stringify(array, null, 2);
        fs.writeFile(server.getJsonLink(), json, (err) => {
            if (err) console.error(err);
            console.log('Data written to file');
        });
    }
}

module.exports = JsonWriter;