const Discord = require("discord.js");
const Twit = require("twit");


module.exports = {
  name: "twitter",
  description: "Gives tweets",
  aliases: ["tweet", "twt", "tweets", "twit"],
  execute(message, args) {
    const tweetsearchquery = args.join(" ");
    
    var config = ({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    var T = new Twit(config);
    var params = {
      q: tweetsearchquery,
      count: 2,
      result_type: "popular",
      lang: "en",
      include_entities: true
    };
    T.get("search/tweets", params, searchedData);
    function searchedData(err, data, response) {
      
      console.log(data)
      
      const tweetEmbed = new Discord.MessageEmbed()
        .setColor(0x1A91DA)
        .setTitle('Popular tweets for "' + tweetsearchquery + '"')
        //.setDescription('Tweet 1')
        .addField('Tweeted On:', data.statuses[0].created_at)
        .addField('Text:', data.statuses[0].text)
        .setFooter('Tweets from Twitter (Obviously).');
      message.channel.send(tweetEmbed).catch(error => console.error(error)).then(msg => {
            msg.delete({ timeout: 60000 });
          });
      return;
    }
  }
};
