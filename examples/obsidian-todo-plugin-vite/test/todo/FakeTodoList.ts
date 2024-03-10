import { CreateModifiedFileReviewTodoList } from "../../src/todo/create/modifiedFileReview";

export class FakeTodoList implements CreateModifiedFileReviewTodoList {
	private items: Array<{ name: string; completed: boolean }> = [];

	createNewItem(item: { name: string; completed: boolean }): Promise<void> {
		this.items.push(item);
		return Promise.resolve();
	}

	hasIncompleteItemWithName(name: string): Promise<boolean> {
		return Promise.resolve(
			!!this.items.find(item => !item.completed && item.name === name),
		);
	}
}
