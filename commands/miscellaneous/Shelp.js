const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
const CommandHandler = require("../CommandHandler.js");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = async () => {
            try {
                let target = this.message.content.split(" ")[1].toLowerCase();
                let category = (this.commands.fun[target] ? 'fun' : null) || (this.commands['image-manipulation'][target] ? 'image-manipulation' : null) || (this.commands.miscellaneous[target] ? 'miscellaneous' : null) || (this.commands.moderation[target] ? 'moderation' : null) || (this.commands.owner[target] ? 'owner' : null) || (this.commands.tags[target] ? 'owner' : null);
                if(!CommandHandler.checkCommand(target)) return this.message.reply("Command not found!");
               let embed = new Discord.RichEmbed()
                   .setTitle("Help")
                   .setDescription("**Command**: " + target + "\n" +
                       "**Arguments**: " + this.commands[category][target].arguments + "\n" +
                       "**Description**: " + this.commands[category][target].description + "\n" +
                       "**Status**: " + this.commands[category][target].status + "\n" +
                       "**Category**: " + category)
                   .setColor('RANDOM');

               this.message.channel.send(embed);
            } catch (e) {

            }
        }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.miscellaneous.shelp.status) {
            this._run(this.message);
        }
    }
}
