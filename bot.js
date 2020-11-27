require('dotenv').config();
let fs = require('fs');
let _ = require('lodash');
let Discord = require('discord.js');
let cmdCaller = require('./cmdCaller.js');

let cmd_prefix = process.env.BOT_PREFIX;

// Commands definition
let commands = {};
let cmdDef = [];

//Register commands
cmdDef.push(require('./cmds/quotes.js'));
cmdDef.push(require('./cmds/itr.js'));

// Build commands
cmdDef.forEach((data) => {
	commands[data.cmdName] = data.cmd;
});

process.on('unhandledRejection', (reason) => {
	console.error(reason);
	process.exit(1);
});

const bot = new Discord.Client();

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

