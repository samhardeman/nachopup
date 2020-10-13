const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'nasa',
	description: 'Makes the bot say something',
  aliases: ['image', 'iod'],
	execute(message, args) {

		const nasaiotdurl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

		const getJSON = async url => {
			try {
				const response = await fetch(url, {
					method: 'GET',
				});
				if(!response.ok) {throw new Error(response.statusText);}
				const data = await response.json();
				return data;
			}
			catch(error) {
				return error;
			}
		};

		getJSON(nasaiotdurl).then(data => {
			const nasaembed = new Discord.MessageEmbed()
				.setColor('4e57d8')
				.setTitle('**Nasa Image of the Day**')
				.setImage(data.hdurl)
        .setDescription(data.explanation)
        .setFooter(data.copyright + ' - ' + data.title + ' - ' + data.date);
			message.channel.send(nasaembed).catch(error => console.log(error))
      .catch(error => {
        console.error(error);
        message.channel.send(
          "Hmmm. That didn't work... Weird."
        );
      });
		});
	},
};