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
                let args = this.message.content.split(" ").slice(1);
                let guild = this.message.client.guilds.get(args[0]) || this.message.client.guilds.find(g=>new RegExp(args[0], "i").test(g.name)) || this.message.guild;
                if(!guild) this.message.reply("somehow guild is undefined. :thinking:");
                this.message.channel.send(new Discord.RichEmbed()
                    .setTitle("Guild Information")
                    .setColor("RANDOM")
                    .setThumbnail(this.message.guild.iconURL)
                    .setDescription(`Here are some information about the guild *${guild.name}*`)
                    .addField("AFK VoiceChannel", guild.afkChannel ? guild.afkChannel.name : "/")
                    .addField("Available", guild.available ? "Yes" : "No")
                    .addField("Amount of channels", `${guild.channels.filter(c => c.type === "text").size} Textchannels and ${guild.channels.filter(c => c.type === "voice").size} Voicechannels`)
                    .addField("Default Role", guild.defaultRole ? guild.defaultRole.name : "/")
                    .addField("Emojis", guild.emojis.size > 0 ? guild.emojis.array().join(", ") : "/")
                    .addField("Members", guild.memberCount)
                    .addField("Owner", guild.owner.user.tag)
                    .addField("Systemchannel", guild.systemChannel ? guild.systemChannel.name : "/")
                    .addField("Verification Level", guild.verificationLevel)
                );
            } catch (e) {
                this.message.reply(e.toString());
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
