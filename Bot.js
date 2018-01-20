module.exports = class {
    constructor() {
        this.version = "1.3";
        this.token = "";
        this.prefix = ":";
        this.owner = "312715611413413889";
        this.commands = {
            "fun": {
                "ping": {
                    "description": "Shows heartbeat and how long it takes to edit a message.",
                    "arguments": 0,
                    "status": true
                },
                "reverse": {
                    "description": "Reverses a message",
                    "arguments": 1,
                    "status": true
                },
                "discriminator": {
                    "description": "Filters the size of users with the discriminator you provided",
                    "arguments": 1,
                    "status": true
                },
                "yesno": {
                    "description": "Yes or no",
                    "arguments": 0,
                    "status": true
                }
            },
            "owner": {
                "eval": {
                    "description": "Evaluates JavaScript Code.",
                    "arguments": 1,
                    "status": true
                },
                "game": {
                    "description": "Sets playing status.",
                    "arguments": 1,
                    "status": true
                },
                "say": {
                    "description": "Say something in a specific channel. (Argument 1 can be either 'this' or a channelid.",
                    "arguments": 2,
                    "status": true
                }
            },
            "moderation": {
                "clear": {
                    "description": "Clears an amount of messages",
                    "arguments": 1,
                    "status": true
                },
                "mute": {
                    "description": "Gives the mentioned member a role called muted which has no permissions to write in channels",
                    "arguments": 1,
                    "status": true
                },
                "unmute": {
                    "description": "Removes the muted role from mentioned member",
                    "arguments": 1,
                    "status": true
                },
                "ban": {
                    "description": "Bans a mentioned user",
                    "arguments": 1,
                    "status": true
                },
                "softban": {
                    "description": "Softbans a user (bans and unbans a user to clear all messages)",
                    "arguments": 1,
                    "status": true
                }
            },
            "miscellaneous": {
                "invite": {
                    "description": "Sends a link to invite scale to your server.",
                    "arguments": 0,
                    "status": true
                },
                "help": {
                    "description": "Help page.",
                    "arguments": 1,
                    "status": true
                },
                "about": {
                    "description": "Information about me (uptime, library etc).",
                    "arguments": 0,
                    "status": true
                },
                "channelinfo": {
                    "description": "Information about the channel you wrote the message in",
                    "arguments": 0,
                    "status": true
                },
                "guildinfo": {
                    "description": "Information about the guild you wrote the message in",
                    "arguments": 0,
                    "status": true
                },
                "userinfo": {
                    "description": "Information about you",
                    "arguments": 0,
                    "status": true
                }
            }
        };
    }
} 
/*
module.exports = function(prefix){
	return [
	prefix + "clear [Amount of Messages to delete] - Delete an amount of messages",y
	"mute [Mention] - Mutes a member",y
	"unmute [Mention] - Unmutes a member",y
	"ban [Mention] - Bans a member",y
	"softban [Mention] - Softbans a member (Ban and unban to remove all messages from that user)"
	];
}
  */