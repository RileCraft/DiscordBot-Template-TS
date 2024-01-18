import { MessageCommand } from '../../Types.js';
import { DiscordClient } from "discord.js";
import { FileReader } from '../../Utils/FileReader.js';

export const MessageCMDManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const messageCommandsFiles: Array<string> = FileReader(`${rootPath}/MessageCommands`);

    for (const messageCommandFile of messageCommandsFiles) {
        const messageCommand: MessageCommand = (await import(messageCommandFile))?.MsgCommand;
        if (!messageCommand) return;

        if (!messageCommand.ignore && messageCommand.name) client.messageCommands?.set(messageCommand.name.toLowerCase(), messageCommand);
        else if (!messageCommand.ignore && messageCommand.aliases && Array.isArray(messageCommand.aliases)) messageCommand.aliases.forEach((messageCommandAlias: string) => {
            client.messageCommands_Aliases?.set(messageCommandAlias, messageCommand.name);
        });
    };
};