// External libraries
require('dotenv').config();
let Discord = require('discord.js');

// loading core functions
let cmdCaller = require('./core/cmdCaller.js');

// Commands variable definition
let commands = {};
let cmdDef = [];

// Loading all commands
cmdDef.push(require('./cmds/quotes/quotes.js'));
cmdDef.push(require('./cmds/play/play.js'));

// Register commands
cmdDef.forEach((data) => {
	commands[data.cmdName] = data.cmd;
});

// Starting Discord Bot
const bot = new Discord.Client();

process.on('unhandledRejection', (reason) => {
	console.error(reason);
	process.exit(1);
});

bot.on('ready', () => {
	  console.log("Logged in as " + bot.user.tag + "!\nCurrently serving " + bot.guilds.cache.array().length + " servers.");
	  bot.user.setPresence({
		  activity: {
		  	name: "On Geek Tu?"
		  }
	  });
});

bot.on("disconnected", () => {
	console.log("Disconnected!");
	process.exit(1);
});

bot.on("message", (msg) => {
	cmdCaller(msg, bot, commands);
});

bot.login(process.env.BOT_TOKEN);

