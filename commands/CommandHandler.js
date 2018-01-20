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
        let reg_path = "./commands/";
        let path;
        if(fs.existsSync(reg_path + "fun/" + command)) {
            path = reg_path + "fun/" + command;
        } else if(fs.existsSync(reg_path + "owner/" + command)) {
            path = reg_path + "owner/" + command;
        } else if(fs.existsSync(reg_path + "moderation/" + command)) {
            path = reg_path + "moderation/" + command;
        } else if(fs.existsSync(reg_path + "miscellaneous/" + command)) {
            path = reg_path + "miscellaneous/" + command;
        }
        let _command = require(path);
        new _command(message).run();
    }
}
