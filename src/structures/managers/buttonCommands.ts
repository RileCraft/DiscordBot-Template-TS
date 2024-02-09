import { DiscordClient } from "discord.js";
import { ButtonCommand } from "../../types.js";
import { fileReader } from "../../utils/fileReader.js";

export const ButtonManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const buttonCommandFiles: Array<string> = fileReader(`${rootPath}/interactions/buttons`);
    if (!buttonCommandFiles.length) return;

    for (const buttonCommandFile of buttonCommandFiles) {
        const buttonCommand: ButtonCommand = (await import(`file:///${buttonCommandFile}`))?.Button;
        if (!buttonCommand) continue;
        
        if (!buttonCommand?.ignore && buttonCommand?.name) client.buttonCommands?.set(buttonCommand?.name, buttonCommand); 
    };
};