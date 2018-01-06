module.exports = function(client, msg){
  client.guilds.forEach(guild => {
    guild.channels.random().send(msg);
  });
}