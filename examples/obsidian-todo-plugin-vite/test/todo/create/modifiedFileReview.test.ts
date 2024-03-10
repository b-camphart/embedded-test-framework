import { beforeEach, describe, expect, it } from "vitest";
import {
	CreateModifiedFileReviewTodoList,
	createModifiedFileReviewTodoItem as realCreateModifiedFileReviewItem,
} from "../../../src/todo/create/modifiedFileReview";
import { FakeTodoList } from "../FakeTodoList";

describe(`Creating a File Review To-Do Item`, () => {
	let todoList: CreateModifiedFileReviewTodoList;
	beforeEach(() => {
		todoList = new FakeTodoList();
	});

	function createModifiedFileReviewTodoItem(
		params: {
			name?: string;
			onCreateItem?: (item: { name: string; completed: boolean }) => void;
			onNotify?: (message: string) => void;
		} = {},
	) {
		return realCreateModifiedFileReviewItem(
			params.name ?? "",
			{
				createNewItem: async item => {
					await todoList.createNewItem(item);
					params.onCreateItem?.call(null, item);
				},
				hasIncompleteItemWithName(name) {
					return todoList.hasIncompleteItemWithName(name);
				},
			},
			params.onNotify ?? (() => {}),
		);
	}

	it(`creates a new to-do item in the to-do list file`, async () => {
		// Arrange
		const todoList: Array<{ name: string; completed: boolean }> = [];
		// Act
		const nameOfFileToReview = "modified-file.md";
		await createModifiedFileReviewTodoItem({
			name: nameOfFileToReview,
			onCreateItem: item => todoList.push(item),
		});

		// Assert
		expect(todoList).toHaveLength(1);
		expect(todoList[0]).toHaveProperty("name", nameOfFileToReview);
		expect(todoList[0]).toHaveProperty("completed", false);
	});

	it(`notifies the user of the new to-do item`, async () => {
		// Arrange
		const receivedNotifications: Array<{ message: string }> = [];
		// Act
		const nameOfFileToReview = "modified-file.md";
		await createModifiedFileReviewTodoItem({
			name: nameOfFileToReview,
			onNotify: message => receivedNotifications.push({ message }),
		});
		// Assert
		expect(receivedNotifications).toHaveLength(1);
		expect(receivedNotifications[0]).toHaveProperty("message");
		expect(receivedNotifications[0].message).toContain(nameOfFileToReview);
	});

	it(`does not create a new item for the same file`, async () => {
		// Arrange
		const todoList: Array<{ name: string; completed: boolean }> = [];
		const nameOfFileToReview = "modified-file.md";
		const act = createModifiedFileReviewTodoItem.bind(null, {
			name: nameOfFileToReview,
			onCreateItem: item => todoList.push(item),
		});
		await act();

		// Act
		await act(); // calls the bound function again with the same parameters

		// Assert
		expect(todoList).toHaveLength(1); // should still ONLY have one item
		expect(todoList[0]).toHaveProperty("name", nameOfFileToReview);
		expect(todoList[0]).toHaveProperty("completed", false);
	});
});
