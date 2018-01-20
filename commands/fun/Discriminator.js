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
            this.message.client.users.filter(u => u.discriminator === this.message.content.split(" ")[1]).size > 0 ? this.message.reply("```js\n" + this.message.client.users.filter(u => u.discriminator === this.message.content.split(" ")[1]).map(u => u.tag).join(",\n") + "\n```").catch(e => console.log(e)) : this.message.reply("No users with that discriminator found.").catch(e => console.log(e));
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
