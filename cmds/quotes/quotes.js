let quotes = {
    usage: "<quotes>",
    description: "Print a random quotes.",
    process: function(bot, msg, suffix) {
        let quotesData = require("./data/quotes.json");
        let length = Object.keys(quotesData[0]).length;
        let id = Math.floor(Math.random() * length);
        msg.channel.send({embed: {
            color: 2067276,
            title: "Random quote",
            author: {
                name: "",
                icon_url: ""
            },
            description: "*" + quotesData[id].content.trim() + "*",
            footer: {
                icon_url: bot.user.avatarURL(),
                text: "par : " + quotesData[id].author
            }
        }});
    }
}

exports.cmd = quotes
exports.cmdName = "quotes"