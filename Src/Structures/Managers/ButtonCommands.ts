import { DiscordClient } from "discord.js";
import { ButtonCommand } from "../../Types.js";
import { FileReader } from "../../Utils/FileReader.js";

export const ButtonManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const buttonCommandFiles: Array<string> = FileReader(`${rootPath}/Interactions/Buttons`);

    for (const buttonCommandFile of buttonCommandFiles) {
        const buttonCommand: ButtonCommand = (await import(buttonCommandFile))?.Button;
        
        if (!buttonCommand) return;
        if (!buttonCommand.ignore && buttonCommand.name) client.buttonCommands?.set(buttonCommand.name, buttonCommand); 
    };
};