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
                let regexp = this.message.content.split(" ")[2];
                const NS_PER_SEC = 1e9;
                let col = "RANDOM";
                let tb = Date.now();
                let time = process.hrtime();
                let exp = regexp.test(this.message.content.split(" ")[1]);
                console.log(this.message.content.split(" ")[1] + " | " + regexp);
                let ellapsed = Date.now() - tb;
                let diff = process.hrtime(time);
                diff = diff[0] * NS_PER_SEC + diff[1];
                this.message.channel.send(new Discord.RichEmbed().setTitle("RegExp Test").setColor(col).setDescription("Regexp took `" + diff + "` nanoseconds (`" + ellapsed + "` ms)").addField(":inbox_tray: Input (expression)", "```js\n" + this.message.content.split(" ")[1] + "\n```").addField(":outbox_tray: Output (RegExp)", "```js\n" + exp + "\n```").setTimestamp());
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
        if (this.commands.owner.regexp.status) {
            this._run(this.message);
        }
    }
}
