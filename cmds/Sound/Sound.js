class Sound {
    constructor() {
        this.name = "Sound";
        this.use = "Sound command usage";
        this.desc = "Sound command description";
    }

    execute(bot, msg, args) {
        if (msg.member.voice.channel && args[0] !== "") {
            const voiceChannel = msg.member.voice.channel;
            let sounds = require("./data/sounds.json");
            if (sounds[args[0]] !== undefined)
                voiceChannel.join().then((connection) => {
                    const broadcast = connection.play('./cmds/Sound/data/' + sounds[args[0]].fileName);
                    broadcast.on("finish", () => {
                        voiceChannel.leave();
                    });
                });
            else {
                msg.reply('Sound doesn\'t exist...');
            }
        } else if (args[0] !== ""){
            msg.reply('You need to specify a sound');
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
}

module.exports = Sound