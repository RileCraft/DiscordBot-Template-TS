import { ButtonCommand } from "../../Types.js";

export const Button: ButtonCommand = {
    name: "deleteOutput",
    ownerOnly: true,
    run: (interaction): void => {
        interaction?.message?.delete();
    }
}; // ButtonCommand of the deleteOutput button.