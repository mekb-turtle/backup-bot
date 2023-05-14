const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("import")
		.setDescription("Import server data from a file"),

	async execute(i, opts) {
		await i.reply({ ...opts, content: 
			`Importing...`
		});
	}
}
