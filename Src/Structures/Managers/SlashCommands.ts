import { ApplicationCommandType, DiscordClient, REST, Routes } from "discord.js";
import { SlashCommand, SlashCommandOptions } from "../../Types.js";
import { FileReader } from "../../Utils/FileReader.js";

export const SlashManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const allSlashCommandsFiles = FileReader(`${rootPath}/Interactions/SlashCommands`);
    const rest: REST = new REST({ version: '10' }).setToken(client.token);

    interface GlobalCommandArray {
        name: string,
        nsfw: boolean,
        type: ApplicationCommandType.ChatInput,
        description: string,
        options: Array<SlashCommandOptions>
    };

    interface GuildCommandObjects {
        [key: string]: Array<{
            name: string,
            nsfw: boolean,
            description: string,
            type: ApplicationCommandType.ChatInput,
            options: Array<SlashCommandOptions>
        }>
    };

    const guildCommandsObject: GuildCommandObjects = {};
    const globalCommandsArray: Array<GlobalCommandArray> = [];

    if (!allSlashCommandsFiles.length) return;
    allSlashCommandsFiles.forEach(async(slashCommandFile: string) => {
        const slashCommand: SlashCommand | undefined = (await import(slashCommandFile))?.Slash;
        if (!slashCommand) return;

        if (slashCommand?.ignore || !slashCommand?.name || !slashCommand.description) return; 
        client.slashCommands?.set(slashCommand.name, slashCommand);

        if (slashCommand.guilds && Array.isArray(slashCommand.guilds)) {
            for (const guild of slashCommand.guilds) {
                if (!guildCommandsObject[guild]) guildCommandsObject[guild] = [];

                guildCommandsObject[guild].push({
                    name: slashCommand.name,
                    nsfw: slashCommand.nsfw ?? false,
                    description: slashCommand.description,
                    type: ApplicationCommandType.ChatInput,
                    options: slashCommand.options ?? []
                })
            };
        } else return globalCommandsArray.push({
            name: slashCommand.name,
            nsfw: slashCommand.nsfw ?? false,
            description: slashCommand.description,
            type: ApplicationCommandType.ChatInput,
            options: slashCommand.options ?? []
        })
    });

    try {
        await rest.put(Routes.applicationCommands(client.application.id), {
            body: globalCommandsArray
        });

        for (const guildObject of Object.entries(guildCommandsObject)) {
            await rest.put(Routes.applicationGuildCommands(client.application.id, guildObject[0]), {
                body: guildObject[1]
            });
        };
    } catch (error: unknown) {
        console.log(error);
    };
};