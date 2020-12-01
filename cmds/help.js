class help {
    constructor() {
        this.name = "help";
        this.use = "help command usage";
        this.desc = "help command description";

        this.data = "";
        this.dataLength = 2;
        this.randomID = 0;
    }
  
    execute(bot, msg, args) {
        this.print(bot, msg);
    }

    print(bot, msg) {
        msg.channel.send({embed: {
            color: 2067276,
            title: "Help",
            author: {
                name: "",
                icon_url: ""
            },
            description: "*" + "//quotes : Print random quote\nquotes all : Print all quotes\nsound # : Enter channel and play sound #" + "*",
            footer: {
                text: ""
            }
        }});
    }
}

module.exports = help
