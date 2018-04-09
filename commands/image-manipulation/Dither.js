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
                if(this.message.content.split(" ").length < 2 && this.message.attachments.size == 0) return this.message.reply("please enter a valid url.");
                Jimp.read(this.message.content.split(" ").slice(1).join(" ") || this.message.attachments.first().url).then(buffer => {
                    buffer.dither565();
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(console.error);
                function sendBuffer(err, buff){
                    message.channel.send("Requested by: " + message.author.tag,new Discord.Attachment(buff, "dither.png")).catch(console.error);
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
        if (this.commands["image-manipulation"].dither.status) {
            this._run(this.message);
        }
    }
}
