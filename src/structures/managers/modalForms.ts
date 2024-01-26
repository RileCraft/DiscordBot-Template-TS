import { DiscordClient } from "discord.js";
import { ModalForm } from "../../types.js";
import { fileReader } from "../../utils/fileReader.js";

export const ModalManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const modalFormFiles: Array<string> = fileReader(`${rootPath}/interactions/modalForms`);

    for (const modalFormFile of modalFormFiles) {
        const modalForm: ModalForm = (await import(modalFormFile))?.Modal;
        if (!modalForm) continue;

        if (!modalForm.ignore && modalForm.name) client.modalForms?.set(modalForm.name, modalForm);
    };
};