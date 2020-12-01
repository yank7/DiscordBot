require("dotenv").config();

const DiscordJs = require("discord.js");
const CmdsManager = require("./core/CmdsManager");
const Cmd=require("./core/Cmd");
const ConsoleLogger = require("./core/ConsoleLogger");

let cmds = new CmdsManager();
let botClient = new DiscordJs.Client();
let clog = new ConsoleLogger();

cmds.register("quotes", require("./cmds/Quotes/Quotes"));
cmds.register("sound", require("./cmds/Sound/Sound"));
cmds.register("help", require("./cmds/help"));

process.on('unhandledRejection', (reason) => {
	clog.danger("unhandleRejection", reason);
	process.exit(1);
});

botClient.on("ready", () => {
	clog.info("Ready", "Logged in as " + botClient.user.tag + ".");
	clog.info("Ready", "Now serving " + botClient.guilds.cache.array().length + " servers.");

	botClient.user.setPresence({activity: {name: "On Geek Tu?"}});

	clog.info("Ready", "Presence set to On Geek Tu?" );
});

botClient.on("disconnected", () => {
	clog.warn("Error", "This discord bot has been disconnected");
	process.exit(1);
});

botClient.on("message", (msg) => {
	let cmd = new Cmd(botClient, msg, process.env.BOT_PREFIX);

	if (cmd.isValid()) {
		clog.info("CMD", "Received valid command <"+ msg.content + "> from : " + msg.author.username + "(" + msg.author.id + ")")
		cmd.parse();
		if (cmds.doesCmdExists(cmd.name)) {
			clog.info("CMD", "Executing command <" + cmd.name + "> with [" + cmd.args.toString() + "]")
			cmds.getCmd(cmd.name).execute(botClient, msg, cmd.args);
		}
	}

});

botClient.login(process.env.BOT_TOKEN);
