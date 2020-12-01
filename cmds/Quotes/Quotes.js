let Discord = require("discord.js")

class Quotes {
    constructor() {
        this.name = "quotes";
        this.use = "Quotes command usage";
        this.desc = "Quotes command description";

        this.data = require("./data/quotes.json");
        this.dataLength = Object.keys(this.data).length;
        this.randomID = 0;
    }

    execute(bot, msg, args) {
        if (args[0] !== undefined) {
            if (args[0] === "all") {
                this.printAll(bot, msg);
            } else if (args[0] === "add" && args[1] !== undefined && args[2] !== undefined) {

            }
            else {
                msg.reply("This action doesn't exist.");
            }
        } else {
            this.printRandom(bot, msg);
        }

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

    printAll(bot, msg) {
        let message = "";
        let embed = new Discord.MessageEmbed();

        embed.setColor(2067276);
        embed.setTitle("All quotes");
        embed.setDescription("Listing of all the quotes");

        for (let i = 0; i < this.dataLength; i++) {
           embed.addField(this.data[i].content.trim(), "par: " + this.data[i].author.trim());
        }
        msg.channel.send(embed);
    }
}

module.exports = Quotes
