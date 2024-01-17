import { Client, DiscordClient, GatewayIntentBits, Partials } from "discord.js";
import { BOT_TOKEN } from "./Config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ButtonCommand, ClientEvent, ContextMenu, MessageCommand, ModalForm, SelectMenu, SlashCommand } from "./Types.js";
import { ButtonManager } from "./Structures/Managers/ButtonCommands.js";
import { EventManager } from "./Structures/Managers/Events.js";
import { MessageCMDManager } from "./Structures/Managers/MessageCommands.js";
import { ModalManager } from "./Structures/Managers/ModalForms.js";
import { SelectMenuManager } from "./Structures/Managers/SelectMenus.js";
import { SlashManager } from "./Structures/Managers/SlashCommands.js";
import { ContextManager } from "./Structures/Managers/ContextMenus.js";

const __dirname: string = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

(async(): Promise<void> => {
    const client: DiscordClient = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent, // Only for bots with message content intent access.
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildInvites,
        ],
        partials: [Partials.Channel]
    });

    client.messageCommands = new Map<string, MessageCommand>();
    client.messageCommands_Aliases = new Map<string, string>();
    client.events = new Map<string, ClientEvent>();
    client.buttonCommands = new Map<string, ButtonCommand>();
    client.selectMenus = new Map<string, SelectMenu>();
    client.modalForms = new Map<string, ModalForm>();
    client.contextMenus = new Map<string, ContextMenu>();
    client.slashCommands = new Map<string, SlashCommand>();
    
    await MessageCMDManager(client, __dirname);
    await EventManager(client, __dirname);
    await ButtonManager(client, __dirname);
    await SelectMenuManager(client, __dirname);
    await ModalManager(client, __dirname);
    await client.login(BOT_TOKEN);
    await SlashManager(client, __dirname);
    await ContextManager(client, __dirname);
})();