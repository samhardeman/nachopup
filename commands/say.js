module.exports = {
	name: 'say',
	description: 'Makes the bot say something',
	execute(message, args) {
		const sayLine = args.join(" ")
    message.channel.send(sayLine)
    console.log(sayLine)
	},
};