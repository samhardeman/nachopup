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
      .addField("&dog", "Sends a picture, gif, or video of a random dog!")
      .addField("&nasa", "Sends the Nasa image of the day in your server along with a description of the photo.")
      .addField("&dictionary", "Looks up the definition for specified word! Ex &dict Dog.")
      .addField("&thesaurus", "Looks up synonyms for a specified word! Ex &thes Walk.")
      .addField("&help", "Sends some stuff to your dm that will help you!")
      .addField("&poll", "Poll the server with a yes or no question!")
      .addField("&search", "Searches the Google knowledge graph for info regarding a specified query.")
      .addField("&invite", "Sends a link to invite Nachopup to another server.");
    message.channel.send(cmdEmbed).catch(error => console.log(error)).then(msg => {
            msg.delete({ timeout: 20000 });
        });
	},
};