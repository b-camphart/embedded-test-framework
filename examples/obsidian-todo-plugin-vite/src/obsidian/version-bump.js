import { writeFileSync } from "fs";
import manifest from "./manifest";
import versions from "./versions";

if (!manifest.version in versions) {
	const versionsUpdate = { ...versions };
	versionsUpdate[manifest.version] = manifest.minAppVersion;
	writeFileSync(
		"src/obsidian/versions.js",
		`expect default ${JSON.stringify(versionsUpdate, null, "\t")};`,
	);
}
