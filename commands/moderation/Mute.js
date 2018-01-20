const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message Message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                if(this.message.mentions.members.first().roles.has(this.message.guild.roles.find("name", "muted"))) return message.reply("mentioned user is already muted.");
                if(this.message.guild.roles.find("name", "muted")){
                    this.message.mentions.members.first().addRole(this.message.guild.roles.find("name", "muted"));
                    this.message.reply("successfully muted " + message.mentions.users.first().tag)
                }else{
                    this.message.guild.createRole({name: "muted"}).then(r => this.message.reply("created a role called 'muted' because there was no and added it to " + this.message.mentions.users.first().tag));
                    this.message.mentions.members.first().addRole(this.message.guild.roles.find("name", "muted"));
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
        if (this.commands.moderation.mute.status) {
            this._run(this.message);
        }
    }
}
