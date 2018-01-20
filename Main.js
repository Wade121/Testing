const Discord = require("discord.js");
const client = new Discord.Client();
const bot = require("./Bot.js");
const Bot = new bot();
const CommandHandler = require("./commands/CommandHandler.js");

client.on("message", message => {
    if (CommandHandler.checkCommand(message.content.split(" ")[0].substr(1)) && message.content.startsWith(Bot.prefix)) {
        CommandHandler.runCommand(message.content.split(" ")[0].substr(1), message);
    }
});



client.login(Bot.token);
