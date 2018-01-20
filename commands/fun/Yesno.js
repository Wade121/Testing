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
            this.message.channel.send(Math.random() > Math.random() ? "Yes" : "No").catch(e => console.log(e));
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(this.commands.fun.yesno.status){
            this._run(this.message);
        }
    }
}
