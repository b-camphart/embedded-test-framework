import { Plugin } from "obsidian";
import { createModifiedFileReviewTodoItem } from "../todo/create/modifiedFileReview";
import { ObsidianFileTodoList } from "../todo/ObsidianFileTodoList";

export default class TodoPlugin extends Plugin {
	onload(): void {
		this.registerEvent(
			this.app.vault.on("modify", (file) =>
				createModifiedFileReviewTodoItem(
                    file.name,
                    new ObsidianFileTodoList(this.app, "todo-list.md"),
                    () => {},
                ),
			),
		);
	}
}
