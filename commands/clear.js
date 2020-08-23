module.exports = {
	name: 'clear',
	description: 'Bulk deletes a specified number of messages',
	aliases: ['clr', 'delete', 'del'],
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command!');

		if (isNaN(amount)) {
			return message.reply('Ahh! That doesn\'t seem to be a valid number.');
		}
		else if (amount < 1 || amount > 100) {
			return message.reply('Could you input a number between 1 and 99? Thanks!');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Whoops! Clumsy me. Something went wrong...');
		});
	},
};