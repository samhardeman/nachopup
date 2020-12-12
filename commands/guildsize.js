const Discord = require('discord.js')
const bot = new Discord.Client

module.exports = {
	name: 'guildsize',
	description: 'Gives bot info',
	execute(message, args) {
		console.log(bot.guilds.cache[0]);
  }
};