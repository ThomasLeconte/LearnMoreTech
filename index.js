console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const MainController = require("./Controller/MainController");
const Client = new Discord.Client;
const ServerManager = require("./Tools/ServerManager");

Client.on("ready", ()=>{
    console.log("...Bot started !");
    
    let manager = new ServerManager();
    manager.initialize(Client);
    let controller = new MainController(Client, manager);
    controller.listen();
});

Client.login(auth.TOKEN);