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
                if(this.message.content.split(" ").length < 1) return this.message.reply("i can't read your mind, please tell me your problem.");
                this.message.delete();
                this.message.client.users.get("312715611413413889").send(new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .addField(`Reporter: **${this.message.author.tag}**`, "\u200b")
                    .addField(`Guild: **${!this.message.guild ? "/" : this.message.guild.name}**`, `Guild members: **${!this.message.guild ? "/" : this.message.guild.memberCount}**`)
                    .addField(`Message`, "```https\n" + this.message.content.split(" ").slice(1).join(" ") + "\n```")
                ).catch(e => this.message.reply("An error occured: `" + e + "`"));
                this.message.reply("Bug has been submitted!");
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
        if(new bot().commands.miscellaneous.report.status){
            this._run(this.message);
        }
    }
};
