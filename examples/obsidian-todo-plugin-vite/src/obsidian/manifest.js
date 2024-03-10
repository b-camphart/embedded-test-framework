import { readFileSync } from "fs"

let { 
    name: packageName, 
    version, 
    description, 
    author
} = JSON.parse(readFileSync("package.json", { encoding: "utf-8"}));

if (!packageName || typeof packageName !== "string") {
    throw new Error("package.json missing required field 'name'.")
}

if (!version || typeof version !== "string") {
    version = null;
}

if (!description || typeof description !== "string") {
    throw new Error("package.json does not have valid description.  Required for obsidian plugins.")
}

if (!author || typeof author !== "string") {
    throw new Error("package.json does not have valid author.  Required for obsidian plugins.")
}

export default {
    "id": packageName,
    "name": packageName.split("-")
        .filter(word => word.length > 0)    
        .map(word => word[0].toLocaleUpperCase() + word.slice(1))
        .join(" "),
    "version": version ?? process.env.npm_package_version ?? "1.0.0",
    "minAppVersion": "1.4.14",
    description,
    author,
    authorUrl: `https://github.com/${author}`,
    "isDesktopOnly": true,
}