const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                if(this.message.mentions.users.size > 0){
                    this.message.guild.unban(this.message.mentions.users.first().id);
                }else{
                    this.message.reply("please mention a user.");
                }
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
        if (this.commands.moderation.unban.status) {
            this._run(this.message);
        }
    }
}