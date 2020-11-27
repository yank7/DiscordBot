let quotes = {
    usage: "<quotes>",
    description: "Print a random quotes.",
    process: function(bot, msg, suffix) {
        msg.reply("my quote");
    }
}

exports.cmd = quotes
exports.cmdName = "quotes"