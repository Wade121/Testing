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
                if (this.message.mentions.users.size == 0)
                    this.message.channel.send(new Discord.RichEmbed()
                        .setTitle("User Info")
                        .setColor("RANDOM")
                        .setDescription("Here are some information about you")
                        .addField("Tag", this.message.author.tag)
                        .addField("Avatar URL", this.message.author.displayAvatarURL)
                        .addField("Registered", new Date(this.message.author.createdAt).toLocaleDateString())
                        .addField("Joined", new Date(this.message.member.joinedAt).toLocaleDateString())
                        .addField("Roles", this.message.member.roles.map(r => r.name).join(", "))
                        .addField("Nickname", this.message.member.nickname)
                        .addField("Playing", this.message.author.presence.game ? this.message.author.presence.game.name : "/")
                        .addField("Highest Role", this.message.member.highestRole.name)
                    ).catch(e => console.log(e));
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
        if (this.commands.miscellaneous.userinfo.status) {
            this._run(this.message);
        }
    }
}