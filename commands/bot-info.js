module.exports = {
	name: 'bot-info',
	description: 'Gives bot info',
	execute(message, args) {
		if(args[1] === 'version') {
			message.channel.send('Version 1.0.1');
		}
		else {
			message.channel.send('NachoPup. Probably the extra most funnest bot ever. For the official commands, type `&cmd`');
		}
	},
};