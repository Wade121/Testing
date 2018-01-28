const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                if(this.message.content.split(" ").length < 2) return this.message.reply("please enter a valid url.");
                Jimp.read(this.message.content.split(" ").slice(1).join(" ")).then(buffer => {
                    buffer.invert();
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(e => this.message.reply("An error occured: `" + e + "`"));
                function sendBuffer(err, buff){
                    if(err) return this.message.reply("An error occured: `" + err + "`");
                    message.channel.send("Requested by: " + message.author.tag,new Discord.Attachment(buff, "invert.png"));
                }
            } catch (e) {
                this.message.reply("An error occured: `" + e + "`");
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
        if (this.commands["image-manipulation"].invert.status) {
            this._run(this.message);
        }
    }
}