const Server = require('../Model/Server');
const JsonReader = require('./JsonReader');
const fs = require("fs");
const JsonWriter = require('./JsonWriter');
class ServerManager {

    constructor() {
        this.servers = [];
    }

    initialize(client) {
        client.guilds.cache.forEach(server => {
            this.addServer(server, client);
        });
    }

    addServer(serverData, client) {
        //Si le serveur n'est pas déjà enregistré
        if (!this.exist(serverData.id)) {
            let server = new Server(serverData, false, client);
            this.servers.push(server);
            if (fs.existsSync('Saves/' + serverData.id + '.json')) {
                JsonReader.readData(server);
            } else {
                JsonWriter.writeData(server);
            }
        }
    }

    removeServer(serverId) {
        let index = 0;
        //get index of server
        for (let i = 0; i < this.servers.length; i++) {
            if (this.servers[i].id === serverId) {
                index = i;
                break;
            }
        }

        //delete json file of server
        try {
            fs.unlinkSync("Saves/" + serverId + ".json");
        } catch (err) {
            console.error(err)
        }

        //delete server from servers array
        this.servers.splice(index, 1);
    }

    exist(serverId) {
        let found = false;
        this.servers.forEach(server => {
            if (server.getId() == serverId) {
                found = true;
                return found;
            }
        });
        return found;
    }

    getServer(serverId) {
        let result = null;
        this.servers.forEach(server => {
            if (server.getId() == serverId) {
                result = server;
            }
        });
        return result;
    }

    updateServer(serverId) {
        let server = this.getServer(serverId);
        if (server.getParsingStatus()) {
            server.setParsingStatus(false);
        } else {
            server.setParsingStatus(true);
        }
    }

    preventServers(){
        this.servers.forEach(server => {
            
        });
    }

    getServers() {
        return this.servers;
    }
}

module.exports = ServerManager;