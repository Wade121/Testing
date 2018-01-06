module.exports = function(message, client, Discord){
	message.channel.startTyping();
	
	setTimeout(() => { message.channel.send(new Discord.RichEmbed().setTitle("Add me!").setDescription("Add Scale to your Discord Server: https://discordapp.com/oauth2/authorize?client_id=389019692343230475&permissions=8&scope=bot").setTimestamp().setColor("RANDOM").setThumbnail(message.author.avatarURL)); message.channel.stopTyping();
	}, Math.floor(Math.random() * 1000) + 100);
}