const Discord = require("discord.js")

module.exports = {
	name: 'cmd',
	description: 'Gives bot commands!',
  aliases: ['cmd', 'cmds', 'commands', 'command'],
	execute(message, args) {
		const cmdEmbed = new Discord.MessageEmbed()
      .setTitle("NachoPup Commands")
      .setColor(0x39d834)
      .addField("&cat", "Sends a picture of a cat!")
      .addField("&dictionary", "Looks up a specified word! Ex &dict Dog.")
      .addField("&help", "Sends some stuff to your dm that will help you!")
      .addField("&poll", "Poll the server with a yes or no question!");
    message.channel.send(cmdEmbed).catch(error => console.log(error)).then(msg => {
            msg.delete({ timeout: 20000 });
        });
	},
};