const Discord = require("discord.js");
const client = new Discord.Client();
const startUpTime = new Date(), version = "1.1", app = "Scale", prefix = ":";
// Module Imports
const helpModule = require("./src/HelpCommand.js");
const evalme = require("./src/Eval.js");
const invite = require("./src/InviteBot.js");
const about = require("./src/About.js");
const say = require("./src/Say.js");
const announce = require("./src/Announcement.js");
const db = require("./src/db.json");
const fs = require("fs");

client.on("ready", () => {
  console.log(app + " v" + version + " > Connected to DiscordAPI in " + (new Date() - startUpTime) + "ms.");
  client.user.setGame(app + " " + version + " | " + prefix + "help");
  client.user.setStatus("idle");
});
client.on("message", (message) => {
  if(message.author.id === client.user.id) return;
  const args = message.content.split(" ");
  //if(message.author.bot) return;
  if(!message.guild) return message.channel.send("Message was sent out of a server.");
  if(message.content.toLowerCase().startsWith(prefix + "help")){
    helpModule(client, message, Discord, prefix);
  }
  else if(message.content.toLowerCase() === prefix + "ping"){
	  message.channel.send("Pinging... ").then(m => m.edit("Heartbeat: `" + (new Date() - m.createdAt) + "ms`\nAverage Ping: `" + client.ping + "ms`"));
  }
  else if(message.content.toLowerCase() === prefix + "invite"){
	  invite(message, client, Discord);
  }
  else if(message.content.toLowerCase() === prefix + "about"){
	  about(message, client, Discord, version);
  }
  else if(message.content.toLowerCase().includes(prefix + "profile")){
	  if(message.mentions.users.size === 0){
		  if(db[message.author.id]){
		  message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setThumbnail(message.author.avatarURL).addField("Dollar", db[message.author.id].dollar).addField("First Message", new Date(db[message.author.id].firstMessage)).setTimestamp());
		  }else{
			  message.react("389090190506852353");
		  }
	  }else if(message.mentions.users.size > 0){
		  if(db[message.mentions.users.first().id]){
		  message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setThumbnail(message.mentions.users.first().avatarURL).addField("Dollar", db[message.mentions.users.first().id].dollar).addField("First Message", new Date(db[message.mentions.users.first().id].firstMessage)).setTimestamp());
		  }else{
			  message.react("389090190506852353");
		  }
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "clear")){
	  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.react("389090190506852353");
	  try {
		message.channel.bulkDelete(parseInt(message.content.split(" ")[1]));
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "mute")){
	  if(!message.mentions.users.first()) return message.react("389090190506852353");
	  if(!message.member.hasPermission("MANAGE_GUILD")) return message.react("389090190506852353");
	  if(!message.guild.roles.find("name", "muted")){
		  message.react("389090190506852353");
		  message.reply("There's no role called \"muted\". Write __y__es if you want me to create one.");
		  message.channel.awaitMessages(m=> m.author.id === message.author.id && (m.content == "y" || m.content == "yes"), {max:1, time:10000}).then(mes => {message.guild.createRole({name:"muted", position: 0}); message.channel.send("Role `muted` was created.");}).catch(e => message.channel.send("No"));
	  }
	  if(message.guild.roles.find("name", "muted")){
	  message.mentions.members.first().addRole(message.guild.roles.find("name", "muted"));
	  message.channel.send("Successfully muted " + message.mentions.users.first().tag + ".").then(m => m.awaitReaction());
	  if(message.guild.channels.find("name", "mod-logs")){
    message.guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
      .setTitle("New Action")
      .setDescription(message.mentions.users.first().tag + " was muted.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTimestamp()
      .setColor("RED")
    );
  }
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "unmute")){
	  try {
	  if(!message.mentions.users.first()) return message.react("389090190506852353");
	  if(!message.member.hasPermission("MANAGE_GUILD")) return message.react("389090190506852353");
	  if(!message.guild.roles.find("name", "muted")){
		  message.react("389090190506852353");
		  return message.reply("There's no role called \"muted\".");
	  }
	  message.mentions.members.first().removeRole(message.guild.roles.find("name", "muted").id);
      if(message.guild.channels.find("name", "mod-logs")){
    message.guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
      .setTitle("New Action")
      .setDescription(message.mentions.users.first().tag + " was unmuted.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTimestamp()
      .setColor("GREEN")
    );
  }
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "ban")){
	  if(!message.member.hasPermission("BAN_MEMBERS")) return message.react("389090190506852353");
	  try {
	  message.mentions.members.first().ban();
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "unban")){
	  if(!message.member.hasPermission("BAN_MEMBERS")) return message.react("389090190506852353");
	  try {
	  message.guild.unban(message.mentions.users.first());
    if(message.guild.channels.find("name", "mod-logs")){
     message.guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
      .setTitle("New Action")
      .setDescription(message.mentions.users.first().tag + " was unbanned.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTimestamp()
      .setColor("GREEN")
    );
  }
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "softban")){
	  if(!message.member.hasPermission()) return message.react("389090190506852353");
	  try {
	  message.mentions.members.first().ban();
	  message.guild.unban(message.mentions.users.first());
      if(message.guild.channels.find("name", "mod-logs")){
    message.guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
      .setTitle("New Action")
      .setDescription(message.mentions.users.first().tag + " was softbanned.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTimestamp()
      .setColor("ORANGE")
    );
  }
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase().startsWith(prefix + "daily")){
	  try {
	  if(message.mentions.users.size == 0){
		  if(Date.now() - db[message.author.id].dailyDollar >= 86400000){
			  db[message.author.id].dailyDollar = Date.now();
			  db[message.author.id].dollar += 100;
			  message.channel.send("Redeemed 100$ Daily Dollar.");
		  }else{
			  message.channel.send("Please come back later.");
		  }
	  }else if(message.mentions.users.size >= 1 && message.mentions.users.first().id !== message.author.id){
		  if(Date.now() - db[message.author.id].dailyDollar >= 86400000){
			  db[message.author.id].dailyDollar = Date.now();
			  db[message.mentions.users.first().id].dollar += 120;
			  message.channel.send("Your Daily Reward was given to " + message.mentions.users.first().tag + ".");
		  }else{
			  message.channel.send("Please come back later.");
		  }
	  }
	  }catch(e){
		  message.react("389090190506852353");
	  }
  }
  else if(message.content.toLowerCase() === prefix + "leaderboard"){
	  message.guild.fetchMembers();
	  let raw = [];
	  message.guild.members.forEach(member => {
		 if(db[member.user.id]){
			 raw.push(db[member.user.id].dollar + "x" + member.user.id); // dollarXid
		 }
	  });
	  function sortArrays(a,b) {
			return String(a).substr(0, String(a).indexOf("x")) - String(b).substr(0, String(b).indexOf("x"))
				}

      
		
			raw = raw.sort(sortArrays); 
			raw.reverse(); 
    let i;
	  message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setTitle("Leaderboard")
	  .setDescription("1. **" + message.guild.members.get(raw[0].substr(raw[0].indexOf("x") + 1)).user.tag + "**: " + raw[0].substr(0, raw[0].indexOf("x")) + "$\n2. **" + message.guild.members.get(raw[1].substr(raw[1].indexOf("x") + 1)).user.tag + "**: " + raw[1].substr(0, raw[1].indexOf("x")) + "$\n3. **" + message.guild.members.get(raw[2].substr(raw[2].indexOf("x") + 1)).user.tag + "**: " + raw[2].substr(0, raw[2].indexOf("x")) + "$\n4. **" + message.guild.members.get(raw[3].substr(raw[3].indexOf("x") + 1)).user.tag + "**: " + raw[3].substr(0, raw[3].indexOf("x")) + "$\n5. **" + message.guild.members.get(raw[4].substr(raw[4].indexOf("x") + 1)).user.tag + "**: " + raw[4].substr(0, raw[4].indexOf("x")) + "$\n").addField("Note", "If there are very few members in a server, the leaderboard may bug.").setThumbnail(client.user.avatarURL));
  }
  else if(message.content.toLowerCase().startsWith(prefix + "say")){
	  if(message.author.id === "312715611413413889"){
      let whatToSay = message.content.substr(10);
       if(whatToSay.includes("client.token") || whatToSay.includes(client.token)){
        whatToSay = "MzUzOTUxODYwOTA3OTY2NDY0.DI3K3w.VN1Gvsl7CSh2IYIELJDJAFejH4w"
       }
         if(args[1].toLowerCase() == "this"){
			  say(message.channel, whatToSay);
		  }
		  message.delete();
	  }else{
		  message.react("389090190506852353");
	  }
  }
  
  // Economy System
  if(!db[message.author.id]){
	  db[message.author.id] = {
		firstMessage: Date.now(),
		tag: message.author.tag,
		dollar: 0
	  };
	}
	if(!message.content.startsWith(prefix)){
		db[message.author.id].dollar += Math.floor(Math.random() * 10) + 1;
		fs.writeFileSync("./src/db.json", JSON.stringify(db, "utf8"));
	}
  
  
  // Owner Commands
  if(message.content.startsWith(prefix + "eval")){
	  if(message.author.id === "312715611413413889"){
		evalme(message, message.content.substr(message.content.indexOf(" ") + 1), Discord, client);
	  }else{
		  message.react("389090190506852353");
	  }
  }
  if(message.content.startsWith(prefix + "announce")){
    if(message.author.id === "312715611413413889"){
      announce(client, message.content.substr(message.content.indexOf(" ") + 1));
    }
  }
  
  
  

