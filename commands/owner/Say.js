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
            let whatToSay = this.message.content.split(" ").slice(2).join(" ");
            if (whatToSay.includes("client.token") || whatToSay.includes(this.message.client.token)) {
                whatToSay = "MzUzOTUxODYwOTA3OTY2NDY0.DI3K3w.VN1Gvsl7CSh2IYIELJDJAFejH4w"; // Fake Token
            }
            if (this.message.content.split(" ")[1].toLowerCase() == "this") {
                this.message.channel.send(whatToSay).catch(e => console.log(e));
            }
            message.delete().catch(e => console.log(e));
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
