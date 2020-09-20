const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "belikebill",
  description: "Uses a be like bill API to spit out stuff you shouldn't do.",
  cooldown: 20,
  aliases: ["bill", "blb"],
  execute(message, args) {
    var name = args[0];
    var sex = args[1];

    if (!args[0]) {
      message.channel.send(
        "Input a name and a sex: &blb sam m  or  &blb agatha f"
      );
      return;
    }

    const blburl = `https://belikebill.ga/billgen-API.php?default=1&name=${name}&sex=${sex}`;

    const blbembed = new Discord.MessageEmbed()
      .setColor("4e57d8")
      .setTitle("**Be Like**")
      .setImage(blburl)
      .setFooter("https://belikebill.ga");
    message.channel
      .send(blbembed)
      .catch(error => console.log(error))
      .then(msg => {
        msg.delete({ timeout: 60000 }).catch(error => console.log(error));
      });
  }
};
