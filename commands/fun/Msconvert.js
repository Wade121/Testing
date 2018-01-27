const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message Message object
     */
    constructor(message){
        super();
        this.message = message;
        this._run = () => {
            try {
                if(parseInt(this.message.content.split(" ")[1]).toString() == "NaN") return this.message.reply("Input is not a number.");
                function dhm_convert(ms) {
                    let days, daysms, hours, hoursms, minutes, minutesms, sec;
                    days = Math.floor(ms / (24 * 60 * 60 * 1000));
                    daysms = ms % (24 * 60 * 60 * 1000);
                    hours = Math.floor((daysms) / (60 * 60 * 1000));
                    hoursms = ms % (60 * 60 * 1000);
                    minutes = Math.floor((hoursms) / (60 * 1000));
                    minutesms = ms % (60 * 1000);
                    sec = Math.floor((minutesms) / (1000));
                    return days + " days, " + hours + " hours, " + minutes + " minutes, " + sec + " seconds"
                }
                this.message.channel.send("Date: ```https\n" + dhm_convert(this.message.content.split(" ")[1]) + "\n```").catch(e => this.message.reply("An error occured: `" + e + "`"));
            } catch (e) {
                this.message.reply("An error occured: `" + e + "`");
            }
        };
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn){
        this._run = fn;
    }
    run() {
        if(new bot().commands.fun.msconvert.status){
            this._run(this.message);
        }
    }
}