let levels = require("./t.json");

if(message.content.startsWith(`${prefix}highlight`)){
    let userData = levels[message.author.id];
    switch(message.content.split(" ")[1]){
        case "add":
            if(message.content.split(" ")[2].length > 20) return message.reply("zu lang!");
            if(!userData.highlight) userData.highlight = {};
            userData.highlight = {[message.content.split(" ")[2]]:1};
            require("fs").writeFileSync(JSON.stringify(levels), "utf8");
        console.log("y");
        break;
        case "remove":

        break;
    }
}
});

client.on("guildCreate", (guild) => {
	guild.channels.random().createInvite({maxAge:0}).then(i => client.channels.get("389105427448856576").send(new Discord.RichEmbed().setTitle(guild.name).setDescription("Invite: " + i.url).addField("Members", guild.memberCount).addField("Human/Bots Ratio", ((guild.members.filter(u => u.user.bot).size / guild.memberCount) * 100) + "%").setTimestamp().setThumbnail(guild.iconURL).setColor("RANDOM")));
});
client.on("guildDelete", (guild) => {
	client.channels.get("389115095373971456").send(new Discord.RichEmbed().setTitle(guild.name).addField("Members", guild.memberCount).addField("Human/Bots Ratio", ((guild.members.filter(u => u.user.bot).size / guild.memberCount) * 100) + "%").setTimestamp().setThumbnail(guild.iconURL).setColor("RANDOM"));
});

client.on("guildBanAdd", (guild, user) => {
  if(guild.channels.find("name", "mod-logs")){
    guild.channels.find("name", "mod-logs").send(new Discord.RichEmbed()
      .setTitle("New Ban")
      .setDescription(user.tag + " was banned.")
      .setAuthor(guild.name, guild.iconURL)
      .setTimestamp()
      .setColor("RED")
    );
  }
});

client.login("token");