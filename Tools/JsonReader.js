const fs = require("fs");
class JsonReader {

    constructor() {

    }

    /**
     * Function which read server json file for set his RSS links list.
     * @param {Server} server 
     */
    static readData(server) {
        //start reading
        fs.readFile(server.getJsonLink(), (err, data) => {
            //if error is detected (permission)
            if (err) {
                console.log(err);
            } else {
                //try to parse string in JSON and update server in parameter
                try {
                    server.setMainChannel(server.getServerData().channels.cache.get(JSON.parse(data)[0].MainChannel));
                    server.setRSSLinks(JSON.parse(data)[2].RSS);
                    server.setLanguage(JSON.parse(data)[1].Language);
                    //if json file is not constructed nicely, try to delete it
                } catch (err) {
                    try {
                        fs.unlinkSync(server.getJsonLink())
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        });
    }

    /**
     * Method for read data of a json file which must exist.
     */
    static readFileData(fileLink) {
        if (!fs.existsSync(fileLink)) {
            return [];
        }else{
            let result = fs.readFileSync(fileLink, "utf8");
            return JSON.parse(result);
        }

    }
}

module.exports = JsonReader;