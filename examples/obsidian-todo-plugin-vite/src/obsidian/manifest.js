import { name as packageName, version, description, author } from "../../package.json"

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