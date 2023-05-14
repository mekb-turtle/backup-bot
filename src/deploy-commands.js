const { REST, Routes } = require("discord.js");
const fs = require("node:fs").promises;
const path = require("node:path");
require("dotenv").config();

(async() => {
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = (await fs.readdir(commandsPath)).filter(f => f.endsWith(".js"));

	const commands = [];

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		commands.push(command.data.toJSON());
	}

	const rest = new REST().setToken(process.env.TOKEN);

	console.log(`Deploying ${commands.length} commands`);
	const data = await rest.put(
		Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
		{ body: commands }
	);
	console.log(`Success`);
})();

