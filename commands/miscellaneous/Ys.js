const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
let { YScript, version } = require("yscript");
YScript = new YScript();

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                YScript.load(this.message.content.split(" ").slice(1).join(" "));
                let evaluation = YScript.run();
                let embed = new Discord.RichEmbed()
                .setAuthor(this.message.author.tag, this.message.author.displayAvatarURL)
                .setColor("#2980b9")
                .setDescription("```ini\n" + (typeof evaluation === "object" && evaluation != "" ? evaluation.join("") : "No response.") + "\n```")
                .setFooter(`YScript version ${version}`);
                this.message.channel.send(embed);
            } catch (e) {
                this.message.channel.send("`" + e.toString() + "`");
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
        if (this.commands.miscellaneous.ys.status) {
            this._run(this.message);
        }
    }
}
