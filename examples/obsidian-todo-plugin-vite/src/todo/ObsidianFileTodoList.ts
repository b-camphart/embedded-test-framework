import { App } from "obsidian";
import { CreateModifiedFileReviewTodoList } from "./create/modifiedFileReview";

export class ObsidianFileTodoList implements CreateModifiedFileReviewTodoList {
	/**
	 * @param path The path, relative to the vault, of the file
	 *             that will contain the list of to-do items
	 */
	constructor(private app: App, private path: string) {}

	async createNewItem(item: {
		name: string;
		completed: boolean;
	}): Promise<void> {
		await this.app.vault.adapter.process(this.path, content => {
			const newItem = `- [${item.completed ? "x" : " "}] ${item.name}`;
			if (content.length === 0 || content.endsWith("\n")) {
				return content + newItem;
			}
			return content + `\n${newItem}`;
		});
	}

	async hasIncompleteItemWithName(name: string): Promise<boolean> {
		const content = await this.app.vault.adapter.read(this.path);
		return content.includes(`- [ ] ${name}`);
	}
}
