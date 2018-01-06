module.exports = function(message, client, Discord, version){
	message.channel.startTyping();
	setTimeout(() => {
	message.guild.fetchMembers();
	let money = 0;
	message.guild.members.forEach(m => {
		if(require("./db.json")[m.user.id]){
			money += parseInt(require("./db.json")[m.user.id].dollar);
		}
	});
	message.channel.send(new Discord.RichEmbed().setColor("RANDOM").addField("Guilds", client.guilds.size).addField("Channels", client.channels.size).addField("**Cached** Users", client.users.size).addField("$ in this guild", money + "$").addField("Discord.js Version", Discord.version).addField("Scale Version", version).addField("Uptime in Seconds ", (client.uptime / 1000)).addField("Discord Server", "https://discord.gg/9TNcqZV").addField("Author", "y21#0909").setTimestamp().setThumbnail(message.author.avatarURL)); message.channel.stopTyping();
	}, Math.floor(Math.random() * 1000) + 100);
}