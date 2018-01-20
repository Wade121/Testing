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
                if (!this.message.guild) return;
                this.message.channel.send(new Discord.RichEmbed()
                    .setTitle("Guild Information")
                    .setColor("RANDOM")
                    .setThumbnail(this.message.guild.iconURL)
                    .setDescription("Here are some information about **this** guild.")
                    .addField("AFK VoiceChannel", this.message.guild.afkChannel ? this.message.guild.afkChannel.name : "/")
                    .addField("Available", this.message.guild.available ? "Yes" : "No")
                    .addField("Amount of channels", `${this.message.guild.channels.filter(c => c.type === "text").size} Textchannels and ${this.message.guild.channels.filter(c => c.type === "voice").size} Voicechannels`)
                    .addField("Default Role", this.message.guild.defaultRole ? this.message.guild.defaultRole.name : "/")
                    .addField("Emojis", this.message.guild.emojis.size > 0 ? this.message.guild.emojis.array().join(", ") : "/")
                    .addField("Members", this.message.guild.memberCount)
                    .addField("Owner", this.message.guild.owner.user.tag)
                    .addField("Systemchannel", this.message.guild.systemChannel ? this.message.guild.systemChannel.name : "/")
                    .addField("Verification Level", this.message.guild.verificationLevel)
                );
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
        if (this.commands.miscellaneous.guildinfo.status) {
            this._run(this.message);
        }
    }
}