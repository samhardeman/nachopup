const Discord = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Simple Yes or No Poll!',
	aliases: ['p'],
	execute(message, args) {
		const pollembed = new Discord.MessageEmbed()
			.setColor(0xFFC300)
			.setTitle('Initiate Poll')
			.setDescription('&poll to initiate a simple yes or no poll');

		if(!args[0]) {
			message.channel.send(pollembed).catch(error => console.error);
		}

		const msgArgs = args.slice(0).join(' ');

		message.channel.send('📋 ' + '**' + msgArgs + '**').then(messageReaction => {
			messageReaction.react('👍');
			messageReaction.react('👎');
			message.delete()
				.catch(console.error);
		});
	},
};