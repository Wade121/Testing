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
                const NS_PER_SEC = 1e9;
                let col = "RANDOM";
                let tb = Date.now();
                let time = process.hrtime();
                let evaluation = eval(this.message.content.substr(6));
                let ellapsed = Date.now() - tb;
                let diff = process.hrtime(time);
                diff = diff[0] * NS_PER_SEC + diff[1];
                let type = typeof (evaluation);
                evaluation = require("util").inspect(eval(this.message.content.substr(6))).substr(0, 1010);
                if (typeof (evaluation) == "string") {
                    if (evaluation.includes(this.message.client.token)) evaluation = "\"- you tried -\"";
                }
                this.message.channel.send(new Discord.RichEmbed().setTitle("Evaluation").setColor(col).setDescription("Evaluation took `" + diff + "` nanoseconds (`" + ellapsed + "` ms)").addField(":inbox_tray: Input", "```js\n" + this.message.content.substr(6) + "\n```").addField(":outbox_tray: Output", "```js\n" + evaluation + "\n```").addField(":bookmark_tabs: Type", "```js\n" + type + "\n```").setTimestamp());

            } catch (e) {
                message.channel.send(new Discord.RichEmbed().setTitle("Evaluation").setColor(0xd32f2f).setDescription("```https\n" + e + "\n```"));
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
        if (this.commands.owner.eval.status) {
            this._run(this.message);
        }
    }
}