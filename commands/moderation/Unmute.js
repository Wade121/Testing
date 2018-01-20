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
                if (!this.message.guild.roles.find("name", "muted")) {
                    this.message.react("389090190506852353");
                    return this.message.reply("There's no role called \"muted\".");
                }
                this.message.mentions.members.first().removeRole(this.message.guild.roles.find("name", "muted").id);
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
        if (this.commands.moderation.unmute.status) {
            this._run(this.message);
        }
    }
}