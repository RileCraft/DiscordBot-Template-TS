import { existsSync, readdirSync, statSync } from "fs";
import path from "path";

export const fileReader = (dir: string): Array<string> => {
    if (!existsSync(dir)) return [];
    const files: Array<string> = [];
    const directoryData = readdirSync(dir);

    for (const file of directoryData) {
        const filePath = path.join(dir, file);
        const stats = statSync(filePath);

        if (stats.isFile() && path.extname(filePath) === ".js") files.push(filePath);
        else if (stats.isDirectory()) files.push(...fileReader(filePath));
    };

    return files;
};