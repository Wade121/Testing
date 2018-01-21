const bot = require("../Bot.js");
const Bot = new bot();
const fs = require("fs");
const sql = require("sqlite");
sql.open("./money.sqlite");

module.exports = class extends bot {
    static async userInDB(auth){
        let sql_request = await sql.get(`SELECT * FROM users WHERE id=${auth.author.id}`);
        return sql_request ? true : false;
    }
}
