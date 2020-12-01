let Discord = require("discord.js")
let fs = require("fs");

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
                this.addQuote(args[1], args[2]);
                this.updateQuotesFile();
                msg.reply("Quote added!");
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
        let messageMaxSize = 20;
        let numberOfPost = Math.ceil(this.dataLength / messageMaxSize);

        for (let j = 0; j < numberOfPost; j++) {
            let embed = new Discord.MessageEmbed();
            embed.setColor(2067276);
            embed.setTitle("All quotes");
            embed.setDescription("Listing of all the quotes (" + (j+1) + "/" + numberOfPost + ")");

            for (let i = (messageMaxSize * j); i < this.dataLength; i++) {
                embed.addField(this.data[i].content.trim(), "par: " + this.data[i].author.trim());
            }
            msg.channel.send(embed);
        }
    }

    addQuote(author, content) {
        this.data.push({
            "author": author,
            "content": content
        });

        fs.writeFile("./cmds/Quotes/data/quotes.json", JSON.stringify(this.data), (err) => {
           if (err) {
               console.log(err);
           }
        });
    }

    updateQuotesFile() {
        this.data = require("./data/quotes.json");
        this.dataLength = Object.keys(this.data).length;
    }
}

module.exports = Quotes
