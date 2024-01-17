import { readdirSync, statSync } from "fs";
import path from "path";

export const FileReader = (dir: string): Array<string> => {
    const files: Array<string> = [];
    const directoryData = readdirSync(dir);

    for (const file of directoryData) {
        const filePath = path.join(dir, file);
        const stats = statSync(filePath);

        if (stats.isFile() && path.extname(filePath) === ".js") files.push(filePath);
        else if (stats.isDirectory()) files.push(...FileReader(filePath));
    };

    return files;
};