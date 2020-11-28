class Quotes {
    constructor() {
        this.name = "quotes";
        this.use = "Quotes command usage";
        this.desc = "Quotes command description"

        this.data = require("./data/quotes.json");
        this.dataLength = Object.keys(this.data).length;
        this.randomID = 0;
    }

    execute(bot, msg, args) {
        this.printRandom(bot, msg);
    }

    genRandomId() {
        this.randomID = Math.floor(Math.random() * this.dataLength);
    }

    printRandom(bot, msg) {
        this.genRandomId();

        msg.channel.send({embed: {
            color: 2067276,
            title: "Random quote",
            author: {
                name: "",
                icon_url: ""
            },
            description: "*" + this.data[this.randomID].content.trim() + "*",
            footer: {
                icon_url: bot.user.avatarURL(),
                text: "par : " + this.data[this.randomID].author
            }
        }});
    }
}

module.exports = Quotes