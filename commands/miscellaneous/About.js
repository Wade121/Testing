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
                    this.message.channel.send(new Discord.RichEmbed().setColor("RANDOM").addField("Guilds", this.message.client.guilds.size).addField("Channels", this.message.client.channels.size).addField("**Cached** Users", this.message.client.users.size).addField("Discord.js Version", Discord.version).addField("Scale Version", this.version).addField("Uptime in Seconds ", (this.message.client.uptime / 1000)).addField("Support Server", "https://discord.gg/9TNcqZV").addField("Bot owner", "y21#0909").setTimestamp().setThumbnail(this.message.author.avatarURL));
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
        if (this.commands.miscellaneous.about.status) {
            this._run(this.message);
        }
    }
}