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
                this.message.reply("https://gist.github.com/y21/f7fdd0df8865e3dc6b338b37717ab8ef");
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
        if (this.commands.miscellaneous.help.status) {
            this._run(this.message);
        }
    }
}