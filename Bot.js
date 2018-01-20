module.exports = class {
    constructor() {
        this.version = "1.3";
        this.commands = {
            "fun": {
                "ping": {
                    "description": "Shows heartbeat and how long it takes to edit a message.",
                    "arguments": 0,
                },
                "reverse": {
                    "description": "Reverses a message",
                    "arguments": 1
                },
                "discriminator": {
                    "description": "Filters the size of users with the discriminator you provided",
                    "arguments": 1
                },
                "yesno": {
                    "description": "Yes or no",
                    "arguments": 0
                }
            },
            "owner": {
                "eval": {
                    "description": "Evaluates JavaScript Code.",
                    "arguments": 1
                },
                "game": {
                    "description": "Sets playing status.",
                    "arguments": 1
                },
                "say": {
                    "description": "Say something in a specific channel. (Argument 1 can be either 'this' or a channelid.",
                    "arguments": 2
                }
            },
            "moderation": {
                "clear": {
                    "description": "Clears an amount of messages",
                    "arguments": 1
                },
                "mute": {
                    "description": "Gives the mentioned member a role called muted which has no permissions to write in channels",
                    "arguments": 1
                },
                "unmute": {
                    "description": "Removes the muted role from mentioned member",
                    "arguments": 1
                },
                "ban": {
                    "description": "Bans a mentioned user",
                    "arguments": 1
                },
                "softban": {
                    "description": "Softbans a user (bans and unbans a user to clear all messages)",
                    "arguments": 1
                }
            },
            "miscellaneous": {
                "invite": {
                    "description": "Sends a link to invite scale to your server.",
                    "arguments": 0
                },
                "help": {
                    "description": "Help page.",
                    "arguments": 1
                },
                "about": {
                    "description": "Information about me (uptime, library etc).",
                    "arguments": 0
                },
                "channelinfo": {
                    "description": "Information about the channel you wrote the message in",
                    "arguments": 0
                },
                "guildinfo": {
                    "description": "Information about the guild you wrote the message in",
                    "arguments": 0
                },
                "userinfo": {
                    "description": "Information about you",
                    "arguments": 0
                }
            }
        };
    }
} 
