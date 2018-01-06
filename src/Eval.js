module.exports = function(message, evalArgs, Discord, client){
	try {
    const NS_PER_SEC = 1e9;
				let col = "RANDOM";
                let tb = Date.now();
                let time = process.hrtime();
                let evaluation = eval(message.content.substr(6));
                let ellapsed = Date.now() - tb;
                let diff = process.hrtime(time); 
                diff = diff[0] * NS_PER_SEC + diff[1];
                let type = typeof(evaluation);
                evaluation = require("util").inspect(eval(message.content.substr(6))).substr(0,1010);
                if(typeof(evaluation) == "string"){if(evaluation.includes(client.token)) evaluation = "\"- you tried -\"";}
              message.channel.send(new Discord.RichEmbed().setTitle("Evaluation").setColor(col).setDescription("Evaluation took `" + diff + "` nanoseconds (`"+ellapsed+"` ms)").addField(":inbox_tray: Input", "```js\n" + message.content.substr(6) + "\n```").addField(":outbox_tray: Output", "```js\n" + evaluation + "\n```").addField(":bookmark_tabs: Type", "```js\n" + type + "\n```").setTimestamp());

            } catch (e) {
                message.channel.send(new Discord.RichEmbed().setTitle("Evaluation").setColor(0xd32f2f).setDescription("```https\n" + e + "\n```"));
            }
}
/*
const NS_PER_SEC = 1e9;
const time = process.hrtime(); 

58*618; // oder irgendwas anderes

const diff = process.hrtime(time); 
diff[0] * NS_PER_SEC + diff[1]; // die nanosekunden
*/