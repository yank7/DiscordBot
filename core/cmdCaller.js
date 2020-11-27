let cmdCaller = function (msg, bot, cmds) {
    if (msg.author.id !== bot.user.id && (msg.content.startsWith(process.env.BOT_PREFIX))) {
        let cmdTxt = msg.content.split(/\s/)[0].substring(process.env.BOT_PREFIX.length);
        let suffix = msg.content.substring(cmdTxt.length + process.env.BOT_PREFIX.length + 1);

        console.log("Received cmd <" + cmdTxt + "> from " + msg.author + " as command");

        if (undefined !== cmds[cmdTxt]){
            try {
                let cmd = cmds[cmdTxt];
                cmd.process(bot, msg, suffix);
            } catch(e) {
                let msgTxt = "command " + cmdTxt + " failed :(";
                console.error(e);

                msgTxt += "\n" + e.stack;
                console.log(msgTxt);

                if(msgTxt.length > (1024 - 8)){ //Truncate the stack if it's too long for a discord message
                    msgTxt = msgTxt.substr(0,1024-8);
                }
                msg.channel.send(msgTxt);
            }
        } else {
            msg.channel.send("Error...");
        }

    }
}

module.exports = cmdCaller;