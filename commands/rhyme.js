const Discord = require('discord.js');
const retriever = require('../retriever');

module.exports = {
  name: 'rhyme',
  description: 'lists some rhyming words',
  aliases: ['rhy'],
  execute(message, args) {
    const word = args[0]

    if (!word) {
      return message.channel.send('Please give a word to rhyme with.')
    }

    retriever.get(`https://rhymebrain.com/talk?function=getRhymes&word=${word}`).then(data => {
      const rhymeEmbed = new Discord.MessageEmbed()
        .setColor('237CAE')
        .setTitle(`Words that Rhyme with ${word}:`)
        .setDescription(`${data[0].word}\n${data[1].word}\n${data[2].word}\n${data[3].word}\n${data[4].word}\n${data[5].word}\n${data[6].word}\n`)
        .setFooter('Powered by RhymeBrain.com');
      message.channel.send(rhymeEmbed)
    })
  }
}