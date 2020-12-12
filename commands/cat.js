const retriever = require('../retriever');
const Discord = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Uses random cat to give a random cat! Nuff said.',
	cooldown: 20,
	aliases: ['meow', 'kitty'],
	execute(message, args) {
		const randomcaturl = 'https://aws.random.cat/meow';

		retriever(randomcaturl).then(data => {
			const catembed = new Discord.MessageEmbed()
				.setColor('4e57d8')
				.setTitle('**Cat**')
				.setImage(data.file)
				.setFooter('Cat Provided by Random Cat');
			message.channel.send(catembed).catch(error => console.log(error))
      .catch(error => {
        console.error(error);
        message.channel.send(
          "Hmmm. That didn't work... Weird."
        );
      });
		});
	},
};
