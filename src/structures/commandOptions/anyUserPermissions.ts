import { DiscordClient, EmbedBuilder, Interaction, Message } from "discord.js";
import { AnyCommand } from "../../types.js";

export const anyUserPermissionsFN = (client: DiscordClient, message: Message | Interaction<"cached">, command: AnyCommand): boolean => {
    if (!command.anyUserPermissions || !Array.isArray(command.anyUserPermissions) || !message.guild) return true;
    if (command.anyUserPermissions.some((permission: bigint) => message.member?.permissions.has(permission))) return true;
    else {
        if (command.returnErrors === false || command.returnAnyUserPermissionsError === false) return false;
        message.channel?.send({
            embeds: [new EmbedBuilder()
                .setColor("DarkRed")
                .setTimestamp()
                .setAuthor({
                    name: message.member?.user.globalName ?? message.member?.user.username ?? "",
                    iconURL: message.member?.user.displayAvatarURL()
                })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`You are missing any one of these permissions which are necessary to run this command. Please acquire any one of these permissions to execute this command:\n${command.anyUserPermissions.map((permission: bigint) => `↳ \`${permission}\``).join("\n")}`)
            ]
        });
        return false;
    }
};