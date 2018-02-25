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
        this._run = () => { this.message.client.guilds.forEach(g => { g.fetchMembers(); }); this.message.reply("Fetched " + this.message.client.users.size + " users in " + this.message.client.guilds.size + " guilds.") }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.owner.fetch.status) {
            this._run(this.message);
        }
    }
}
