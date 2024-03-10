interface TodoList {
    createNewItem(item: { name: string, completed: boolean; }): Promise<void>;
    hasIncompleteItemWithName(name: string): Promise<boolean>;
}
export type { TodoList as CreateModifiedFileReviewTodoList }

/**
 * Creates a to-do item to review a modified file.
 */
export async function createModifiedFileReviewTodoItem(
	name: string,
    todoList: TodoList,
	createNotification: (message: string) => void,
) {

    if (! await todoList.hasIncompleteItemWithName(name)) {
        await todoList.createNewItem({ name, completed: false });
        createNotification(name);
    }

}
