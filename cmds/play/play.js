let play = {
    usage: "itr",
    description: "Plays a special play song",
    process: function (bot, msg, suffix) {
        if (msg.member.voice.channel && suffix !== "") {
            const connection = msg.member.voice.channel.join();

            const broadcast = bot.voice.createBroadcast();
            broadcast.play('./data/' + suffix + '.wav');
            for (const connection of bot.voice.connections.values()) {
                connection.play(broadcast);
            }
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
}

exports.cmd = play;
exports.cmdName = "play"