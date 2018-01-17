module.exports = function(prefix){
  return [
    prefix + "help [-] - Help page",
    "ping [-] - Ping",
    "eval [Evaluation] - Evaluate JS Code (Owner-only)",
	"invite [-] - Get invite link",
	"about [-] - About me",
    "r / " + prefix + "reverse [string] - Reverse a text",
    "game [string] - Set game of scale (Owner-only)",
    "discriminator [discrim] - Filter users by their discriminator",
    "channelinfo - Information about this channel"
  ];
}
