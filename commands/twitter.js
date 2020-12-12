const Discord = require("discord.js");

module.exports = {
  name: "twitter",
  description: "Gives tweets",
  aliases: ["tweet", "twt", "tweets", "twit"],
  execute(message, args) {
    const tweetsearchquery = args.join(" ");
    message.channel.send('Fixing some things...')
  }
};
