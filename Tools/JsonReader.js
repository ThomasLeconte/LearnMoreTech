const fs = require("fs");

class JsonReader{

    constructor(){

    }
    
    /**
     * Function which read server json file for set his RSS links list.
     * @param {Server} server 
     */
    static readData(server){
        let result = [];
        fs.readFile(server.getJsonLink(), (err, data)=>{
            if(err) throw err;
            server.setRSSLinks(JSON.parse(data).RSS);
        });
    }
}

module.exports = JsonReader;