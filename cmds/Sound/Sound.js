class Sound {
    constructor() {
        this.name = "Sound";
        this.use = "Sound command usage";
        this.desc = "Sound command description";
    }

    execute(bot, msg, args) {
        if (msg.member.voice.channel && args[0] !== "") {
            const voiceChannel = msg.member.voice.channel;

            voiceChannel.join().then((connection) => {
                const broadcast = connection.play('./cmds/Sound/data/' + args[0] + '.wav');
                broadcast.on("finish", () => {
                    voiceChannel.leave();
                });
            });
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
}

module.exports = Sound