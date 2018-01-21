const Discord = require("discord.js");
const client = new Discord.Client();
const bot = require("./Bot.js");
const Bot = new bot();
const CommandHandler = require("./commands/CommandHandler.js");
const EconomyHandler = require("./commands/Economy.js");

client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm") return;
    if (CommandHandler.checkCommand(message.content.split(" ")[0].substr(1)) && message.content.startsWith(Bot.prefix)) {
        CommandHandler.runCommand(message.content.split(" ")[0].substr(1), message);
    }
    // Economy
    if(!EconomyHandler.userInDB(message)) {
        EconomyHandler.registerUser(message.author);
    }
    EconomyHandler.applyMoney(Math.floor(Math.random() * 30) + 10, message.author);
});



client.login(Bot.token);