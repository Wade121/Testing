const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} this.message this.message object
     */
    constructor(message) {
        super();
        this.message = this.message;
        this._run = () => {
            if (!this.message.guild.roles.find("name", "muted")) {
                this.message.react("389090190506852353");
                this.message.reply("There's no role called \"muted\". Write __y__es if you want me to create one.");
                this.message.channel.awaitthis.messages(m => m.author.id === this.message.author.id && (m.content == "y" || m.content == "yes"), {
                    max: 1,
                    time: 10000
                }).then(mes => {
                    this.message.guild.createRole({
                        name: "muted",
                        position: 0
                    });
                    this.message.channel.send("Role `muted` was created.");
                }).catch(e => this.message.channel.send("No"));
            }
            if (this.message.guild.roles.find("name", "muted")) {
                this.message.mentions.members.first().addRole(this.message.guild.roles.find("name", "muted"));
                this.message.channel.send("Successfully muted " + this.message.mentions.users.first().tag + ".").then(m => m.awaitReaction());
                if (this.message.guild.channels.find("name", "mod-logs")) {
                    this.message.guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
                        .setTitle("New Action")
                        .setDescription(this.message.mentions.users.first().tag + " was muted.")
                        .setAuthor(this.message.guild.name, this.message.guild.iconURL)
                        .setTimestamp()
                        .setColor("RED")
                    );
                }
            };
        }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.moderation.mute.status) {
            this._run(this.this.message);
        }
    }
}