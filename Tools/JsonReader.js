const fs = require("fs");

class JsonReader{

    constructor(){

    }
    
    /**
     * Function which read server json file for set his RSS links list.
     * @param {Server} server 
     */
    static readData(server){
        //start reading
        fs.readFile(server.getJsonLink(), (err, data)=>{
            //if error is detected (permission)
            if(err){
                console.log(err);
            }else{
                //try to parse string in JSON and update server in parameter
                try {
                    server.setRSSLinks(JSON.parse(data).RSS);
                //if json file is not constructed nicely, try to delete it
                }catch(err){
                    try {
                        fs.unlinkSync(server.getJsonLink())
                        //file removed
                    }catch(err){
                        console.error(err)
                    }
                }
            }
        });
    }
}

module.exports = JsonReader;