const Discord = require("discord.js");
const client = new Discord.Client();
const bot = require("./Bot.js");
const Bot = new bot();
const CommandHandler = require("./commands/CommandHandler.js");

client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm") return;
    if (CommandHandler.checkCommand(message.content.split(" ")[0].substr(1)) && message.content.startsWith(Bot.prefix)) {
        CommandHandler.runCommand(message.content.split(" ")[0].substr(1), message);
    }
});

client.on("guildCreate", async guild => {
        const invite = await guild.channels.first().createInvite({maxAge: 0});
        const owner = await client.fetchUser(Bot.owner);
        owner.send('A new server: **' + guild.name + '**\n**' + guild.memberCount + '** members in it. \nOwner: ' + guild.owner.user.tag + '\n\nInvite: ' + invite.url);
});

client.on("messageReactionAdd", (reaction, user) => {
    if(!user.bot && reaction.message.embeds.length > 0 && reaction.message.author == client.user){
        if(reaction.message.embeds[0].description.startsWith("**Category**: ")){
            reaction.remove(user).catch(e => {});
        }

    }
});

client.login(Bot.token);
