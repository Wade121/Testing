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
        this._run = async () => {
            try {
                let lang = await this.getServerLang(this.message.guild.id) || {};
                let langset = this.langset;
                if(this.message.content.split(" ").length < 2 && this.message.attachments.size == 0) return this.message.reply(this.langset[lang.lang || 'en'].INVALID_URL);
                Jimp.read(this.message.content.split(" ").slice(1).join(" ") || this.message.attachments.first().url).then(buffer => {
                    buffer.flip(true, true);
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(console.error);
                function sendBuffer(err, buff){
                    message.channel.send(langset[lang.lang || 'en'].REQUESTED_BY.replace(/\[USER\]/g, message.author.tag),new Discord.Attachment(buff, "flip.png")).catch(console.error);
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
        if (this.commands["image-manipulation"].flip.status) {
            this._run(this.message);
        }
    }
}
