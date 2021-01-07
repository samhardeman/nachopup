const Discord = require("discord.js");
const fetch = require("node-fetch");
const contact = require('../config-data/config.json').contact

module.exports = {
  name: "xbox",
  description: "Retrieves data with the OpenXBL Xbox Live API",
  aliases: ["xbx"],
  execute(message, args) {
    var gamertag = args.join(" ");
    var playerurl = `https://xbl.io/api/v2/friends/search?gt=${gamertag}`;
    
    if (!args[0]) {
			message.reply('Please include a gamertag to search for!').catch(error => console.error(error));
			return;
		};

    const getJSON = async url => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Authorization": process.env.OPENXBL_TOKEN
          }
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        var data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    };
    getJSON(playerurl)
      .then(xbxdata => {
      
        if (xbxdata.code == 28) {
          message.channel.send('I couldn\'t find that gamertag...')
          return;
        };
      
        var rname = xbxdata.profileUsers[0].settings[6].value
        if (rname === "") {
          var rname = 'None';
        };
        
        var bio = xbxdata.profileUsers[0].settings[7].value
        if (bio === "") {
          var bio = 'None';
        };
        
        var location = xbxdata.profileUsers[0].settings[10].value
        if (location === "") {
          var location = 'None';
        };
				const xbxembed = new Discord.MessageEmbed()
					.setColor('0e7a0d')
					.setTitle('**' + xbxdata.profileUsers[0].settings[2].value + '**')
          .setThumbnail(xbxdata.profileUsers[0].settings[0].value)
          .addFields(
					  { name: '**Gamerscore:**', value: xbxdata.profileUsers[0].settings[1].value, inline: true },
					  { name: '**Account Tier:**', value: xbxdata.profileUsers[0].settings[3].value, inline: true },
            { name: '**Name:**', value: rname, inline: true },
            { name: '**Bio:**', value: bio, inline: true },
            { name: '**Location:**', value: location, inline: true },
				  )
					.setFooter('Results by OpenXBL');
				message.channel.send(xbxembed).catch(error => console.log(error)).then(msg => {
            msg.delete({ timeout: 60000 }).catch(error => console.log(error));
          });
      })
      .catch(error => {
        console.error(error);
        message.channel.send(
          "Hmmm. Something went wrong. Please DM " + contact
        );
      });
  }
};
