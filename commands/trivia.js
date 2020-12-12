module.exports = {
	name: 'trivia',
	description: 'Releases a simple trivia question!',
	execute(message, args) {

		const filter = response => {
			return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};

		const collector = message.channel.createMessageCollector(filter, { time: 15000 });

		const quiz = require('../config-data/triviaqs.json');
		const item = quiz[Math.floor(Math.random() * quiz.length)];

		message.channel.send(item.question).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
				.then(collected => {
					message.channel.send(`${collected.first().author} got the correct answer!`);
				})
				.catch(collected => {
					message.channel.send('Looks like nobody got the correct answer this time.');
				});
		});
	},
};