import { ChannelType, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { MessageCommand } from "../types.js";

export const MsgCommand: MessageCommand = {
    name: "callselectmenu",
    run: (client, message): void => {
        if (!message.channel || message.channel.type != ChannelType.GuildText) return

        message.channel.send({
            content: "Cookies SelectMenu",
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId("SelectMenuExample")
                    .setPlaceholder("Free Cookies!")
                    .addOptions(
                        [{
                            label: "Click for cookies!",
                            description: "Freeee!",
                            value: "CookieBox"
                        }]
                    )
                )
            ]
        });
    }
}; // Calls the SelectMenuExample SelectMenu.