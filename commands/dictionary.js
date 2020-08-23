const fetch = require('node-fetch');
const Discord = require('discord.js');
const dictionarykey = process.env.DICTIONARY_KEY;
const capitalize = (str) => {
	if(typeof str === 'string') {
		return str.replace(/^\w/, c => c.toUpperCase());
	}
	else {
		return '';
	}
};

module.exports = {
	name: 'dictionary',
	description: 'Uses the Merriam-Webster API to give dictionary definitions about a specified word!',
	cooldown: 20,
	aliases: ['dict', 'def'],
	execute(message, args) {
		const word = args.join(' ');
		const dicturl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionarykey}`;
    
    console.log(word);

		if (!args[0]) {
			message.reply('Please include a word to search for!').catch(error => console.error(error));
			return;
		}

		const getJSON = async url => {
			try {
				const response = await fetch(url, {
					method: 'GET',
				});
				if(!response.ok) {throw new Error(response.statusText);}
				const dictdata = await response.json();
				return dictdata;
			}
			catch(error) {
				return error;
			}
		};
		getJSON(dicturl).then(dictdata => {
      
      if (dictdata[0] == null) {
        message.channel.send('Hmmm, I couldn\'t find that word. Is it spelled right? Some words aren\'t in the thesaurus...')
        return;
      }
			const dictembed = new Discord.MessageEmbed()
				.setColor('cf1b1b')
				.setTitle('***' + dictdata[0].meta.id + '***')
				.addField('**Part of Speech:**', dictdata[0].fl)
				.addField('**Definition:**', capitalize(dictdata[0].shortdef[0]))
				.setFooter('Defintions provided by Merriam-Webster');
			message.channel.send(dictembed).catch(error => console.error(error)).then(msg => {
            msg.delete({ timeout: 60000 });
          });
			return;
		}).catch(error => {
			console.error(error);
			message.channel.send('Hmmm. Is the word spelled right? You could also try searching this: "&dictionary Cactus" . If that doesn\'t work DM CactusBoy#0001');
		});
	},
};