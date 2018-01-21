const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
const EconomyHandler = require("../Economy.js");

module.exports = class extends bot {
    /**
     * @param  {object} message Message object
     */
    constructor(message){
        super();
        this.message = message;
        this._run = () => {
            message.reply("you have " + EconomyHandler.getProperty("money", this.message.author) + "也");
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(this.commands.fun.discriminator.status){
            this._run(this.message);
        }
    }
}
