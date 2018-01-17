module.exports = (Discord, message) => {
	if(!message.guild) return;
	message.channel.send(new Discord.RichEmbed()
	.setTitle("Guild Information")
	.setColor("RANDOM")
	.setThumbnail(message.guild.iconURL)
	.setDescription("Here are some information about **this** guild.")
	.addField("AFK VoiceChannel", message.guild.afkChannel ? message.guild.afkChannel.name : "/")
	.addField("Available", message.guild.available ? "Yes" : "No")
	.addField("Amount of channels", `${message.guild.channels.filter(c => c.type === "text").size} Textchannels and ${message.guild.channels.filter(c => c.type === "voice").size} Voicechannels`)
	.addField("Default Role", message.guild.defaultRole ? message.guild.defaultRole.name : "/")
	.addField("Emojis", message.guild.emojis.size > 0 ? message.guild.emojis.array().join(", ") : "/")
	.addField("Members", message.guild.memberCount)
	.addField("Owner", message.guild.owner.user.tag)
	.addField("Systemchannel", message.guild.systemChannel ? message.guild.systemChannel.name : "/")
	.addField("Verification Level", message.guild.verificationLevel)
	);
}
