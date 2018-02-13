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
                "roll": {
                    "description": "Rolls a number (made for tournaments)",
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
                },
                "balance": {
                    "description": "Your current balance",
                    "arguments": 0,
                    "status": true
                },
                "daily": {
                    "description": "Receive your 1000也",
                    "arguments": 0,
                    "status": true
                },
                "msconvert": {
                    "description": "Converts an amount of milliseconds to a human-readable date",
                    "arguments": 1,
                    "status": true
                },
                "gstring": {
                    "description": "Generates a (pseudo) random string. ",
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
                },
                "regexp": {
                    "description": "Tests a regular expression",
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
                },
                "unban": {
                    "description": "Unbans a user",
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
                },
                "report": {
                    "description": "Reports a bug",
                    "arguments": 1,
                    "status": true
                },
                "undo": {
                    "description": "Deletes last 15 bots' messages",
                    "arguments": 0,
                    "status": true
                }
            },
            "image-manipulation": {
                "grey": {
                    "description": "Grey's a picture",
                    "arguments": 1,
                    "status": true
                },
                "invert": {
                    "description": "Inverts a picture",
                    "arguments": 1,
                    "status": true
                },
                "bright": {
                    "description": "Brightnesses an image",
                    "arguments": 2,
                    "status": true
                }
            },
            "tags": {

            }
        };
    }
}
