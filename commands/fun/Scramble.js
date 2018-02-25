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
        try {
            const scramble = words => words.split(" ").sort(() => Math.random() > 0.5).join(" ");
            message.channel.send("Scrambled text: " + scramble(message.content.substr(10)));
        }catch(e){
            // Do absolutely nothing
        }};
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(this.commands.fun.reverse.status){
            this._run(this.message);
        }
    }
}
