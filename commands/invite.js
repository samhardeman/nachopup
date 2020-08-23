module.exports = {
	name: 'invite',
	description: 'Sends a link to invite the bot to your own server',
	execute(message, args) {
		message.channel.send("Invite me to your servers with this link! https://discord.com/api/oauth2/authorize?client_id=706690215024001036&permissions=8&scope=bot")
	},
};