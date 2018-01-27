const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message Message object
     */
    constructor(message){
        super();
        this.message = message;
        this._run = () => {
            this.message.channel.send(Math.floor(Math.random() * 100) + 1).catch(e => this.message.reply("An error occured: `" + e + "`"));
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(new bot().commands.fun.roll.status){
            this._run(this.message);
        }
    }
}
