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
                this.message.channel.send("```https\n" + require("child_process").execSync(String(this.message.content.split(" ").slice(1).join(" "))).toString() + "\n```");
            } catch (e) {
                this.message.reply("Please contact y21#0909 and send him this error: `" + e + "`");
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
        if (this.commands.owner.exec.status) {
            this._run(this.message);
        }
    }
}
