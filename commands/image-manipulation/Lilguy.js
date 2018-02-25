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
                let text = this.message.content.split(" ").slice(1).join(" ");
                if(text.length > 30) return this.message.reply(this.langset[lang.lang || 'en'].TEXT_TOO_BIG);
                Jimp.read("https://i.imgur.com/BIu8Phx.png").then(async (buffer) => {
                    let font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
                    buffer.print(font, 125, 505, text)
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(console.error);
                function sendBuffer(err, buff){
                    message.channel.send(langset[lang.lang || 'en'].REQUESTED_BY.replace(/\[USER\]/g, message.author.tag),new Discord.Attachment(buff, "invert.png")).catch(console.error);
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
        if (this.commands["image-manipulation"].lilguy.status) {
            this._run(this.message);
        }
    }
}
