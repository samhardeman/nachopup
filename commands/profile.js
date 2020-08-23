/*

const Discord = require('discord.js');
const xp = require('../.data/xp.json');

module.exports = {
	name: 'profile',
	description: 'Gives a user\'s server profile!',
	execute(message, args) {

		if(!xp[message.author.id + message.guild.id]) {
			xp[message.author.id + message.guild.id] = {
				xp: 0,
				level: 1,
			};
		}
    
    //Server leveling is based by server.
		const curxp = xp[message.author.id + message.guild.id].xp;
		const curlvl = xp[message.author.id + message.guild.id].level;
		const nxtLvlXp = curlvl * 300;
		const difference = nxtLvlXp - curxp;
    
    //Catches people if they didn't set a nickname in the server.
    var name = message.member.nickname;
    
    if (message.member.nickname === null) {
      var name = message.author.username
    };
    
    //Send profile data.
		const lvlEmbed = new Discord.MessageEmbed()
			.setTitle(name)
			.setColor(0x39d834)
			.setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.addField('Level', curlvl, true)
			.addField('XP', curxp, true)
			.setFooter(`${difference} XP til level up`);
		message.channel.send(lvlEmbed).catch(error => console.log(error)).then(msg => {
            msg.delete({ timeout: 20000 });
        });
	},
};

*/