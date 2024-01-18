import { SelectMenu } from "../../Types.js";
import { DiscordClient } from "discord.js";
import { FileReader } from "../../Utils/FileReader.js";

export const SelectMenuManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const selectMenuFiles: Array<string> = FileReader(`${rootPath}/Interactions/SelectMenus`);

    for (const selectMenuFile of selectMenuFiles) {
        const selectMenu: SelectMenu = (await import(selectMenuFile))?.Menu;
        if (!selectMenu) return;

        if (!selectMenu.ignore && selectMenu.name) client.selectMenus?.set(selectMenu.name, selectMenu);
    };
};