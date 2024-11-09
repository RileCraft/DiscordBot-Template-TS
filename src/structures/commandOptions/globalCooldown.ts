import { ChannelType, EmbedBuilder, Interaction, Message, DiscordClient } from "discord.js";
import { AnyCommand, InteractionTypeOptions } from "../../types.js";

export const globalCooldownFN = async(client: DiscordClient, message: Message | Interaction<"cached">, command: AnyCommand, interactionType: InteractionTypeOptions): Promise<boolean> => {
    if (!command.globalCooldown || isNaN(command.globalCooldown)) return true;

    const dbData = `globalCooldown.${interactionType}.${command.name}.${message.member?.id}`
    const currentTime: number = Date.now();
    const storedTime: number = client.cooldownDB?.get(dbData) ?? 0;

    if (Math.floor(currentTime - storedTime) >= command.globalCooldown || !storedTime) {
        client.cooldownDB?.set(dbData, currentTime);
        return true;
    } else {
        if (command.returnErrors === false || command.returnGlobalCooldownError === false) return false;
        if (!message.channel || message.channel.type != ChannelType.GuildText) return false

        message.channel.send({
            embeds: [new EmbedBuilder()
                .setColor("DarkRed")
                .setTimestamp()
                .setAuthor({
                    name: message.member?.user.globalName ?? message.member?.user.username ?? "",
                    iconURL: message.member?.user.displayAvatarURL()
                })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`You are currently at cooldown. Please try again in <t:${Math.floor(Math.floor(storedTime + command.globalCooldown) / 1000)}:R>.`)
            ],
        });
        return false;
    }
};