import { defineConfig } from "vite";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import manifest from "./src/obsidian/manifest";
import versions from "./src/obsidian/versions";

export default defineConfig(env => {
	switch (env.mode) {
        case "production": {
            return productionConfig();
        }
        case "development": {
            return developmentConfig();
        }
		case "integration": {
			return integrationConfig();
		}
        case "test": {
            return {}
        }
	}
});

/**
 * 
 * @returns {import("vite").UserConfig}
 */
function productionConfig() {

    generatePluginJSON(".")

    return {
        build: {
            lib: {
                entry: "src/obsidian/main.ts",
                formats: ["cjs"],
                name: manifest.id,
                fileName() {
                    return "main.js"
                }
            },
            target: "es2018",
            minify: false,
            cssMinify: false,
            rollupOptions: {
                external: [
                    "obsidian",
                ],
                output: {
                    globals: {
                        "obsidian": "obsidian",
                    }
                }
            },
            outDir: "./dist",
        }
    }
}

/**
 * 
 * @returns {import("vite").UserConfig}
 */
function developmentConfig() {

    const outDir = `${testVaultPath()}/.obsidian/plugins/${manifest.id}`;
    generatePluginJSON(outDir);

    return {
        build: {
            lib: {
                entry: "src/obsidian/main.ts",
                formats: ["cjs"],
                name: manifest.id,
                fileName() {
                    return "main.js"
                }
            },
            target: "es2018",
            minify: false,
            cssMinify: false,
            rollupOptions: {
                external: [
                    "obsidian",
                ],
                output: {
                    globals: {
                        "obsidian": "obsidian",
                    }
                }
            },
            outDir,
            emptyOutDir: false, // prevent generated manifest.json and versions.json from being removed
        }
    }
}

function integrationConfig() {
    const devConfig = developmentConfig();

    devConfig.build.lib.entry = "integration/main.ts";

    return devConfig;
}

function testVaultPath() {
    return `./${manifest.id}-test-vault`;
}

/**
 * 
 * @param {string} directory 
 */
function generatePluginJSON(directory) {
    if (!existsSync(directory)) {
        mkdirSync(directory, { recursive: true });
    }
    writeFileSync(`${directory}/manifest.json`, JSON.stringify(manifest, undefined, "\n  "));
    writeFileSync(`${directory}/versions.json`, JSON.stringify(versions, undefined, "\n  "));
}