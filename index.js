console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const CommandsController = require("./Controller/CommandsController");
const Client = new Discord.Client;
const commandPrefix = "/";

Client.on("ready", ()=>{
    console.log("...Bot started !");
});

let controller = new CommandsController(Client, commandPrefix);
controller.listen();

Client.login(auth.TOKEN);