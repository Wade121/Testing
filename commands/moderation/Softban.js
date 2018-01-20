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
                if(this.message.mentions.members.size > 0){
                    this.message.mentions.members.first().ban(7).then(g => g.guild.unban(g.id));
                    this.message.reply("Softbanned " + this.message.mentions.users.first().tag);
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
        if (this.commands.moderation.softban.status) {
            this._run(this.message);
        }
    }
}