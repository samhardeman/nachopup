const Discord = require("discord.js");
const retriever = require('../retriever');
const key = process.env.GOOGLE_TOKEN;

module.exports = {
  name: "search",
  description: "Retrieves data with the Google Knowledge Graph API",
  aliases: ["google", "srch"],
  cooldown: 20,
  execute(message, args) {
    var query = args.join(" ");
    const searchurl = `https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=${key}&limit=1&indent=True`;

    //Check if they even included something to search for.
    if (!args[0]) {
      message
        .reply("Please include something to search for!")
        .catch(error => console.error(error));
      return;
    }

    retriever(searchurl)
      .then(data => {
        //Checks if there is data to be sent. If there isn't, return.
        if (data.itemListElement[0] == null) {
          message.channel.send(`Nothing found for "${query}"`);
          return;
        };
        //Send the data in the knowledge graph.
        const searchembed = new Discord.MessageEmbed()
          .setColor("E34033")
          .setTitle("**Search for " + query + "**")
          .addField("**Showing Results For:**", data.itemListElement[0].result.name)
          .addField("**Result:**", data.itemListElement[0].result.detailedDescription.articleBody)
          .addField("**Other Information:**", data.itemListElement[0].result.detailedDescription.url)
          .setFooter("Search by Google");
        message.channel.send(searchembed).catch(error => console.error(error)).then(msg => {
            msg.delete({ timeout: 60000 });
          });
        return;
      })
      .catch(error => {
        console.error(error);
        message.channel.send("Hmmm. No snippets were found for the topic. Try searching like this: &search puppy. If that doesn't work DM @Locuroid on Twitter!").catch(error => console.error(error)).then(msg => {
          msg.delete({ timeout: 60000})
        })
      });
  }
};
