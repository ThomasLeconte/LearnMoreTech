const Server = require('../Model/Server');
const JsonWriter = require('./JsonWriter');
class ServerManager{

    constructor(){
        this.servers = [];
    }

    addServer(serverId, client){
        //Si le serveur n'est pas déjà enregistré
        if(!this.exist(serverId)){
            let server = new Server(serverId, false, client);
            this.servers.push(server);
            JsonWriter.writeData(server);
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