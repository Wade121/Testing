const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = async () => {
            try {
                let page1 = new Discord.RichEmbed()
                    .setTitle("Help - Page 1")
                    .setDescription("**Category**: Fun\n\n" +
                        Object.keys(this.commands.fun).join("\n"))
                    .setFooter("Tip: " + this.prefix + "help <command> for description, amount of parameters and more")
                    .setColor('RANDOM');
                let page2 = new Discord.RichEmbed()
                    .setTitle("Help - Page 2")
                    .setDescription("**Category**: Image-manipulation\n\n" +
                        Object.keys(this.commands['image-manipulation']).join("\n"))
                    .setFooter("Tip: " + this.prefix + "help <command> for description, amount of parameters and more")
                    .setColor('RANDOM');
                let page3 = new Discord.RichEmbed()
                    .setTitle("Help - Page 3")
                    .setDescription("**Category**: Miscellaneous\n\n" +
                        Object.keys(this.commands.miscellaneous).join("\n"))
                    .setFooter("Tip: " + this.prefix + "help <command> for description, amount of parameters and more")
                    .setColor('RANDOM');
                let page4 = new Discord.RichEmbed()
                    .setTitle("Help - Page 4")
                    .setDescription("**Category**: Moderation\n\n" +
                        Object.keys(this.commands.moderation).join("\n"))
                    .setFooter("Tip: " + this.prefix + "help <command> for description, amount of parameters and more")
                    .setColor('RANDOM');
                let page5 = new Discord.RichEmbed()
                    .setTitle("Help - Page 5")
                    .setDescription("**Category**: Owner\n\n" +
                        Object.keys(this.commands.owner).join("\n"))
                    .setFooter("Tip: " + this.prefix + "help <command> for description, amount of parameters and more")
                    .setColor('RANDOM');
                let helpMSG = await this.message.channel.send(page1);
                helpMSG.react('⬅').then(m => m.message.react('➡'));
                const filter = (reaction, user) => user.id == message.author.id;
                const collector = helpMSG.createReactionCollector(filter, { time: 0 });
                collector.on('collect', (reaction) => {
                    let desc = helpMSG.embeds[0].description;
                    if(reaction.emoji.name == '➡'){
                        if(desc.startsWith("**Category**: Owner")) return;
                        if(desc.startsWith("**Category**: Fun")) helpMSG.edit(page2);
                        if(desc.startsWith("**Category**: Image-manipulation")) helpMSG.edit(page3);
                        if(desc.startsWith("**Category**: Miscellaneous")) helpMSG.edit(page4);
                        if(desc.startsWith("**Category**: Moderation")) helpMSG.edit(page5);
                    } else if(reaction.emoji.name == "⬅"){
                        if(desc.startsWith("**Category**: Fun")) return;
                        if(desc.startsWith("**Category**: Image-manipulation")) helpMSG.edit(page1);
                        if(desc.startsWith("**Category**: Miscellaneous")) helpMSG.edit(page2);
                        if(desc.startsWith("**Category**: Moderation")) helpMSG.edit(page3);
                        if(desc.startsWith("**Category**: Owner")) helpMSG.edit(page4);
                    }
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
        if (this.commands.miscellaneous.help.status) {
            this._run(this.message);
        }
    }
}
