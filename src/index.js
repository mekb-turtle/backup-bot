const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("node:fs").promises;
const path = require("node:path");
require("dotenv").config();

(async() => {

	const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });

	client.once(Events.ClientReady, c => {
		console.log(`ready ${c.user.tag}`);
		client.user.setActivity("hi");
		client.user.setPresence({ activities: [], status: 'online' });
	});

	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = (await fs.readdir(commandsPath)).filter(f => f.endsWith(".js"));

	client.commands = new Collection();

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		client.commands.set(command.data.name, command);
	}

	client.on(Events.InteractionCreate, async i => {
		if (!i.isChatInputCommand()) return;

		const command = i.client.commands.get(i.commandName);
		if (!command) return;

		try {
			await command.execute(i, { ephemeral: true, allowedMentions: { users: [], roles: [], repliedUser: false } });
		} catch (error) {
			console.error(error);
			i[i.replied || i.deferred ? "followUp" : "reply"]({
				content: "There was an error executing this command", ephemeral: true
			});
		}
	});

	console.log(`logging in...`);
	client.login(process.env.TOKEN);

})();
