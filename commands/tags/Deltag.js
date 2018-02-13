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
                let target = await db.get('select * from tags where name="' + this.message.content.split(" ")[1] + '" ' + (this.message.author.id != this.owner ? 'and authorid="' + this.message.author.id + '"' : ';'));
                if (!target) return this.message.reply("you either aren't owner of the tag or tag wasn't found.");
                db.run('delete from tags where name="' + this.message.content.split(" ")[1] + '"').then(q => this.message.reply("tag removed!"))
            }
             catch (e) {

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
        if (this.commands.tags.ctag.status) {
            this._run(this.message);
        }
    }
}
