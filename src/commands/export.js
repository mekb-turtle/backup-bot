const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("export")
		.setDescription("Export server data to a file"),

	async execute(i, opts) {
		await i.reply({ ...opts, content: 
			`Backing up...`
		});
	}
}
