import { inspect } from "util";
import { ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { MessageCommand } from "../types.js";

export const MsgCommand: MessageCommand = {
    name: "eval",
    ownerOnly: true,
    run: async(client, message, args): Promise<void> => {
        const deleteMessageComponent: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId("deleteOutput")
                .setLabel("Delete Output")
                .setStyle(ButtonStyle.Danger)
        );

        let code: string = args.join(" ").trim();
        let depth: number = 0;
        const originalCode: string = code;

        if (!message.channel || message.channel.type != ChannelType.GuildText) return

        if (!code) {message.channel.send({ content: "Please specify something to Evaluate" }); return;}
        try {
            if (originalCode.includes("--str")) code = `${code.replace("--str", "").trim()}.toString()`;
            if (originalCode.includes("--send")) code = `message.channel.send(${code.replace("--send", "").trim()})`;
            if (originalCode.includes("--async")) code = `(async () => {${code.replace("--async", "").trim()}})()`;
            if (originalCode.includes("--depth=")) depth = Number(originalCode.split("--depth=")[1]);

            code = code.split("--depth=")[0];
            code = code.replace("--silent", "").trim();
            code = await eval(code);
            code = inspect(code, { depth: depth });

            if (String(code).length > 1990) code = "Output is too long";
            if (String(code).includes((client?.token ?? ""))) code = "This message contained client's token.";
            if (originalCode.includes("--silent")) return;
            else message.reply({
                content: `\`\`\`js\n${code}\n\`\`\``,
                components: [deleteMessageComponent],
                allowedMentions: {
                    repliedUser: false
                }
            });
        } catch (error) {
            console.log(error);
            message.channel.send({
                content: `\`\`\`js\n${error}\n\`\`\``,
                components: [deleteMessageComponent]
            });
        }
    }
}; // Eval code using message command.