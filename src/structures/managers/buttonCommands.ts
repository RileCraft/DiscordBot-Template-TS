import { DiscordClient } from "discord.js";
import { ButtonCommand } from "../../types.js";
import { fileReader } from "../../utils/fileReader.js";

export const ButtonManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const buttonCommandFiles: Array<string> = fileReader(`${rootPath}/interactions/buttons`);

    for (const buttonCommandFile of buttonCommandFiles) {
        const buttonCommand: ButtonCommand = (await import(buttonCommandFile))?.Button;
        
        if (!buttonCommand) return;
        if (!buttonCommand.ignore && buttonCommand.name) client.buttonCommands?.set(buttonCommand.name, buttonCommand); 
    };
};