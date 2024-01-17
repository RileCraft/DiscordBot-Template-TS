import { StringSelectMenuInteraction } from "discord.js";
import { SelectMenu } from "../../Types.js";

export const Menu: SelectMenu = {
    name: "SelectMenuExample",
    run: (interaction): void => {
        const stringSelectMenuInteraction = interaction as StringSelectMenuInteraction; // If you want to use StringSelectMenuInteraction specifically.
        stringSelectMenuInteraction.reply({
            content: "Here is your cookie! :cookie:"
        });
    }
}; // Code for SelectMenuExample SelectMenu