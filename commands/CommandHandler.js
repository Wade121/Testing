const bot = require("../Bot.js");
const Bot = new bot();
const fs = require("fs");

module.exports = class extends bot {
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @returns {boolean} 
     */
    static checkCommand(command) {
        if(Object.keys(Bot.commands.fun).includes(command) || 
        Object.keys(Bot.commands.owner).includes(command) || 
        Object.keys(Bot.commands.moderation).includes(command) ||
        Object.keys(Bot.commands.miscellaneous).includes(command)) return true;
        else return false;
    }
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @param  {object} message Message object
     */
    static runCommand(command, message) {
        command += ".js";
        command = command.toLowerCase();
        command = command.charAt(0).toUpperCase() + command.substr(1).toLowerCase();
        let _command = require(`./fun/${command}`) || require(`./miscellaneous/${command}`) || require(`./moderation/${command}`) || require(`./owner/${command}`);
        new _command(message).run();
    }
}
