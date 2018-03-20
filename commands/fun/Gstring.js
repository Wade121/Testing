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
            /**
             * Warning! It's pseudo-random, means it is possible to calculate that string.
             * DO NOT USE THIS FOR SENSIBLE DATA SUCH AS PASSWORDS
             */
            try {
                let randomString = Math.random().toString(36).substr(2);
                this.message.reply("Your generated string: " + randomString);
            } catch (e) {
                this.message.reply("An error occured: `" + e + "`");
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
        if(new bot().commands.fun.gstring.status){
            this._run(this.message);
        }
    }
}
