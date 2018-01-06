module.exports = function(client, message, Discord, prefix){
  message.channel.startTyping();
  setTimeout(() => { message.channel.send(new Discord.RichEmbed().setThumbnail(message.author.avatarURL).setTimestamp().setColor("RANDOM").addField("Commands", require("./ModuleList.js")(prefix).join("\n" + prefix), true).addField("Mod Commands", require("./ModerationModulesList.js")(prefix).join("\n" + prefix))); message.channel.stopTyping(); }, Math.floor(Math.random() * 1000) + 100);
};
