import { EmbedBuilder, Interaction, Message, DiscordClient } from "discord.js";
import { AnyCommand, InteractionTypeOptions } from "../../types.js";
import { appendFile, readFileSync } from "fs";
import { join } from "path";
import { rootPath } from "../../bot.js";

export const globalCooldownFN = async(client: DiscordClient, message: Message | Interaction<"cached">, command: AnyCommand, interactionType: InteractionTypeOptions): Promise<boolean> => {
    if (!command.globalCooldown || isNaN(command.globalCooldown)) return true;

    const dbData = `globalCooldown.${interactionType}.${command.name}.${message.member?.id}`
    const currentTime: number = Date.now();
    let storedTime: number;

    try {
        storedTime = Number(readFileSync(join(rootPath, "cooldownDB.txt"), { encoding: 'utf8', flag: 'r' }).split("\n").filter((stuff: string) => stuff === dbData)[0].split(".")[4]);
    } catch {
        storedTime = 0;
    };

    if (Math.floor(currentTime - storedTime) >= command.globalCooldown || !storedTime) {
        appendFile(join(rootPath, "cooldownDB.txt"), `${dbData}.${currentTime}`, (error) => {
            if (error) console.error("cooldownDB.txt did not exist, creating . . .")
        });
        return true;
    } else {
        if (command.returnErrors === false || command.returnGlobalCooldownError === false) return false;
        message.channel?.send({
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