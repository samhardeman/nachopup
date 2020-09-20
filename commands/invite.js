module.exports = {
	name: 'invite',
	description: 'Sends a link to invite the bot to your own server',
	execute(message, args) {
		message.channel.send("Invite me to your servers with this link! https://cutt.ly/nachopup")
	},
};