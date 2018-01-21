const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                this.message.channel.startTyping();
                setTimeout(() => {
                    this.message.channel.send(new Discord.RichEmbed().setTitle("Add me!").setDescription("Add Scale to your Discord Server: https://discordapp.com/oauth2/authorize?client_id=389019692343230475&permissions=8&scope=bot").setTimestamp().setColor("RANDOM").setThumbnail(this.message.author.avatarURL));
                    this.message.channel.stopTyping();
                }, Math.floor(Math.random() * 1000) + 100);
            } catch (e) {

            }
        }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.miscellaneous.invite.status) {
            this._run(this.message);
        }
    }
}