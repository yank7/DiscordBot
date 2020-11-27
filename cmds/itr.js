let itr = {
    usage: "itr",
    description: "Plays a special itr song",
    process: function (bot, msg, suffix) {
        if (msg.member.voice.channel) {
            const connection = msg.member.voice.channel.join();

            const broadcast = bot.voice.createBroadcast();
            broadcast.play('./data/itr.wav');
            for (const connection of bot.voice.connections.values()) {
                connection.play(broadcast);
            }
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
}

exports.cmd = itr;
exports.cmdName = "itr"