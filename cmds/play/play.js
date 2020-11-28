class Play {
    constructor() {
        this.name = "Play";
        this.use = "Play command usage";
        this.desc = "Play command description";
    }

    execute(bot, msg, args) {
        if (msg.member.voice.channel && args[0] !== "") {
            const voiceChannel = msg.member.voice.channel;

            voiceChannel.join().then((connection) => {
                const broadcast = connection.play('./cmds/Play/data/' + args[0] + '.wav');
                broadcast.on("finish", () => {
                    voiceChannel.leave();
                });
            });
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
}

module.exports = Play