import { ApplicationCommandType, UserContextMenuCommandInteraction } from "discord.js";
import { ContextMenu } from "../../types.js";

export const Context: ContextMenu = {
    name: "getuser",
    type: ApplicationCommandType.User,
    guilds: ["1186230608851120188"],
    run: (interaction): void => {
        const userContextMenuInteraction = interaction as UserContextMenuCommandInteraction<"cached">;  // If you want to use UserContextMenuCommandInteraction specifically.

        let member = interaction.guild.members.cache.get(interaction.targetId);
        if (!member) member = interaction.member;

        userContextMenuInteraction.reply({
            content: `That is ${member.user.tag}.`
        });
    }
}; // Simple UserContextMenu example