require("dotenv").config();

const DiscordJs = require("discord.js");
const CmdsManager = require("./core/CmdsManager");
const CmdsParser = require("./core/CmdsParser")

let cmds = new CmdsManager();
let botClient = new DiscordJs.Client();

cmds.register("quotes", require("./cmds/Quotes/Quotes"));
cmds.register("play", require("./cmds/Play/Play"));

process.on('unhandledRejection', (reason) => {
	console.error(reason);
	process.exit(1);
});

botClient.on("ready", () => {
	console.info("[Boot] Logged in: " + botClient.user.tag);
	console.info("[Boot] Now serving " + botClient.guilds.cache.array().length + " servers.");
	botClient.user.setPresence({activity: {name: "On Geek Tu?"}});
	console.info("[Boot] Presence set.");
});

botClient.on("disconnected", () => {
	console.warn("This discord bot has been disconnected");
	process.exit(1);
});

botClient.on("message", (msg) => {
	let cmd = new CmdsParser(botClient, msg, process.env.BOT_PREFIX);

	if (cmd.isValid()) {
		console.log("\n[CMD] Received valid command <" + msg.content + "> from : " + msg.author.username + "(" + msg.author.id + ")");
		cmd.parse();
		if (cmds.doesCmdExists(cmd.name)) {
			console.log("[CMD] Executing command <" + cmd.name + "> with [" + cmd.args.toString() + "]");
			cmds.getCmd(cmd.name).execute(botClient, msg, cmd.args);
		}
	}

});

botClient.login(process.env.BOT_TOKEN);