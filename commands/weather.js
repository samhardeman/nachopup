const retriever = require('../retriever');
const Discord = require('discord.js');
const weatherKey = process.env.WEATHER_KEY;
const contact = require('../config-data/config.json').contact

module.exports = {
	name: 'weather',
	description: 'Uses the Open Weather API to give weather data about a specified place!',
	cooldown: 20,
	aliases: ['w', 'temperature', 'temp'],
	execute(message, args) {
		const city = args.join(' ');
		const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`;

		if (!args[0]) {
			message.reply('Please include a city to get weather for!').catch(error => console.error(error));
			return;
		}

    retriever(weatherurl)
      .then(data => {
        //Checks if there is data to be sent. If there isn't, return.
        if (data == 'Error: Not Found') {
          message.channel.send(`No place called ${city} found!`);
          return;
        }
        //Send the data in the knowledge graph.
        const weatherembed = new Discord.MessageEmbed()
				.setColor('8425b0')
				.setTitle('**Weather in ' + data.name + '**')
				.addField('**Coordinates:**', 'Lon: ' + data.coord.lon + ', ' + ' Lat: ' + data.coord.lat)
				.addFields(
					{ name: '**Temperature (F):**', value: data.main.temp + ' degrees', inline: true },
					{ name: '**Feels Like (F):**', value: data.main.feels_like + ' degrees', inline: true },
          { name: '**Humidity:**', value: data.main.humidity + '%', inline: true },
          { name: '**Wind:**', value: data.wind.speed + ' mph', inline: true },
					{ name: '**Temp High:**', value: data.main.temp_max + ' degrees', inline: true },
					{ name: '**Temp Low:**', value: data.main.temp_min + ' degrees', inline: true },
				)
				.addField('**Cloud Coverage:**', data.clouds.all + '%')
				.setTimestamp()
				.setFooter('Weather Data Provided by OpenWeather');
        message.channel.send(weatherembed).catch(error => console.error(error)).then(msg => {
            msg.delete({ timeout: 60000 });
          });
        return;
      })
      .catch(error => {
        console.error(error);
        message.channel.send(
          "Hmmm. That didn't work... Please DM " + contact
        );
      });
  },
};