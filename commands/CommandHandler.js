const bot = require("../Bot.js");
const Bot = new bot();
const fs = require("fs");
const cdown = require("../Cooldown.js");
const Cooldown = new cdown(3000);

module.exports = class extends bot {
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @returns {boolean} 
     */
    constructor(){
        super();
    }
    static checkCommand(command) {
        return Object.values(this.commands).map(e=>Object.keys(e)).filter(o=>o.includes(command)).length>0;
    }
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @param  {object} message Message object
     */
    static runCommand(command, message) {
        if(Cooldown.check(message.author.id)) return message.reply("Slow down! Wait another `" + ((Cooldown.delay - Cooldown.getTimeDiff(message.author.id)) / 1000) + "` seconds.");
        if(Cooldown.cooldowns.has(message.author.id)) Cooldown.remove(message.author.id);
        Cooldown.add(message.author.id, Date.now());
        let commandInfo = {
            category: Object.entries(this.commands).filter(e=>Object.keys(e[1]).includes(message.content.split(" ")[0].substr(Bot.prefix.length)))[0][0],
            command: message.content.split(" ")[0].substr(this.prefix.length)
        };
        let module = new (require(`./${commandInfo.category}/${commandInfo.command}.js`))(message);
        module.run();
    }

    static async commandCounter(db, message){
        try {
            let commandRuns = await db.get('SELECT * FROM commands WHERE command="' + message.content.split(" ")[0].substr(2).toLowerCase() + '"')
            if(!commandRuns) db.run('INSERT INTO commands VALUES ("' + message.content.split(" ")[0].substr(2).toLowerCase() + '", 1)');
            else {
                commandRuns = parseInt(commandRuns.uses);
                db.run('UPDATE commands SET uses=' + (++commandRuns) + ' WHERE command="' + message.content.split(" ")[0].substr(2).toLowerCase() + '"');
            }
        }catch(e){
            console.log(e);
        }
    }
}
