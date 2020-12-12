const retriever = require('../retriever');
const Discord = require('discord.js');
const thesauruskey = process.env.THESAURUS_KEY;
const capitalize = (str) => {
	if(typeof str === 'string') {
		return str.replace(/^\w/, c => c.toUpperCase());
	}
	else {
		return '';
	}
};

module.exports = {
	name: 'thesaurus',
	description: 'Uses the Merriam-Webster API to give thesaurus information about a specified word!',
	cooldown: 20,
	aliases: ['thes', 'syns', 'ants'],
	execute(message, args) {
		const word = args.join();
		const thesurl = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesauruskey}`;

		if (!args[0]) {
			message.reply('Please include a word to search for!').catch(error => console.error(error));
			return;
		}

		retriever(thesurl).then(data => {

      if (data[0] == null) {
        message.channel.send('Hmmm, I couldn\'t find that word. Is it spelled right? Some words aren\'t in the thesaurus...')
        return;
      }
      
			const thesembed = new Discord.MessageEmbed()
				.setColor('cf1b1b')
				.setTitle('***' + data[0].meta.id + '***')
				.addFields(
					{ name: '**Definition:**', value: capitalize(data[0].shortdef[0]) },
					{ name: '**Part of Speech**', value: data[0].fl },
					{ name: '**Synonyms:**', value: data[0].meta.syns[0], inline: true },
					{ name: '**Antonyms:**', value: data[0].meta.ants[0], inline: true },
				)
				.setFooter('Results provided by Merriam-Webster');
			message.channel.send(thesembed).catch(error => console.error(error)).then(msg => {
            msg.delete({ timeout: 60000 });
          });;
			return;
		}).catch(error => {
			console.error(error);
			message.channel.send(`Hmmm. Something went wrong. ${word} might not be in the Merriam-Webster Thesaurus. Is it spelled right? You could also try searching this: "&thesaurus Umpire" . If that doesn't work DM @locuroid on Twitter!`);
		});
	},
};