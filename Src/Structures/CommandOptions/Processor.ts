import { DiscordClient, Interaction, Message } from "discord.js";
import { AnyCommand, InteractionTypeOptions } from "../../Types.js";

import { allClientPermissionsFN } from "./AllClientPermissions.js";
import { allUserPermissionsFN } from "./AllUserPermissions.js";
import { anyClientPermissionsFN } from "./AnyClientPermissions.js";
import { anyUserPermissionsFN } from "./AnyUserPermissions.js";
import { channelCooldownFN } from "./ChannelCooldown.js";
import { globalCooldownFN } from "./GlobalCooldown.js";
import { guildCooldownFN } from "./GuildCooldown.js";
import { onlyChannelsFN } from "./OnlyChannels.js";
import { onlyGuildsFN } from "./OnlyGuilds.js";
import { onlyRolesFN } from "./OnlyRoles.js";
import { onlyUsersFN } from "./OnlyUsers.js";
import { ownerOnlyFN } from "./OwnerOnly.js";


export default async (client: DiscordClient, message: Message | Interaction<"cached">, command: AnyCommand, interactionType: InteractionTypeOptions) => {
    const allClientPermissions: boolean = allClientPermissionsFN(client, message, command);
    const anyClientPermissions: boolean = anyClientPermissionsFN(client, message, command);
    const allUserPermissions: boolean = allUserPermissionsFN(client, message, command);
    const anyUserPermissions: boolean = anyUserPermissionsFN(client, message, command);

    const channelCooldown: boolean = await channelCooldownFN(client, message, command, interactionType);
    const globalCooldown: boolean = await globalCooldownFN(client, message, command, interactionType);
    const guildCooldown: boolean = await guildCooldownFN(client, message, command, interactionType);

    const onlyChannels: boolean = onlyChannelsFN(client, message, command);
    const onlyGuilds: boolean = onlyGuildsFN(client, message, command);
    const onlyRoles: boolean = onlyRolesFN(client, message, command);
    const onlyUsers: boolean = onlyUsersFN(client, message, command);
    const ownerOnly: boolean = ownerOnlyFN(client, message, command);

    const finalCorrection: Array<boolean> = [allClientPermissions, anyClientPermissions, allUserPermissions, anyUserPermissions, channelCooldown, guildCooldown, globalCooldown, onlyChannels, onlyGuilds, onlyRoles, onlyUsers, ownerOnly];
    if (finalCorrection.includes(false)) return false;
    else return true;
};