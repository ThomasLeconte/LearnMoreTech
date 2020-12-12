console.log("Bot is starting ...");
const Discord = require("discord.js");
const auth = require("./auth.json");
const MainController = require("./Controller/MainController");
const Client = new Discord.Client;
const commandPrefix = "/";

Client.on("ready", ()=>{
    console.log("...Bot started !");
});

let controller = new MainController(Client);
controller.listen();

Client.login(auth.TOKEN);