const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message Message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            this.message.client.user.setActivity(this.message.content.substr(this.message.content.indexOf(" ")), {type: 'WATCHING'});
            this.message.reply("Set status to `" + this.message.content.substr(this.message.content.indexOf(" ")) + "`").catch(e => console.log(e));
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.fun.ping.status) {
            this._run(this.message);
        }
    }
}
