import { SlashCommand } from "../../Types.js";

export const Slash: SlashCommand = {
    name: "ping",
    description: "Pong",
    guilds: ["1186230608851120188"],
    run: (interaction, client): void => {
        interaction.reply({
            content: `Ping is ${client.ws.ping}ms.`
        })
    }
}; // Simple /Ping command