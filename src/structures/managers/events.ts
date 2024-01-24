import { DiscordClient } from "discord.js";
import { ClientEvent } from "../../types.js";
import { fileReader } from "../../utils/fileReader.js";

export const EventManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const eventFiles: Array<string> = fileReader(`${rootPath}/Events`);
    
    for (const event of eventFiles) {
        const clientEvent: ClientEvent = (await import(event))?.Event;
        if (!clientEvent) return;
        
        client.events?.set(clientEvent.name, clientEvent);

        if (!clientEvent.ignore && clientEvent.customEvent) clientEvent.run(client);
        else if (!clientEvent.ignore && clientEvent.name && clientEvent.runOnce) client.once(clientEvent.name, (...args: unknown[]) => clientEvent.run(...args, client));
        else if (!clientEvent.ignore && clientEvent.name) client.on(clientEvent.name, (...args: unknown[]) => clientEvent.run(...args, client));
    };
};