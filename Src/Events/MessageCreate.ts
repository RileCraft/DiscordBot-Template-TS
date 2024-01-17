import commandOptionsChecker from "../Structures/CommandOptions/Processor.js";
import { PREFIX } from "../Config.js";
import { ClientEvent, MessageCommand } from "../Types.js";
import { DiscordClient, Message } from "discord.js";

export const Event: ClientEvent = {
    name: "messageCreate",
    run: (message: Message, client: DiscordClient): void => {
        if (!Array.isArray(PREFIX)) return;
        PREFIX.forEach(async(botPrefix: string) => {
            if (!message.content.startsWith(botPrefix)) return;
            const commandName: string = message.content.toLowerCase().slice(botPrefix.length).trim().split(" ")[0];
            const command: MessageCommand | undefined = client.messageCommands?.get(commandName) ?? client.messageCommands?.get(client.messageCommands_Aliases?.get(commandName) ?? "");
            if (!command) return;
            const args: Array<string> = message.content.slice(botPrefix.length).trim().slice(commandName.length).trim().split(" ");
            const processedCommandOptionsChecker: boolean = await commandOptionsChecker(client, message, command, "MessageCommand");

            if (command?.allowInDms) return processedCommandOptionsChecker ? await command.run(client, message, args) : null;
            else if (!message.guild) return;
            else if (command?.allowBots) return processedCommandOptionsChecker ? await command.run(client, message, args) : null;
            else if (message.author.bot) return;
            else return processedCommandOptionsChecker ? await command.run(client, message, args) : null;
        });
    }
}; // MessageCreate event to handle all messages and execute messageCommands (if found).