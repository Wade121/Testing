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
            try {
                this.message.channel.fetchMessages({limit: 15}).then(fetched => {
                    this.message.channel.bulkDelete(fetched.filter(a => a.author.id === this.message.client.user.id)).then(m => {
                        this.message.reply("Undone messages.").then(msg => {
                            msg.delete(2500);
                        })
                    });
                })
            } catch (e) {

            }
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.moderation.undo.status) {
            this._run(this.message);
        }
    }
}