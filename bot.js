const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config()

client.on('ready', () => {
	  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === '$$ping') {
		msg.reply('Pong!');
	} else if (msg.content === "$$pong") {
		msg.reply('Tu comprends pas comment ça marche ping pong. 🤦‍♂️');
	} else if (msg.content === "non mais non mais non...") {
		const ayy = client.emojis.find(emoji => emoji.name === "vinsoif");
		message.reply(`${ayy}`);
	}
});

client.login(process.env.BOT_TOKEN);
