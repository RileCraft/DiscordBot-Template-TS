import { DiscordClient } from "discord.js";
import { ModalForm } from "../../Types.js";
import { FileReader } from "../../Utils/FileReader.js";

export const ModalManager = async(client: DiscordClient, rootPath: string): Promise<void> => {
    const modalFormFiles: Array<string> = FileReader(`${rootPath}/Interactions/ModalForms`);

    for (const modalFormFile of modalFormFiles) {
        const modalForm: ModalForm = (await import(modalFormFile))?.Modal;
        if (!modalForm) return;

        if (!modalForm.ignore && modalForm.name) client.modalForms?.set(modalForm.name, modalForm);
    };
};