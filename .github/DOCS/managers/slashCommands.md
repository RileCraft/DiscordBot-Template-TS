# SlashCommands
## Format
```js
import { SlashCommand } from "../../types.js";

export const Slash: SlashCommand = {
    name: "commandname",
    description: "short description",
    // Other Command Options
    guilds: ["GUILD ID"], // If you make to make a guild command. (Optional), By default it will be global.
    run: (interaction, client): void => {
        // Code
    }
};
```
## Example Code
```js
import { SlashCommand } from "../../types.js";
import { ApplicationCommandOptionType } from "discord.js";

export const Slash: SlashCommand = {
    name: "ping",
    options: [
        {
            name: "type",
            description: "What type of ping you want",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "client",
                    value: "client"
                }
            ]
        }
    ],
    description: "pong description",
    run: (interaction, client): void => {
        console.log(`${interaction.user.username} chose ${interaction.options.getString("type")}`)
    }
};
```