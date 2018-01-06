module.exports = class {
	constructor(emoji){
		this.emoji = emoji;
	}
	react(message){
		message.react(this.emoji);
	}
}