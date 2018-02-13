const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
// Database requiring
const db = require('sqlite');
db.open('./scale.sqlite');


module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = async () => {
            try {
                const tag = await db.get('select * from tags where name="' + this.message.content.split(" ").slice(1).join(" ") + '"');
                const tagowner = await this.message.client.fetchUser(tag.authorid);
                if(!tag || this.message.content.split(" ").slice(1).length < 1) return this.message.react('389090190506852353');
                this.message.channel.send(new Discord.RichEmbed()
                    .setAuthor(tagowner.tag, tagowner.displayAvatarURL)
                    .setDescription(tag.content)
                );
                db.run('update tags set uses=' + (++tag.uses) + ' where name="' + this.message.content.split(" ").slice(1).join(" ") + '"');
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
        if (this.commands.tags.tag.status) {
            this._run(this.message);
        }
    }
}
