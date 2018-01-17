module.exports = (Discord, message) => {
	if(message.channel.type === "text") {
	message.channel.send(new Discord.RichEmbed()
	.setTitle("Channel Information")
	.setColor("RANDOM")
	.setDescription("Here are some information about **this** channel.")
	.addField("Channel name", message.channel.name)
	.addField("Created At", new Date(message.channel.createdTimestamp).toLocaleString())
	.addField("Category", message.channel.parent ? message.channel.parent.name : "/")
	.addField("Position", message.channel.calculatedPosition)
	.addField("Members", message.channel.members.size)
	.addField("Is NSFW", message.channel.nsfw ? "Yes" : "No")
	.addField("Topic", message.channel.topic ? message.channel.topic : "/")
	.addField("Is someone typing?", message.channel.typing ? "Yes" : "No")
	);
	}
};
