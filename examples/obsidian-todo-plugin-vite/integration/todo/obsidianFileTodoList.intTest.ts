import { App, TFile } from "obsidian";
import { createModifiedFileReviewTodoListContract } from "../../contracts/todo/create/modifiedFileReview.contract";
import { ObsidianFileTodoList } from "../../src/todo/ObsidianFileTodoList";
import { TestingFramework } from "../../contracts/TestingFramework";

export function obsidianFileTodoListTest(
	framework: TestingFramework,
	app: App,
) {
	framework.describe(`Obsidian File To-Do List`, () => {
		framework.beforeEach(() => app.vault.create("todo-list.md", "").then());
		framework.afterEach(async () => {
			const file = app.vault.getAbstractFileByPath("todo-list.md");
			if (file) {
				await app.vault.delete(file, true);
			}
		});

		framework.it(`writes items on new line`, async () => {
			const todoList = new ObsidianFileTodoList(app, "todo-list.md");
			await todoList.createNewItem({
				name: "First item",
				completed: false,
			});

			const file = app.vault.getAbstractFileByPath("todo-list.md");
			if (!(file instanceof TFile)) {
				throw new Error("Expected file to still exist");
			}

			const content = await app.vault.read(file);
			if (!content.includes(`- [ ] First item`)) {
				throw new Error("Did not include item in file.\n" + content);
			}

			if (content.split("\n").length !== 1) {
				throw new Error("Should only have one line.\n" + content);
			}
		});

		framework.it(`writes completed items with checkbox`, async () => {
			const todoList = new ObsidianFileTodoList(app, "todo-list.md");
			await todoList.createNewItem({
				name: "Completed item",
				completed: true,
			});

			const file = app.vault.getAbstractFileByPath("todo-list.md");
			if (!(file instanceof TFile)) {
				throw new Error("Expected file to still exist");
			}

			const content = await app.vault.read(file);
			if (!content.includes(`- [x] Completed item`)) {
				throw new Error("Did not include item in file.\n" + content);
			}
		});

		createModifiedFileReviewTodoListContract(framework)(
			() => new ObsidianFileTodoList(app, "todo-list.md"),
		);
	});
}
