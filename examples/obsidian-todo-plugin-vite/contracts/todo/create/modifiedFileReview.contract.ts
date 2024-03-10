import { CreateModifiedFileReviewTodoList } from "../../../src/todo/create/modifiedFileReview";
import { TestingFramework } from "../../TestingFramework";

export function createModifiedFileReviewTodoListContract({
	describe,
	it,
	beforeEach,
}: TestingFramework) {
	return function (createTodoList: () => CreateModifiedFileReviewTodoList) {
		describe(`Create Modified File Review To-Do List Contract`, () => {
			let todoList: CreateModifiedFileReviewTodoList;

			beforeEach(() => {
				todoList = createTodoList();
			});

			function createNewItem(item: { name: string, completed: boolean }): Promise<void> {
				return todoList.createNewItem(item);
			}

			function hasIncompleteItemWithName(name: string): Promise<boolean> {
				return todoList.hasIncompleteItemWithName(name);
			}

			it(`does not have items that have not been created`, async () => {
				// Act
				const uniqueName = Math.random().toString(36).slice(2);
				const hasName = await hasIncompleteItemWithName(uniqueName);

				// Assert
				if (hasName) {
					throw new Error(`Should not have item named ${uniqueName}`);
				}
			});

			it(`has items incomplete that have been created`, async () => {
				// Arrange
				const itemName = Math.random().toString(36).slice(2);
				await createNewItem({ name: itemName, completed: false });

				// Act
				const hasName = await hasIncompleteItemWithName(itemName);

				// Assert
				if (!hasName) {
					throw new Error(
						`Should have created item named ${itemName}`,
					);
				}
			});

			it(`does not have incomplete items that have been completed`, async () => {
				// Arrange
				const itemName = Math.random().toString(36).slice(2);
				await createNewItem({ name: itemName, completed: true });

				// Act
				const hasName = await hasIncompleteItemWithName(itemName);

				// Assert
				if (hasName) {
					throw new Error(
						`Should not have incomplete item named ${itemName}.\n${todoList}`,
					);
				}
			});
		});
	};
}
