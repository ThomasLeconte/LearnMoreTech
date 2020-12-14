const Server = require('../Model/Server');
const JsonReader = require('./JsonReader');
const fs = require("fs");
const JsonWriter = require('./JsonWriter');
class ServerManager{

    constructor(client){
        this.servers = [];
    }

    initialize(client){
        client.guilds.cache.forEach(server => {
            this.addServer(server.id, client);
        });
    }

    addServer(serverId, client){
        //Si le serveur n'est pas déjà enregistré
        if(!this.exist(serverId)){
            let server = new Server(serverId, false, client);
            this.servers.push(server);
            if(fs.existsSync('Saves/'+serverId+'.json')){
                JsonReader.readData(server);
            }else{
                JsonWriter.writeData(server);
            }

        }
    }

    exist(serverId){
        let found = false;
        this.servers.forEach(server => {
            if(server.getId() == serverId){
                found = true;
                return found;
            }
        });
        return found;
    }

    getServer(serverId){
        let result = null;
        this.servers.forEach(server => {
            if(server.getId() == serverId){
                result = server;
            }
        });
        return result;
    }

    updateServer(serverId){
        let server = this.getServer(serverId);
        if(server.getParsingStatus()){
            server.setParsingStatus(false);
        }else{
            server.setParsingStatus(true);
        }
    }
}

module.exports = ServerManager;