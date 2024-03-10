import { writeFileSync } from "fs";
import manifest from "./manifest.js";
import versions from "./versions.js";

if (!(manifest.version in versions)) {
	const versionsUpdate = { ...versions };
	versionsUpdate[manifest.version] = manifest.minAppVersion;
	console.log("writing new versions", versionsUpdate);
	writeFileSync(
		process.cwd() + "/src/obsidian/versions.js",
		`export default ${JSON.stringify(versionsUpdate, null, "\t")};`,
	);
} else {
	console.log(`versions has ${manifest.version}`)
}
