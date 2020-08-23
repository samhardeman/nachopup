const Discord = require('discord.js')
const ms = require("../minestat.js");
module.exports = {
  name: "mcserver",
  description: "Gives server info for a specified java server! No bedrock yet. :(",
  aliases: ["mc", "minecraft"],
  execute(message, args) {
    
    if (!args[0]) {
      message.channel.send('Please define a server and port! Example: mc.hypixel.net 25565').then(msg => {
            msg.delete({ timeout: 60000 });
          });
      return;
    }
    
    if (!args[1]) {
      message.channel.send('Please define a port! Example: 25565').then(msg => {
            msg.delete({ timeout: 10000 });
          });
      return;
    }
    
    var ip = args[0];
    var port = args [1];
    
    // For use with Node.js
    ms.init(ip, port, function(result) {
      const mcembed = new Discord.MessageEmbed()
        .setColor('0x21cc1e')
        .setTitle('Minecraft Server Status of "' + ms.address + '" on port ' + ms.port)
        .setDescription(ms.motd)
        .addField('Version:', ms.version)
        .addField('# of Players Online:', ms.current_players + '/' + ms.max_players)
        .addField('Latency:', ms.latency + 'ms')
      if (ms.online) {
        message.channel.send(mcembed);
      }
      else {
        message.channel.send("Server is offline!");
      }
    });
  }
};
