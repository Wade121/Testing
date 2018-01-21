const bot = require("../Bot.js");
const Bot = new bot();
const fs = require("fs");

module.exports = class extends bot {
    static userInDB(message){
        return require('./DB.json')[message.author.id] ? true : false;
    }
    static registerUser(user){
        let db = JSON.parse(fs.readFileSync('./commands/DB.json'));
        db[user.id] = {
            "money": 0,
            "lastDaily": 0
        };
        fs.writeFileSync('./commands/DB.json', JSON.stringify(db));
    }
    static getProperty(property, user){
        return require('./DB.json')[user.id][property];
    }
    static applyDaily(user){
        let db = JSON.parse(fs.readFileSync('./commands/DB.json'));
        db[user.id].money += 1000;
        db[user.id].lastDaily = Date.now();
        fs.writeFileSync('./commands/DB.json', JSON.stringify(db));
    }
    static applyMoney(money, user){
        let db = JSON.parse(fs.readFileSync('./commands/DB.json'));
        db[user.id].money += money;
        fs.writeFileSync('./commands/DB.json', JSON.stringify(db));
    }
}