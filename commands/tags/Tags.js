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
                const tag = await db.all('select * from tags order by uses desc limit 10');
                this.message.channel.send(new Discord.RichEmbed()
                    .setTitle("Top 10 used tags")
                    .setDescription(tag.map(a => a.name + " | Uses: " + a.uses).join("\n"))
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
        if (this.commands.tags.tag.status) {
            this._run(this.message);
        }
    }
}
