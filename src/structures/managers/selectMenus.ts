import { SelectMenu } from "../../types.js";
import { DiscordClient } from "discord.js";
import { fileReader } from "../../utils/fileReader.js";

export const SelectMenuManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const selectMenuFiles: Array<string> = fileReader(`${rootPath}/interactions/selectMenus`);
    if (!selectMenuFiles.length) return;

    for (const selectMenuFile of selectMenuFiles) {
        const selectMenu: SelectMenu = (await import(selectMenuFile))?.Menu;
        if (!selectMenu) continue;

        if (!selectMenu.ignore && selectMenu.name) client.selectMenus?.set(selectMenu.name, selectMenu);
    };
};