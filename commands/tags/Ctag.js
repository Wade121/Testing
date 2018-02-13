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
                let _q = await db.get('select * from tags where name="' + this.message.content.split(" ")[1] + '"');
                if(_q) return this.message.reply("tag with that name already exists!");
                db.run('insert into tags values ("' + this.message.author.id + '", "' + this.message.content.split(" ").slice(2).join(" ") + '", "' + Date.now() + '", 0, "' + this.message.content.split(" ")[1] + '")').then(r => {
                    this.message.reply("tag successfully created!");
                }).catch(() => {
                    this.message.react("389090190506852353");
                });
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
        if (this.commands.tags.ctag.status) {
            this._run(this.message);
        }
    }
}
