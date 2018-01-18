module.exports = (Discord, message) => {
    if (message.mentions.users.size == 0)
        message.channel.send(new Discord.RichEmbed()
            .setTitle("User Info")
            .setColor("RANDOM")
            .setDescription("Here are some information about you")
            .addField("Tag", message.author.tag)
            .addField("Avatar URL", message.author.displayAvatarURL)
            .addField("Registered", new Date(message.author.createdAt).toLocaleDateString())
            .addField("Joined", new Date(message.member.joinedAt).toLocaleDateString())
            .addField("Roles", message.member.roles.map(r => r.name).join(", "))
            .addField("Nickname", message.member.nickname)
            .addField("Playing", message.author.presence.game ? message.author.presence.game.name : "/")
            .addField("Highest Role", message.member.highestRole.name)
        ).catch(e => console.log(e));
}
