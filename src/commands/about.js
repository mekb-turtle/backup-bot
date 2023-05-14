const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Information about the bot"),

	async execute(i, opts) {
		await i.reply({ ...opts, content: 
			`Backup Bot
Source code: https://github.com/mekb-turtle/backup-bot
Available commands: /export, /import`
		});
	}
}
