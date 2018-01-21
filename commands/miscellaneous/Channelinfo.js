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
                if (this.message.channel.type === "text") {
                    this.message.channel.send(new Discord.RichEmbed()
                        .setTitle("Channel Information")
                        .setColor("RANDOM")
                        .setDescription("Here are some information about **this** channel.")
                        .addField("Channel name", this.message.channel.name)
                        .addField("Created At", new Date(this.message.channel.createdTimestamp).toLocaleString())
                        .addField("Category", this.message.channel.parent ? this.message.channel.parent.name : "/")
                        .addField("Position", this.message.channel.calculatedPosition)
                        .addField("Members", this.message.channel.members.size)
                        .addField("Is NSFW", this.message.channel.nsfw ? "Yes" : "No")
                        .addField("Topic", this.message.channel.topic ? this.message.channel.topic : "/")
                        .addField("Is someone typing?", this.message.channel.typing ? "Yes" : "No")
                    );
                }
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
        if (this.commands.miscellaneous.channelinfo.status) {
            this._run(this.message);
        }
    }
}