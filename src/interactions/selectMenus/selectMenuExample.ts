import { StringSelectMenuInteraction } from "discord.js";
import { SelectMenu } from "../../types.js";

export const Menu: SelectMenu = {
    name: "SelectMenuExample",
    run: (interaction): void => {
        interaction = interaction as StringSelectMenuInteraction<"cached">; // If you want to use StringSelectMenuInteraction specifically.
        interaction.reply({
            content: "Here is your cookie! :cookie:"
        });
    }
}; // Code for SelectMenuExample SelectMenu