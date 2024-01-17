import { ApplicationCommandType, DiscordClient, REST, Routes } from "discord.js";
import { ContextMenu } from "../../Types.js";
import { FileReader } from "../../Utils/FileReader.js";

export const ContextManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const allContextMenusFiles = FileReader(`${rootPath}/Interactions/ContextMenus`);
    const rest: REST = new REST({ version: '10' }).setToken(client.token);

    interface GlobalMenuArray {
        name: string,
        type: ApplicationCommandType
    };

    interface GuildMenuObjects {
        [key: string]: Array<{
            name: string,
            type: ApplicationCommandType,
        }>
    };

    const guildMenusObject: GuildMenuObjects = {};
    const globalMenusArray: Array<GlobalMenuArray> = [];

    if (!allContextMenusFiles.length) return;
    allContextMenusFiles.forEach(async(contextMenuFile: string) => {
        const contextMenu: ContextMenu | undefined = (await import(contextMenuFile))?.Context;
        if (!contextMenu) return;

        if (contextMenu?.ignore || !contextMenu?.name || !contextMenu?.type) return; 
        client.contextMenus?.set(contextMenu.name, contextMenu);

        if (contextMenu.guilds && Array.isArray(contextMenu.guilds)) {
            for (const guild of contextMenu.guilds) {
                if (!guildMenusObject[guild]) guildMenusObject[guild] = [];

                guildMenusObject[guild].push({
                    name: contextMenu.name,
                    type: contextMenu.type
                })
            };
        }

        else return globalMenusArray.push({
            name: contextMenu.name,
            type: contextMenu.type
        })
    });

    try {
        await rest.put(Routes.applicationCommands(client.application.id), {
            body: globalMenusArray
        });

        for (const guildObject of Object.entries(guildMenusObject)) {
            await rest.put(Routes.applicationGuildCommands(client.application.id, guildObject[0]), {
                body: guildObject[1]
            });
        };
    } catch (error: unknown) {
        console.log(error);
    };
};