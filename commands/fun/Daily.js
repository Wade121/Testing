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
            const EconomyHandler = require("../Economy.js");
            if(Date.now() - EconomyHandler.getProperty("lastDaily", this.message.author) > 86400000){
                EconomyHandler.applyDaily(this.message.author);
                message.reply("successfully redeemed your daily reward of 1000也");
            }else{
                message.reply("please wait until " + new Date(EconomyHandler.getProperty("lastDaily", this.message.author) + 86400000).toLocaleString());
            }
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(this.commands.fun.daily.status){
            this._run(this.message);
        }
    }
}
